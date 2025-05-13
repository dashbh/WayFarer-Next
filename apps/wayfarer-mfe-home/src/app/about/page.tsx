import { generateAboutMetadata } from "@wayfarer/utils";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = generateAboutMetadata();

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Banner Section */}
      <div className="relative w-full h-72 mb-6 rounded-lg overflow-hidden">
        <Image
          src="/images/about-banner.jpg"
          alt="About Us Banner"
          width={1920} // Replace with the actual width of the image
          height={288} // Replace with the actual height of the image
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold">About Us</h1>

        <p className="text-lg text-gray-700">
          Welcome to our platform! We are committed to providing the best
          experience for our users. Our team is dedicated to building
          high-quality, scalable, and efficient web applications.
        </p>

        <p className="text-lg text-gray-700">
          With a focus on modern web technologies, we ensure smooth and
          optimized performance across all our services.
        </p>

        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="text-md text-gray-700">
          Our mission is to create a seamless and enjoyable digital experience.
          We believe in:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>✅ User-friendly interfaces</li>
          <li>✅ High-performance applications</li>
          <li>✅ Secure and scalable architecture</li>
          <li>✅ Continuous innovation</li>
        </ul>

        <h2 className="text-2xl font-bold">Meet Our Team</h2>
        <p className="text-md text-gray-700">
          Our team consists of talented professionals specializing in frontend,
          backend, and UI/UX design.
        </p>
      </div>
    </div>
  );
}
