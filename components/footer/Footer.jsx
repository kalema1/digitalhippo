import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-4 mt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={40}
            height={0}
            className="h-8 w-auto"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} PropertyPulse. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
