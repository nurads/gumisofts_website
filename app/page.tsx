"use client";
import Hero from "@/sections/Hero";
import Products from "@/sections/Products";
import Service from "@/sections/Service";
import Testimonial from "@/sections/Testimonial";
import Work from "@/sections/Work";
import Contact from "@/sections/Contact";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <Hero />
      <Products />
      <Service />
      <Work />
      <Testimonial />
      <Contact />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
