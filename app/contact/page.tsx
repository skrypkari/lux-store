import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Send,
  MessageCircle
} from "lucide-react";
import ContactForm from "@/components/contact-form";

export default async function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-white/20 bg-white/5 px-6 py-2 backdrop-blur-sm">
                <span className="font-general-sans text-sm font-medium uppercase tracking-widest text-white/80">
                  Get In Touch
                </span>
              </div>
            </div>
            <h1 className="mb-6 font-satoshi text-6xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              Contact Us
            </h1>
            <p className="font-general-sans text-xl leading-relaxed text-white/80">
              Our team is here to assist you with any inquiries
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Contact Info Cards - Top Row */}
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Address Card */}
            <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-4 inline-flex rounded-xl bg-black p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-satoshi text-lg font-bold">Visit Us</h3>
              <p className="mb-3 font-general-sans text-sm leading-relaxed text-black/70">
                6 Brindley Place, Birmingham,<br />
                B1 2JB, United Kingdom
              </p>
              <Button
                variant="link"
                className="h-auto p-0 font-general-sans text-xs font-semibold text-black"
                asChild
              >
                <a
                  href="https://maps.google.com/?q=6+Brindley+Place+Birmingham+B1+2JB"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions →
                </a>
              </Button>
            </div>

            {/* Hours Card */}
            <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-4 inline-flex rounded-xl bg-black p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-satoshi text-lg font-bold">Open Daily</h3>
              <p className="mb-1 font-general-sans text-xl font-bold text-black">
                10:00 AM — 6:00 PM
              </p>
              <p className="font-general-sans text-xs text-black/50">
                Monday through Sunday
              </p>
            </div>

            {/* Phone Card */}
            <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-4 inline-flex rounded-xl bg-black p-3">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-satoshi text-lg font-bold">Call Us</h3>
              <a
                href="tel:+445557771234"
                className="mb-1 block font-general-sans text-base font-bold text-black transition-colors hover:text-black/70"
              >
                +44-555-777-1234
              </a>
              <p className="font-general-sans text-xs text-black/50">
                Business hours
              </p>
            </div>

            {/* Email Card */}
            <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-4 inline-flex rounded-xl bg-black p-3">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-satoshi text-lg font-bold">Email</h3>
              <a
                href="mailto:info@lux-store.eu"
                className="mb-1 block font-general-sans text-base font-bold text-black transition-colors hover:text-black/70"
              >
                info@lux-store.eu
              </a>
              <p className="font-general-sans text-xs text-black/50">
                24h response time
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Map & Social */}
            <div className="space-y-8 lg:col-span-1">
              {/* Map */}
              <div className="overflow-hidden rounded-3xl border border-black/10 shadow-2xl">
                <div className="border-b border-black/10 bg-black px-6 py-4">
                  <h3 className="font-satoshi text-xl font-bold text-white">Location</h3>
                </div>
                <div className="aspect-square bg-black/5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.2851547!2d-1.9124!3d52.4797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc8cf6e09c89%3A0x9f8e1e8b7d0e8!2s6%20Brindley%20Pl%2C%20Birmingham%20B1%202JB%2C%20UK!5e0!3m2!1sen!2s!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl">
                <div className="border-b border-black/10 bg-black px-6 py-4">
                  <h3 className="font-satoshi text-xl font-bold text-white">Connect</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/445557771234"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2 rounded-xl border border-black/10 bg-black/5 p-4 transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black"
                    >
                      <MessageCircle className="h-6 w-6 transition-colors group-hover:text-white" />
                      <span className="font-satoshi text-xs font-bold transition-colors group-hover:text-white">WhatsApp</span>
                    </a>

                    {/* Telegram */}
                    <a
                      href="https://t.me/luxstore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2 rounded-xl border border-black/10 bg-black/5 p-4 transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black"
                    >
                      <Send className="h-6 w-6 transition-colors group-hover:text-white" />
                      <span className="font-satoshi text-xs font-bold transition-colors group-hover:text-white">Telegram</span>
                    </a>

                    {/* Twitter */}
                    <a
                      href="https://twitter.com/luxstore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2 rounded-xl border border-black/10 bg-black/5 p-4 transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black"
                    >
                      <svg
                        className="h-6 w-6 transition-colors group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="font-satoshi text-xs font-bold transition-colors group-hover:text-white">Twitter</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="border-t border-black/10 bg-black/5 py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-satoshi text-4xl font-bold">Have Questions?</h2>
            <p className="mb-8 font-general-sans text-lg text-black/70">
              Check our frequently asked questions or reach out directly to our concierge team
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="gap-2 shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                Schedule a Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-5 w-5" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
