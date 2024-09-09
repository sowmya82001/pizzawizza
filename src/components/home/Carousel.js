import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";

const placeholderImages = [
  "https://www.hormel.com/brands/hormel-pepperoni/wp-content/uploads/sites/3/Recipes_2400_Pepperoni_Cup_Crips_Sweet_Spicy_Basil_Pep_Hot_Honey-1700x708.jpg",
  "https://www.burgurgrillglasgow.com/image/cache/data/banner02-1920x920.jpg",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/15/24/1433889344-del-milkshakes-index.jpg"
];

const randomImageUrls = [
  "https://www.hormel.com/brands/hormel-pepperoni/wp-content/uploads/sites/3/Recipes_2400_Pepperoni_Cup_Crips_Sweet_Spicy_Basil_Pep_Hot_Honey-1700x708.jpg",
  "https://www.burgurgrillglasgow.com/image/cache/data/banner02-1920x920.jpg",
  "https://hips.hearstapps.com/del.h-cdn.co/assets/15/24/1433889344-del-milkshakes-index.jpg"
];

function CarouselComponent() {
  const [imageUrls, setImageUrls] = useState(placeholderImages); // Start with placeholders

  useEffect(() => {
    // Only run this on the client-side
    setImageUrls(randomImageUrls);
  }, []);

  return (
    <Carousel
      autoPlay
      navButtonsAlwaysVisible
      infiniteLoop
      showStatus={false}
      emulateTouch
      showThumbs={false}
      interval={3000}
    >
      {imageUrls.map((imageUrl, index) => (
        <div key={index} style={{ maxHeight: "36rem", position: "relative" }}>
          <img
            src={imageUrl}
            alt={`Slide ${index + 1}`} 
            style={{ objectFit: "cover", width: "100%", height: "100%" }} 
          />
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
