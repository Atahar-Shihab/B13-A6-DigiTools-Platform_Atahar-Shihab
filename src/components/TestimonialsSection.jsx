import React, { useState } from 'react';
import { FiStar, FiCheckCircle, FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { sound } from '../utils/sound';
import { toast } from 'react-toastify';

export const TestimonialsSection = () => {
  const [filterRating, setFilterRating] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: ''
  });

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Staff Product Designer at ScaleTech',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      comment: 'DigiTools has become our design team’s secret weapon. The UI components are clean, WCAG compliant, and our handover time to React engineers dropped by 65%.',
      verified: true,
      product: 'UI/UX Design Master System'
    },
    {
      id: 2,
      name: 'Marcus Vance',
      role: 'Full-Stack Developer & Founder',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      comment: 'The Headless Cart integration and AI Prompt Crafter paid for themselves on day one. Literally saved me two weeks of wrestling with custom stripe webhooks.',
      verified: true,
      product: 'E-Commerce Headless Cart'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      role: 'Growth Marketing Director',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      comment: 'The Social Media Content Kit and Writing Assistant Pro transformed our weekly content production. Our LinkedIn engagement spiked 400% in month one!',
      verified: true,
      product: 'Social Media Content Kit'
    },
    {
      id: 4,
      name: 'David Chen',
      role: 'Creative Director at StudioForm',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      comment: 'Super clean architecture, beautiful typography scales, and great responsive layouts. Perfect starting point for any client-facing digital showcase.',
      verified: true,
      product: 'Elite Portfolio Suite'
    }
  ]);

  const filteredReviews = filterRating === '5'
    ? reviews.filter((r) => r.rating === 5)
    : reviews;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    sound.pop();
    const created = {
      id: Date.now(),
      name: newReview.name,
      role: newReview.role || 'Verified Creator',
      rating: Number(newReview.rating),
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      comment: newReview.comment,
      verified: true,
      product: 'Verified DigiTools Community'
    };
    setReviews([created, ...reviews]);
    setIsModalOpen(false);
    setNewReview({ name: '', role: '', rating: 5, comment: '' });
    toast.success('Thank you! Your verified review has been posted.', { icon: '⭐' });
  };

  return (
    <section id="reviews" className="py-24 bg-gray-50/70 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/40 text-[#8B5CF6] dark:text-purple-300 inline-block mb-3">
              Social Proof & Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
              Loved by Over 50,000+ Creators
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
              See how modern creators, designers, and software engineers build faster with DigiTools.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold">
              <button
                onClick={() => {
                  sound.click();
                  setFilterRating('all');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterRating === 'all'
                    ? 'bg-[#8B5CF6] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                }`}
              >
                All Reviews
              </button>
              <button
                onClick={() => {
                  sound.click();
                  setFilterRating('5');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterRating === '5'
                    ? 'bg-[#8B5CF6] text-white shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900'
                }`}
              >
                5-Star Only
              </button>
            </div>

            <button
              onClick={() => {
                sound.click();
                setIsModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <FiMessageSquare /> Leave a Review
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Verified Badge */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex text-amber-400 text-xs gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-current" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      <FiCheckCircle className="text-xs" /> Verified Buyer
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-purple-200 dark:border-purple-800"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-gray-400 truncate">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave Review Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div 
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Share Your Feedback</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <FiX size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    placeholder="e.g. Liam Parker"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Role / Company</label>
                  <input
                    type="text"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    placeholder="e.g. Lead Frontend Engineer at Nexa"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 Stars - Exceptional)</option>
                    <option value="4">⭐⭐⭐⭐ (4 Stars - Very Good)</option>
                    <option value="3">⭐⭐⭐ (3 Stars - Average)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Your Experience</label>
                  <textarea
                    rows={3}
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    placeholder="What did you love about DigiTools?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#8B5CF6] hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <FiSend /> Post Verified Review
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
