import type { Metadata } from "next";
import StoryContent from "@/components/story/StoryContent";

export const metadata: Metadata = {
  title: "Story | Dastorkon",
  description:
    "Dastorkon was born in Karakol — hospitality, fire, and the living dastorkon of Central Asia.",
};

export default function StoryPage() {
  return <StoryContent />;
}