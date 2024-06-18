import Image from "next/image";

export default function PropertyImageHeader({ image }) {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={`/properties/${image}`}
            alt=""
            className="object-cover h-[400px] w-full"
            width={1800}
            height={0}
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
