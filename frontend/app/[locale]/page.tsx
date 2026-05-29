import About from "../../components/home/About";
import MapSection from "../../components/home/MapSection";

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      {/* Hero автоматически отрендерится выше силами layout.tsx */}
      <About />
      <MapSection />
      {/* Footer автоматически отрендерится ниже силами layout.tsx */}
    </main>
  );
}