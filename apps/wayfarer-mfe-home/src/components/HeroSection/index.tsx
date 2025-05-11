export default function HeroSection() {
  return (
    <div className="max-w-3xl mx-auto text-center py-8">
      <div className="flex flex-col gap-8 md:gap-14">
        <h1 className="font-semibold text-2xl sm:text-4xl md:text-6xl leading-tight">
          Wayfarer <br />
          <span className="text-green-400 text-xl sm:text-2xl md:text-4xl">
            Travel Beyond Boundaries
          </span>
        </h1>
        <p className="text-gray-500">
          Discover the world like never before. Wayfarer connects explorers with
          unforgettable experiences, insider travel tips, and exclusive rewards.
          Adventure starts here—where will your journey take you next? 🌍✨
        </p>
        <div className="flex flex-col gap-3 items-center">
          <a
            href="/explore"
            className="bg-green-400 text-white rounded-full px-6 py-3 hover:bg-green-500 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}
