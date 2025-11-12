import React from "react";
import { useNavigate } from "react-router-dom";

const MyComponent = ({ categories }) => {
  const navigate = useNavigate();

  const handleNavigation = (id, name) => {
    navigate(`products/categories/${id}/${name}`);
  };

  return (
    <div
      className="relative z-50 bg-white md:mt-32 sm:mt-32"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1747159259/kuduMart/kmb4_1_mtofeu_1_1_ery4y2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-30 md:px-20 sm:px-6 px-3 py-6 lg:gap-12 md:gap-10 gap-6 h-full">
        {/* Desktop View - Top Categories */}
        <div className="hidden md:flex items-stretch rounded-lg shadow-lg overflow-hidden">
          {/* Left - Top Categories */}
          <div className="w-full bg-gradient-to-r from-[#FF6F22] to-[#FF914D] text-white flex flex-col">
            <h3 className="text-white font-bold text-center text-[16px] uppercase py-6 bg-black">
              Top Categories
            </h3>
            <ul
              className={`flex flex-col max-h-[335px] custom-scrollbar overflow-y-auto py-4 px-5 gap-5`}
            >
              {[...categories]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center text-[16px] font-semibold gap-4 cursor-pointer hover:text-[#FFD1B3] transition-all duration-300"
                    onClick={() => {
                      if (category.name.toLowerCase() === "services") {
                        return navigate("/services");
                      }
                      handleNavigation(category.id, category.name);
                    }}
                  >
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-[20px] h-[20px] object-contain"
                    />
                    {category.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
