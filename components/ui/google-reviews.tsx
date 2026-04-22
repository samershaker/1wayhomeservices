"use client";

import React from 'react';
import { HVACIcons } from './icons/hvac-icons';

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  authorInitials: string;
}

interface GoogleReviewsProps {
  businessName?: string;
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
  googleBusinessUrl?: string;
  className?: string;
  showReviewText?: boolean;
  maxReviews?: number;
}

// Mock data - replace with actual Google My Business API data
const defaultReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    rating: 5,
    text: 'Excellent service! The technician arrived on time, was very professional, and fixed our AC quickly. Great pricing too!',
    date: '2 weeks ago',
    authorInitials: 'SJ'
  },
  {
    id: '2',
    author: 'Mike Rodriguez',
    rating: 5,
    text: 'Everglade Heating and Air saved the day! Our heating system went out during a cold snap and they had us up and running the same day.',
    date: '1 month ago',
    authorInitials: 'MR'
  },
  {
    id: '3',
    author: 'Jennifer Chen',
    rating: 5,
    text: 'Professional installation of our new AC unit. Clean work, fair pricing, and great customer service throughout.',
    date: '2 months ago',
    authorInitials: 'JC'
  },
  {
    id: '4',
    author: 'David Thompson',
    rating: 5,
    text: 'Highly recommend! Quick diagnosis, honest pricing, and quality repair work. Will definitely use them again.',
    date: '3 months ago',
    authorInitials: 'DT'
  }
];

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= rating ? '#fbbf24' : '#e5e7eb'}
          className="transition-colors"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {review.authorInitials}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-gray-900">{review.author}</h4>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <StarRating rating={review.rating} />
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
    </div>
  );
};

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  businessName = "Everglade Heating and Air",
  averageRating = 4.9,
  totalReviews = 127,
  reviews = defaultReviews,
  googleBusinessUrl = "#", // Replace with actual Google Business URL
  className = "",
  showReviewText = true,
  maxReviews = 4
}) => {
  const displayReviews = reviews.slice(0, maxReviews);

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} size={24} />
              <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
            </div>
            <div className="text-gray-600">
              Based on <span className="font-semibold">{totalReviews}</span> Google reviews
            </div>
          </div>
          
          {/* Check Our Reviews Button */}
          <a
            href={googleBusinessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 px-6 py-3 rounded-lg font-semibold text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Check Our Reviews on Google
            <HVACIcons.ExternalLink size={16} className="text-gray-500" />
          </a>
        </div>

        {/* Reviews Grid */}
        {showReviewText && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {displayReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <HVACIcons.Tool size={32} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Licensed & Insured</h3>
              <p className="text-sm text-gray-600">Fully certified HVAC professionals</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <HVACIcons.Emergency size={32} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">24/7 Emergency</h3>
              <p className="text-sm text-gray-600">Available when you need us most</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-yellow-600">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">5-Star Service</h3>
              <p className="text-sm text-gray-600">Consistently top-rated by customers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;