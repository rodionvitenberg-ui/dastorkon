import Hero from "@/components/home/Hero";
import About from "../../components/home/About";
import MapSection from "../../components/home/MapSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <About />
      <MapSection />
      {/* Footer автоматически отрендерится ниже силами layout.tsx */}
    </main>
  );
}