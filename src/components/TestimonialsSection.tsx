import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, Send, Clock, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { approvedReviews, ratingMetrics, submitReview, addToast } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    rating: 5,
    propertyOrService: 'The Stone Residence',
    reviewText: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail || !formData.reviewText) {
      addToast({
        type: 'error',
        title: 'Form Incomplete',
        message: 'Please complete all required fields.'
      });
      return;
    }

    submitReview(formData);
    setFormData({
      clientName: '',
      clientEmail: '',
      rating: 5,
      propertyOrService: 'The Stone Residence',
      reviewText: ''
    });
    setIsFormOpen(false);
  };

  const hasReviews = approvedReviews.length > 0;

  return (
    <section id="testimonials-section" className="py-24 bg-[#080808] border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C6A66B] font-mono">
              CLIENT REPUTATION & FIDUCIARY TRUST
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#F5F1E8] tracking-tight mb-4">
            Trusted By Those Who Expect More
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-[#C6A66B] font-normal mb-3">
            "Exceptional relationships. Extraordinary experiences."
          </p>

          <p className="text-xs sm:text-sm text-[#A7A7A7] font-light leading-relaxed">
            Every transaction represents a sacred trust. Our reputation is founded upon discreet stewardship, market mastery, and enduring relationships with families and institutions worldwide.
          </p>
        </div>

        {/* Dynamic Rating Overview Dashboard (Strictly calculated from approved published reviews) */}
        {hasReviews ? (
          <div className="mb-16 p-8 bg-[#121212] border border-[#C6A66B]/30 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xl">
            {/* Average Rating Score */}
            <div className="md:col-span-4 text-center md:border-r border-neutral-800 pr-0 md:pr-6">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#A7A7A7] font-mono mb-2">
                Audited Client Satisfaction
              </span>
              <div className="font-serif text-5xl sm:text-6xl text-[#C6A66B] font-light mb-2">
                {ratingMetrics.averageRating.toFixed(1)}
                <span className="text-xl text-[#A7A7A7] font-sans"> / 5.0</span>
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(ratingMetrics.averageRating)
                        ? 'text-[#C6A66B] fill-current'
                        : 'text-neutral-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#A7A7A7] font-mono">
                Based upon {ratingMetrics.totalReviews} verified published reviews
              </span>
            </div>

            {/* Five Star Percentage & Metric Highlights */}
            <div className="md:col-span-4 text-center md:border-r border-neutral-800 px-0 md:px-6">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-[#A7A7A7] font-mono mb-2">
                Five-Star Consistency
              </span>
              <div className="font-serif text-5xl sm:text-6xl text-[#F5F1E8] font-light mb-2">
                {ratingMetrics.fiveStarPercentage}%
              </div>
              <p className="text-xs text-[#A7A7A7] font-light leading-relaxed">
                Of clients awarded VANTERRA full five-star marks across advisory, privacy, and transaction execution.
              </p>
            </div>

            {/* Rating Distribution Bars (1–5 Stars) */}
            <div className="md:col-span-4 space-y-1.5 pl-0 md:pl-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A66B] font-mono block mb-1">
                Rating Breakdown (1 – 5 Stars)
              </span>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingMetrics.ratingDistribution[stars] || 0;
                const pct = ratingMetrics.totalReviews > 0 ? (count / ratingMetrics.totalReviews) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2 text-xs">
                    <span className="w-16 text-[#A7A7A7] font-mono text-[11px] shrink-0">
                      {stars} Star{stars > 1 ? 's' : ''}
                    </span>
                    <div className="flex-1 h-2 bg-[#080808] border border-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-[#C6A66B] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-6 text-right font-mono text-[#F5F1E8] text-[10px]">{count}</span>
                  </div>
                );
              })}
              <p className="text-[10px] text-[#777] font-mono pt-1">
                Client testimonials rated across a 1.0 to 5.0 scale.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-16 p-8 bg-[#121212] border border-neutral-800 text-center">
            <p className="font-serif text-lg text-[#F5F1E8] mb-1">
              Genuine Client Reviews
            </p>
            <p className="text-xs text-[#A7A7A7] font-light max-w-md mx-auto">
              Testimonials are displayed exclusively upon verification and executive moderation.
            </p>
          </div>
        )}

        {/* Testimonials Editorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-7 bg-[#141414] border border-neutral-800 flex flex-col justify-between relative group hover:border-[#C6A66B]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= Math.round(rev.rating) ? 'text-[#C6A66B] fill-current' : 'text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-[#C6A66B] font-medium">
                      {rev.rating.toFixed(1)} / 5.0
                    </span>
                  </div>

                  {rev.verifiedCustomer && (
                    <div className="inline-flex items-center gap-1 text-[10px] text-[#C6A66B] font-mono tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>VERIFIED CLIENT</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#C6A66B] font-mono uppercase tracking-wider mb-3">
                  {rev.propertyOrService}
                </p>

                <p className="text-xs sm:text-sm text-[#F5F1E8]/90 font-light leading-relaxed mb-6 italic">
                  "{rev.reviewText}"
                </p>

                {rev.adminResponse && (
                  <div className="p-3 bg-[#0d0d0d] border-l border-[#C6A66B]/60 text-xs mb-4 text-[#A7A7A7]">
                    <span className="block text-[9px] uppercase tracking-wider text-[#C6A66B] font-mono mb-1">
                      VANTERRA Executive Response:
                    </span>
                    <span className="font-light italic text-[#F5F1E8]/80">{rev.adminResponse}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-[#C6A66B]/40 bg-[#C6A66B]/10 flex items-center justify-center font-serif text-xs text-[#C6A66B]">
                    {rev.clientName.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-medium text-[#F5F1E8]">{rev.clientName}</span>
                    <span className="text-[10px] text-[#777] font-mono">
                      {new Date(rev.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <Quote className="w-4 h-4 text-neutral-700 group-hover:text-[#C6A66B] transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Action / Form Trigger */}
        <div className="text-center">
          {!isFormOpen ? (
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 hover:border-[#C6A66B] text-[#A7A7A7] hover:text-[#C6A66B] text-xs uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Submit Confidential Client Testimonial</span>
            </button>
          ) : (
            <div className="max-w-2xl mx-auto p-8 bg-[#151515] border border-[#C6A66B]/40 text-left animate-fadeIn">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
                <div>
                  <h3 className="font-serif text-2xl text-[#F5F1E8]">Share Your Experience</h3>
                  <p className="text-xs text-[#A7A7A7] font-light">
                    Submitted reviews enter an administrative moderation queue prior to publication.
                  </p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-xs text-[#A7A7A7] hover:text-[#F5F1E8] uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Client Full Name / Initials *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Lord Harrington / M. C."
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Confidential Verification Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="client@familyoffice.com"
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                      Related Property or Service *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.propertyOrService}
                      onChange={(e) => setFormData({ ...formData, propertyOrService: e.target.value })}
                      placeholder="e.g. The Contemporary Villa / Acquisition Advisory"
                      className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] font-mono">
                        Rating (1 – 5 Range) *
                      </label>
                      <span className="text-xs font-mono text-[#C6A66B] font-semibold">
                        {formData.rating} of 5 Stars
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          type="button"
                          key={starVal}
                          onClick={() => setFormData({ ...formData, rating: starVal })}
                          className={`py-2 px-1 border text-xs font-mono transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                            formData.rating >= starVal
                              ? 'border-[#C6A66B] bg-[#C6A66B]/20 text-[#C6A66B]'
                              : 'border-neutral-700 bg-[#080808] text-neutral-500 hover:border-neutral-600 hover:text-[#F5F1E8]'
                          }`}
                          title={`Select ${starVal} Star${starVal > 1 ? 's' : ''}`}
                        >
                          <Star
                            className={`w-3.5 h-3.5 transition-transform ${
                              formData.rating >= starVal ? 'fill-[#C6A66B] text-[#C6A66B]' : 'text-neutral-600'
                            }`}
                          />
                          <span className="text-[11px] font-semibold">{starVal}★</span>
                        </button>
                      ))}
                    </div>
                    <span className="block text-[10px] text-[#A7A7A7] font-mono mt-1.5">
                      Select a rating from 1 to 5 stars for your experience.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#A7A7A7] mb-1 font-mono">
                    Written Testimonial *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.reviewText}
                    onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                    placeholder="Describe the transaction diligence, partnership caliber, and customer experience..."
                    className="w-full px-3 py-2 bg-[#080808] border border-neutral-700 focus:border-[#C6A66B] text-xs text-[#F5F1E8] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C6A66B] hover:bg-[#d8b97d] text-[#080808] text-xs font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit For Executive Moderation</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
