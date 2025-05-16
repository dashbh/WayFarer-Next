import Image from "next/image";

interface Review {
  id: number;
  name: string;
  email: string;
  body: string;
}

// Helper to generate a unique avatar (using https://ui-avatars.com/)
const getAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=64`;

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mt-8 p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        What People Are Saying
      </h2>
      <div className="flex flex-col gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50 hover:shadow transition"
          >
            <Image
              src={getAvatarUrl(review.name)}
              alt={review.name}
              width={48}
              height={48}
              className="w-[48px] h-[48px] rounded-full border border-gray-200 object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <span className="text-xs text-gray-400">&bull;</span>
                <p className="text-xs text-gray-500">{review.email}</p>
              </div>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {review.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
