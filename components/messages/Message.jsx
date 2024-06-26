"use client";

import Link from "next/link";

export default function Message({ message }) {
  return (
    <div className="space-y-4">
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        <h2 className="text-xl mb-4">
          <span className="font-bold">Property Inquiry: </span>
          {message.property.name}
        </h2>
        <p className="text-gray-700">{message.body}</p>

        <ul className="mt-4">
          <li>
            <strong>Name: </strong> {message.sender.username}
          </li>

          <li>
            <strong>Reply Email: </strong>
            <Link href={`mailto:${message.email}`} className="text-blue-500">
              {message.email}
            </Link>
          </li>
          <li>
            <strong>Reply Phone: </strong>
            <Link href={`tel:${message.phone}`} className="text-blue-500">
              {message.phone}
            </Link>
          </li>
          <li>
            <strong>Received: </strong>
            {new Date(message.createdAt).toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
}
