import Hero from "@/components/hero/Hero";
import HomeProperties from "@/components/homeProperties/HomeProperties";
import InformationBoxes from "@/components/infoBoxes/InformationBoxes";
import conncetDB from "@/config/database";

export default async function Home() {
  await conncetDB();
  console.log("server side");
  return (
    <>
      <Hero />
      <InformationBoxes />
      <HomeProperties />
    </>
  );
}
