import type { Metadata } from "next";
import StoryContent from "@/components/story/StoryContent";

export const metadata: Metadata = {
  title: "Story | Dastorkon",
  description:
    "Dastorkon was born in Karakol — hospitality, fire, and the living dastarkhan of Central Asia.",
};

export default function StoryPage() {
  return <StoryContent />;
}
