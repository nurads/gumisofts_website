"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const smoothScroll = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="mb-24 mt-20 md:mt-14 px-6">
      <div className="max-w-[1140px] mx-auto grid md:grid-cols-2 items-center gap-8 md:gap-16">
        {/* Left Section (Text) */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-[52px] font-bold leading-tight md:leading-[1.05] text-[#020202] tracking-tight mb-6">
            Beyond <br className="hidden md:block" />
            Software We <br className="hidden md:block" /> Build{" "}
            <span className="text-[#8080D7]">Success</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            We build smart, scalable software <br className="hidden md:block" />
            to power your business.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button
              onClick={() => smoothScroll("contact")}
              className="bg-[#8F91DB] hover:bg-[#646699] text-white text-base md:text-lg px-5 py-3 md:py-4 md:px-8 rounded-[15px] transition-all duration-300 w-auto text-center"
            >
              Contact Us
            </button>
            <button
              onClick={() => smoothScroll("services")}
              className="text-base md:text-lg px-5 py-3 md:py-4 md:px-8 border border-[#c7c8ed] rounded-[15px] hover:bg-[#c7c8ed] hover:shadow-[inset_0_0_0_3px_#fff] transition-all duration-300 w-auto text-center"
            >
              Learn More &darr;
            </button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="flex justify-center">
          <Image
            src="/assets/heroImage.svg"
            alt="Hero"
            width={1000}
            height={400}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
