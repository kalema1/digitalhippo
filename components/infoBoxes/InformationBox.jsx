import Link from "next/link";

export default function InformationBox({ data }) {
  return (
    <div className={`${data.backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${data.textColor} text-2xl font-bold`}>{data.heading}</h2>
      <p className={`${data.textColor} mt-2 mb-4`}>{data.informationText}</p>
      <Link
        href={data.buttonInfo.link}
        className={`${data.buttonInfo.background} inline-block text-white rounded-lg px-4 py-2 hover:opacity-80`}
      >
        {data.buttonInfo.text}
      </Link>
    </div>
  );
}
