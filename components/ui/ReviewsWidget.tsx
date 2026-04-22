"use client";

import { motion } from "framer-motion";

/* ═══════════════════════════════════════════
   REVIEWS WIDGET - Premium Google Reviews Display
   Glassmorphic design, ready for real data integration
   ═══════════════════════════════════════════ */

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  avatar?: string;
}

interface ReviewsWidgetProps {
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
  googlePlaceId?: string;
  className?: string;
}

// Placeholder reviews - replace with real data
const placeholderReviews: Review[] = [
  {
    author: "Michael R.",
    rating: 5,
    text: "Karam was incredibly professional and responsive. Our AC went out during a heat wave and he came same-day. Honest pricing, quality work. Highly recommend!",
    date: "2 weeks ago",
  },
  {
    author: "Sarah L.",
    rating: 5,
    text: "Best HVAC experience I've ever had. Karam explained everything clearly, didn't try to upsell, and the installation was flawless. Our new system is so quiet!",
    date: "1 month ago",
  },
  {
    author: "David K.",
    rating: 5,
    text: "Called for an emergency repair at 9pm and Karam answered. Fixed our furnace the next morning. Fair price, great service. This is how all contractors should operate.",
    date: "3 weeks ago",
  },
];

// Star rating component
function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizes[size]} ${
            star <= rating ? "text-yellow-400" : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

// Google logo component
function GoogleLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

// Individual review card
function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="glass-card p-6 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-everglade-orange/20 to-everglade-navy/20 flex items-center justify-center text-everglade-orange font-display font-bold text-sm border border-white/10">
            {review.author.charAt(0)}
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm">
              {review.author}
            </p>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        <GoogleLogo />
      </div>

      {/* Stars */}
      <div className="mb-3">
        <StarRating rating={review.rating} size="sm" />
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-400 leading-relaxed flex-grow">
        &ldquo;{review.text}&rdquo;
      </p>
    </motion.div>
  );
}

export function ReviewsWidget({
  reviews = placeholderReviews,
  averageRating = 5.0,
  totalReviews = 47,
  googlePlaceId,
  className = "",
}: ReviewsWidgetProps) {
  const googleReviewsUrl = googlePlaceId
    ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}`
    : "https://www.google.com/search?q=everglade+heating+and+air+san+diego+reviews";

  return (
    <section className={`py-24 md:py-32 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-label text-everglade-orange mb-4">
            CUSTOMER REVIEWS
          </p>
          <h2 className="font-display text-display-md font-bold mb-6">
            What San Diego Says About{" "}
            <span className="text-gradient-orange">Everglade</span>
          </h2>

          {/* Rating Summary */}
          <div className="inline-flex items-center gap-4 glass-card px-6 py-4 mt-2">
            <div className="flex items-center gap-2">
              <GoogleLogo />
              <span className="text-sm text-gray-400">Google Reviews</span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-white">
                {averageRating.toFixed(1)}
              </span>
              <div>
                <StarRating rating={Math.round(averageRating)} size="sm" />
                <p className="text-xs text-gray-500 mt-1">
                  {totalReviews} reviews
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-secondary group"
          >
            <GoogleLogo />
            <span>View All Reviews on Google</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ReviewsWidget;
