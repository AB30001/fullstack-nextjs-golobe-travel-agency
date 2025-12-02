import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with NordExplore. We're here to help you plan your perfect Nordic adventure across Norway, Iceland, Sweden, Finland, and Denmark.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-[90%] max-w-7xl py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Get in Touch
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Have questions about Nordic adventures? We're here to help you plan your perfect Scandinavian experience.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info Cards */}
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl bg-[#CDEAE1] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#8DD3BB]">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-secondary">Email Us</h3>
              <p className="text-secondary/70">
                <a href="mailto:hello@nordexplore.com" className="hover:underline">
                  hello@nordexplore.com
                </a>
              </p>
              <p className="mt-1 text-sm text-secondary/60">
                We typically respond within 24 hours
              </p>
            </div>

            <div className="rounded-2xl bg-[#CDEAE1] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#8DD3BB]">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-secondary">Our Office</h3>
              <p className="text-secondary/70">
                Stockholm, Sweden
              </p>
              <p className="mt-1 text-sm text-secondary/60">
                Serving all Nordic countries
              </p>
            </div>

            <div className="rounded-2xl bg-[#CDEAE1] p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#8DD3BB]">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-secondary">Support Hours</h3>
              <p className="text-secondary/70">
                Monday - Friday: 9AM - 6PM CET
              </p>
              <p className="mt-1 text-sm text-secondary/60">
                Weekend support available for urgent inquiries
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-2 font-semibold text-gray-900">How do I book a tour?</h3>
              <p className="text-gray-600">
                Browse our experiences, select the tour you like, and click "Book Tour" to be directed to our trusted partner Viator where you can complete your booking securely.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-2 font-semibold text-gray-900">Can I cancel my booking?</h3>
              <p className="text-gray-600">
                Cancellation policies vary by tour operator. Check the specific tour's cancellation policy on Viator before booking, or contact their support for assistance.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-2 font-semibold text-gray-900">Do you offer group discounts?</h3>
              <p className="text-gray-600">
                Many of our partner tours offer group pricing. Check the tour details for group rates, or contact us for help finding the best deals for larger parties.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-2 font-semibold text-gray-900">What's the best time to see the Northern Lights?</h3>
              <p className="text-gray-600">
                The aurora season typically runs from September to March. Peak viewing is usually December to February in Norway, Iceland, Finland, and Sweden.
              </p>
            </div>
          </div>
        </div>
      </main>
  );
}
