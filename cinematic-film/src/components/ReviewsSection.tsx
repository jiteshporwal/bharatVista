"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquarePlus, X, Send, Sparkles, User, CheckCircle2 } from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  tag?: string;
  comment: string;
  createdAt: string;
}

const SUGGESTED_OPTIONS = [
  "Best tour & travel company",
  "I loved the registration process",
  "I loved the trip",
  "I loved the UI",
  "I want to share my own experience",
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [selectedTag, setSelectedTag] = useState(SUGGESTED_OPTIONS[0]);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Fetch genuine backend reviews (initial state strictly 0 reviews)
  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch {
      // Keep empty if fetch fails
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "BharatVista Traveller",
          rating,
          tag: selectedTag,
          comment: comment.trim() || selectedTag,
        }),
      });

      if (res.ok) {
        setSubmittedSuccess(true);
        fetchReviews();
        setTimeout(() => {
          setSubmittedSuccess(false);
          setIsModalOpen(false);
          setName("");
          setComment("");
        }, 1800);
      }
    } catch {
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AUTHENTIC TRAVELLER WORDS • ZERO FABRICATION</span>
        </div>

        {reviews.length > 0 ? (
          <>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Real Trips. <span className="text-[#EA580C]">Real Memories.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-light">
              Straight from BharatVista travellers — no filters, no scripts.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Traveller Voices
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 font-light">
              We never fabricate testimonials or invent fake reviews.
            </p>
          </>
        )}
      </div>

      {/* Review Content: Zero State vs Genuine Review Feed */}
      {reviews.length === 0 && !loading ? (
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#0A2E4C]/40 border border-white/10 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
            <Star className="w-8 h-8 fill-amber-400/20 text-amber-400" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-mono font-bold text-amber-400 block">
              HONEST BEGINNING
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              0 Reviews Yet
            </h3>
            <p className="text-base font-serif italic text-amber-200">
              &ldquo;But your one review still matters to us.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed pt-1">
              Tell us honestly how your BharatVista experience felt. Your honest words help us make every next trip better.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] shadow-lg shadow-[#EA580C]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Share Your Experience</span>
          </button>
        </div>
      ) : (
        /* Horizontally Scrollable Review Feed (Part 27) */
        <div className="space-y-6">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-amber-500/40">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="min-w-[300px] sm:min-w-[380px] p-6 rounded-3xl bg-[#0A2E4C]/50 border border-white/10 space-y-4 text-left shrink-0 shadow-xl"
              >
                {/* Rating stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-zinc-600"
                        }`}
                      />
                    ))}
                  </div>
                  {rev.tag && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {rev.tag}
                    </span>
                  )}
                </div>

                <p className="text-sm font-serif italic text-zinc-200 leading-relaxed">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-semibold text-white">{rev.name}</span>
                  <span className="text-[10px] font-mono">
                    {new Date(rev.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-amber-300 bg-white/5 hover:bg-white/10 border border-amber-400/30 transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Add Your Honest Review</span>
            </button>
          </div>
        </div>
      )}

      {/* Review Submission Modal (Part 26) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#061727] border border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white my-8 space-y-6"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-zinc-300 hover:text-white"
                aria-label="Close review dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {!submittedSuccess ? (
                <form onSubmit={handleSubmitReview} className="space-y-5 text-left">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-bold block">
                      BHARATVISTA REVIEW
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      Tell Us Your Experience
                    </h3>
                    <p className="text-xs text-zinc-300">
                      Your authentic review helps us improve every weekend journey.
                    </p>
                  </div>

                  {/* Star rating selector (Automatically 5 stars, editable) */}
                  <div>
                    <label className="block text-xs text-zinc-300 mb-2">
                      Your Rating (5 Stars selected by default)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-zinc-600"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono text-amber-300 ml-2">
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Your Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ananya Verma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                    />
                  </div>

                  {/* 5 Suggested Options (Part 26) */}
                  <div>
                    <label className="block text-xs text-zinc-300 mb-2">
                      Quick Impression
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTED_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => {
                            setSelectedTag(opt);
                            if (!comment) setComment(opt);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer text-left ${
                            selectedTag === opt
                              ? "bg-amber-500/25 border border-amber-400 text-amber-200"
                              : "bg-white/5 border border-white/10 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Comment Input */}
                  <div>
                    <label className="block text-xs text-zinc-300 mb-1.5">
                      Your Thoughts or Trip Feedback
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share how the journey felt, your favourite moment, or any suggestions..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-amber-400 focus:outline-none text-sm text-white placeholder:text-zinc-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#f97316] hover:to-[#ea580c] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Saving Review..." : "Submit Review"}</span>
                  </button>
                </form>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-serif font-bold text-white">
                    Review Saved!
                  </h4>
                  <p className="text-xs text-zinc-300">
                    Thank you for sharing your genuine experience with BharatVista.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

