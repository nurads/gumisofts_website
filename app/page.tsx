import Hero from "@/sections/Hero";

import Service from "@/sections/Service";
import Testimonial from "@/sections/Testimonial";
import Work from "@/sections/Work";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Service />
      <Testimonial />
      <Work />
      <Contact />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
