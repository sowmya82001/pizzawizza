import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation

const sidesPriceOption = { single: "", double: "" };
const pizzaPriceOption = { regular: "", medium: "", large: "" };

function Admin() {
  const [mounted, setMounted] = useState(false);
  const [foodData, setFoodData] = useState({
    name: "",
    foodCategory: "",
    foodType: "",
    price: "",
    description: "",
    img: "",
  });

  const router = useRouter(); // Hook to handle redirects

  const handleChange = (e) => {
    setFoodData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
    if (e.target.name === "foodCategory") {
      if (e.target.value === "Pizza") {
        setFoodData((prevData) => {
          return { ...prevData, price: pizzaPriceOption };
        });
      } else if (e.target.value === "SIDES & BEVERAGES") {
        setFoodData((prevData) => {
          return { ...prevData, price: sidesPriceOption };
        });
      } else {
        setFoodData((prevData) => {
          return { ...prevData, price: e.target.value };
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("api/createFoodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(foodData),
    });
    const result = await response.json();
    if (result.success) {
      alert("Food data created successfully");
    } else {
      alert("Failed to create");
    }
  };

  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    if (isAdmin === true) {
      setMounted(true);
    } else {
      // Redirect to 404 if not admin
      router.push("/404");
    }
  }, [router]);

  return (
    <>
      {mounted ? (
        <div
          style={{
            minHeight: "90vh",
            overflowY: "scroll",
            backgroundImage:
              'url("https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
            backgroundSize: "cover",
          }}
          className=" flex py-10 justify-center content-center items-center"
        >
          <div className=" container w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Food Name
                </label>
                <input
                  placeholder="Food name"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  required
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={foodData.name}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="foodCategory"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Food Category
                </label>
                <select
                  name="foodCategory"
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={foodData.foodCategory}
                >
                  <option value="">Select Food Category</option>
                  <option value="Pizza">PIZZA</option>
                  <option value="SIDES & BEVERAGES">SIDES & BEVERAGES</option>
                </select>
              </div>
              {/* More form fields go here */}
              <button
                type="submit"
                className="border font-bold text-gray-900 dark:text-gray-100 dark:border-gray-400 border-gray-900 rounded p-2 mr-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Admin;
