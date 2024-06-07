import React from "react";
import banner from "../../public/Banner.png";

function Banner() {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              Track, Split, Thrive: Journey Together,{" "}
              <span className="text-[#1a43bf]">Spend Smart!</span>
            </h1>
            <p className="text-sm md:text-xl">
              Our website simplifies group trip finances, ensuring everyone
              stays on budget and enjoys a stress-free journey. With our tools,
              you can effortlessly track overall expenses, view individual
              spending summaries, and plan future group expenditures with ease.
              Say goodbye to confusion and disputes—empower your group to travel
              smart and make unforgettable memories together!
            </p>
          </div>
          <a href="/createtrip">
            <button className=" bg-[#1a43bf] mt-[5px] text-white px-4 py-2 rounded-md  duration-300">
              Get Started
            </button>
          </a>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
