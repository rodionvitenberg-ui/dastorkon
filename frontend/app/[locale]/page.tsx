import Image from "next/image";
import Hero from "@/components/home/Hero";
import About from "../../components/home/About";
import Cuisine from "../../components/home/cuisine/Cuisine";
import OrnamentLines from "../../components/ui/OrnamentLines";
import MapSection from "../../components/home/MapSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <div className="relative w-full bg-[#F5F2EB]">
        {/* Орнамент — линии по краям */}
        <div className="hidden md:block">
          <OrnamentLines type="parchment" />
        </div>

        {/* Текстура пергамента — единая для About + Cuisine */}
        <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <Image
            src="/parchment-bg.jpg"
            alt=""
            fill
            className="object-cover mix-blend-multiply opacity-[0.45]"
          />
        </div>

        <About />
        <Cuisine />
      </div>
      <MapSection />
      {/* Footer автоматически отрендерится ниже силами layout.tsx */}
    </main>
  );
}
