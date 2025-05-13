import type { Metadata } from "next";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { generateContactMetadata } from "@wayfarer/utils";

export const metadata: Metadata = generateContactMetadata();

export default function ContactUs() {
  return (
    <div className="max-w-full">
      {/* Banner Section */}
      <div className="relative w-full h-72">
        <Image
          src="/images/contact-banner.jpg"
          alt="Contact Us"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
          Contact Us
        </h1>
      </div>

      {/* Contact Details Section */}
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Get in Touch with Us</h2>
        <p className="text-lg text-gray-600">
          Have any questions? Reach out to us, and we’ll be happy to assist you.
        </p>

        <div className="flex flex-col gap-6 items-center mt-6">
          <div className="flex items-center gap-2">
            <FaPhone className="text-blue-500" />
            <p className="text-md">+1 234 567 890</p>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <p className="text-md">support@yourcompany.com</p>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-500" />
            <p className="text-md">123 Business Street, Tech City, USA</p>
          </div>
        </div>

        <div className="my-8"></div>

        <h3 className="text-xl font-bold mb-4">Our Office Locations</h3>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-2">
            <FaBuilding className="text-green-500" />
            <p className="text-md">Headquarters: San Francisco, CA</p>
          </div>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-green-500" />
            <p className="text-md">Branch: New York, NY</p>
          </div>
          <div className="flex items-center gap-2">
            <FaBuilding className="text-green-500" />
            <p className="text-md">Branch: London, UK</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="p-8 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6">
          Send Us a Message
        </h2>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
