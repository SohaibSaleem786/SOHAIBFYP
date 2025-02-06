import React from "react";
import BannerPng from "../../assets/banners.jpg";
import { RiCodeSSlashLine } from "react-icons/ri";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaUsers, FaChartLine } from "react-icons/fa";

const Banner = () => {
  return (
    <section id="Features" className="bg-[#f7f7f7] py-14 md:py-24">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <img
            src={BannerPng}
            alt="Software Solutions"
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>

        {/* Banner Text */}
        <div className="flex flex-col justify-center">
          <div className="text-center md:text-left space-y-12">
            {/* Main Heading */}
            <h1 className="text-1xl md:text-2xl font-bold !leading-snug">
              Empowering Businesses with Cutting-Edge Software Solutions
            </h1>

            {/* Features List */}
            <div className="flex flex-col gap-6">
              {/* Feature 1: Custom Software Development */}
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-2xl duration-300 border border-[#F58634]">
                <RiCodeSSlashLine className="text-2xl text-[#F58634]" />
                <p className="text-lg">Custom Software Development</p>
              </div>

              {/* Feature 2: UI/UX Design Services */}
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-2xl duration-300 border border-[#F58634]">
                <MdOutlineDesignServices className="text-2xl text-[#F58634]" />
                <p className="text-lg">UI/UX Design Services</p>
              </div>

              {/* Feature 3: Scalable Solutions */}
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-2xl duration-300 border border-[#F58634]">
                <FaChartLine className="text-2xl text-[#F58634]" />
                <p className="text-lg">Scalable & Future-Ready Solutions</p>
              </div>

              {/* Feature 4: Dedicated Support */}
              <div className="flex items-center gap-4 p-6 bg-white rounded-2xl hover:shadow-2xl duration-300 border border-[#F58634]">
                <FaUsers className="text-2xl text-[#F58634]" />
                <p className="text-lg">Dedicated Support & Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
