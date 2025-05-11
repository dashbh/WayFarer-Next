interface Review {
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="mt-8 p-5 border border-gray-300 rounded-md">
      <h2 className="text-xl font-bold mb-3">Customer Reviews</h2>
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-3 border border-gray-300 rounded-md"
          >
            <p className="font-bold">{review.name}</p>
            <p className="text-sm text-gray-500">{review.email}</p>
            <p className="mt-2">{review.body}</p>
            <hr className="mt-3 border-t border-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
