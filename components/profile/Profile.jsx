"use client";

import Image from "next/image";
import Link from "next/link";
import { useProfile } from "./useProfile";
import Loader from "@/ui/Loader";

export default function Profile() {
  const {
    profileImage,
    ProfileEmail,
    ProfileName,
    properties,
    isLoading,
    handleDeleteProperty,
  } = useProfile();

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || `/images/profile.png`}
                  alt="User"
                  width={300}
                  height={0}
                  priority={true}
                />
              </div>
              <h2 className=" text-xs sm:text-xl mb-4">
                <span className="font-bold block">Name: </span> {ProfileName}
              </h2>
              <h2 className=" text-xs sm:text-xl">
                <span className="font-bold block">Email: </span> {ProfileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!isLoading && properties.length === 0 && (
                <p>You have no Property Listings</p>
              )}
              {isLoading ? (
                <Loader loading={isLoading} />
              ) : (
                properties.map((property) => (
                  <div className="mb-10" key={property._id}>
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt={property.name}
                        width={1800}
                        height={0}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address: {property.location.street}{" "}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
