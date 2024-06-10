import { infoBoxData } from "@/data/informationBoxData";
import InformationBox from "./InformationBox";

export default function InformationBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {infoBoxData.map((data) => (
            <InformationBox data={data} key={data.heading} />
          ))}
        </div>
      </div>
    </section>
  );
}
