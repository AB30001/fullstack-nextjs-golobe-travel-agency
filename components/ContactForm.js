"use client";

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8DD3BB]">
          <MessageCircle className="h-5 w-5 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
      </div>

      {submitted ? (
        <div className="rounded-xl bg-[#CDEAE1] p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8DD3BB]">
            <Send className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-secondary">Message Sent!</h3>
          <p className="text-secondary/70">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm font-medium text-secondary underline hover:no-underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-[#8DD3BB] focus:outline-none focus:ring-2 focus:ring-[#8DD3BB]/20"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-[#8DD3BB] focus:outline-none focus:ring-2 focus:ring-[#8DD3BB]/20"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-[#8DD3BB] focus:outline-none focus:ring-2 focus:ring-[#8DD3BB]/20"
            >
              <option value="">Select a topic</option>
              <option value="booking">Booking Inquiry</option>
              <option value="tour-info">Tour Information</option>
              <option value="partnership">Partnership Opportunities</option>
              <option value="feedback">Feedback & Suggestions</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-[#8DD3BB] focus:outline-none focus:ring-2 focus:ring-[#8DD3BB]/20"
              placeholder="Tell us about your travel plans or questions..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-white transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
