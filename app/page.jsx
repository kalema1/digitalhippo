import Hero from "@/components/hero/Hero";
import HomeProperties from "@/components/homeProperties/HomeProperties";
import InformationBoxes from "@/components/infoBoxes/InformationBoxes";

export default function Home() {
  console.log("server side");
  return (
    <>
      <Hero />
      <InformationBoxes />
      <HomeProperties />
    </>
  );
}
