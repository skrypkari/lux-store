import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Phone, Mail, Send } from "lucide-react";
import ContactForm from "@/components/contact-form";
import WhatsAppButton from "@/components/whatsapp-button";

export default async function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

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

      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-4 inline-flex rounded-xl bg-black p-3">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-satoshi text-lg font-bold">Visit Us</h3>
              <p className="mb-3 font-general-sans text-sm leading-relaxed text-black/70">
                272 Bath Street, Glasgow, <br />
                Scotland, G2 4JR
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

            <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-4 inline-flex rounded-xl bg-black p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-satoshi text-lg font-bold">
                Open Daily
              </h3>
              <p className="mb-1 font-general-sans text-xl font-bold text-black">
                10:00 AM — 6:00 PM
              </p>
              <p className="font-general-sans text-xs text-black/50">
                Monday through Sunday
              </p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className="mb-4 inline-flex rounded-xl bg-black p-3">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-satoshi text-lg font-bold">Call Us</h3>
              <a
                href="tel:+447700184435"
                className="mb-1 block font-general-sans text-base font-bold text-black transition-colors hover:text-black/70"
              >
                +44-7700-18-44-35
              </a>
              <p className="font-general-sans text-xs text-black/50">
                Business hours
              </p>
            </div>

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

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-1">
              <div className="overflow-hidden rounded-3xl border border-black/10 shadow-2xl">
                <div className="border-b border-black/10 bg-black px-6 py-4">
                  <h3 className="font-satoshi text-xl font-bold text-white">
                    Location
                  </h3>
                </div>
                <div className="aspect-square bg-black/5">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2238.757513177991!2d-4.268367!3d55.866242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4888442bff56d5f5%3A0x48cf34e0a97d88c3!2s272%20Bath%20St%2C%20Glasgow%20G2%204JR%2C%20UK!5e0!3m2!1sen!2s!4v1731424800000"
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

              <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl">
                <div className="border-b border-black/10 bg-black px-6 py-4">
                  <h3 className="font-satoshi text-xl font-bold text-white">
                    Connect
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  <a
                    href="tel:+447700184435"
                    className="group flex items-center gap-4 rounded-xl border border-black/10 bg-black/5 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-black hover:bg-black"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black transition-colors group-hover:bg-white">
                      <Phone className="h-6 w-6 text-white transition-colors group-hover:text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="font-satoshi text-xs font-bold text-black/50 transition-colors group-hover:text-white/70">
                        Call Us
                      </p>
                      <p className="font-satoshi text-base font-bold transition-colors group-hover:text-white">
                        +44-7700-18-44-35
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@lux-store.eu"
                    className="group flex items-center gap-4 rounded-xl border border-black/10 bg-black/5 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-black hover:bg-black"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-black transition-colors group-hover:bg-white">
                      <Mail className="h-6 w-6 text-white transition-colors group-hover:text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="font-satoshi text-xs font-bold text-black/50 transition-colors group-hover:text-white/70">
                        Email
                      </p>
                      <p className="font-satoshi text-base font-bold transition-colors group-hover:text-white">
                        info@lux-store.eu
                      </p>
                    </div>
                  </a>

                  <WhatsAppButton />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
