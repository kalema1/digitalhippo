import Hero from "@/components/hero/Hero";
import InformationBoxes from "@/components/infoBoxes/InformationBoxes";

export default function Home() {
  console.log("server side");
  return (
    <>
      <Hero />
      <InformationBoxes />
    </>
  );
}
