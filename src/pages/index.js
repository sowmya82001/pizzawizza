import Card from "@/components/home/Card";
import CarouselComponent from "@/components/home/carousel";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { baseUrl } from "@/utils/baseUrl";
import Head from "next/head"; // Import Head for the title

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  const [categoryArray, setCategoryArray] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [typeFilter, setTypeFilter] = useState();

  useEffect(() => {
    if (Array.isArray(data)) {
      const categories = new Set();
      const foodItems = [];

      data.forEach((item) => {
        foodItems.push(item);
        categories.add(item.category);
      });

      setFoodData(foodItems);
      setCategoryArray([...categories]);
    } else {
      console.error("Data is not an array:", data);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>PizzaWizza</title>
      </Head>
      <CarouselComponent />
      <div className="container mx-auto">
        <div className="my-6 space-x-5">
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              !typeFilter && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => setTypeFilter(false)}
          >
            All
          </button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              typeFilter === "Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => setTypeFilter("Veg")}
          >
            <span
              className={
                "lowercase font-thin bg-white border-green-500 border mr-2 px-0.1 text-green-500"
              }
            >
              ●
            </span>
            Veg
          </button>
          <button
            className={`border-black rounded-full dark:border-white border-2 py-1 px-3 ${
              typeFilter === "Non-Veg" && "bg-slate-300 dark:bg-slate-600"
            } `}
            onClick={() => setTypeFilter("Non-Veg")}
          >
            <span
              className={
                "lowercase font-thin bg-white border-red-500 border mr-2 px-0.1 text-red-500"
              }
            >
              ●
            </span>
            Non-Veg
          </button>
        </div>

        {categoryArray.map((category) => (
          <div key={category}>
            <div className="text-4xl mt-10 mb-3 uppercase font-bold">
              {category}
            </div>
            <hr />
            <div className="flex flex-col items-center justify-center">
              <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {foodData
                  .filter((item) => category === item.category)
                  .filter((item) =>
                    typeFilter ? typeFilter === item.foodType : true
                  )
                  .map((item) => (
                    <Card key={item.name} foodData={item} />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  let data = null;

  try {
    const response = await fetch(baseUrl + "api/foodData", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    data = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }

  return {
    props: {
      data: data ? data.data : [], // Ensure data is an array
    },
    revalidate: 60, // Optional: Revalidate data every minute (static generation)
  };
}
