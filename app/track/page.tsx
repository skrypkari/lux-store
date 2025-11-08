import Header from "@/components/header";
import Footer from "@/components/footer";
import TrackingSearch from "@/components/tracking-search";
import { Package, Shield, Truck, Globe } from "lucide-react";

export default async function TrackPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - Unique Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-black/95 to-black/90 py-16 sm:py-20 md:py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute right-1/4 bottom-1/4 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl sm:h-96 sm:w-96" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Dotted Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:24px_24px] sm:bg-[size:40px_40px]" />
        
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-5xl">
            {/* Floating Badge */}
            <div className="mb-6 flex justify-center sm:mb-8">
              <div className="group relative">
                <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-white/20 to-white/5 opacity-75 blur-sm" />
                <div className="relative flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-xl sm:gap-2 sm:px-6 sm:py-3">
                  <Package className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                  <span className="font-general-sans text-[10px] font-bold uppercase tracking-[0.15em] text-white sm:text-sm sm:tracking-[0.2em]">
                    Live Tracking
                  </span>
                </div>
              </div>
            </div>

            {/* Main Title with Gradient */}
            <h1 className="mb-4 text-center font-satoshi text-4xl font-bold leading-[1.1] tracking-tight text-white sm:mb-6 sm:text-6xl md:text-8xl">
              Track Your
              <span className="block bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                Luxury Order
              </span>
            </h1>
            
            <p className="mx-auto mb-8 max-w-2xl text-center font-general-sans text-sm leading-relaxed text-white/70 sm:mb-12 sm:text-lg md:text-xl">
              Real-time updates from our warehouse to your doorstep.
              <span className="hidden sm:inline"> Premium delivery tracking with complete transparency.</span>
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2">
                <Shield className="h-3.5 w-3.5 text-white/80 sm:h-4 sm:w-4" />
                <span className="font-general-sans text-[10px] font-medium text-white/80 sm:text-xs">Insured</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2">
                <Truck className="h-3.5 w-3.5 text-white/80 sm:h-4 sm:w-4" />
                <span className="font-general-sans text-[10px] font-medium text-white/80 sm:text-xs">Express</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2">
                <Globe className="h-3.5 w-3.5 text-white/80 sm:h-4 sm:w-4" />
                <span className="font-general-sans text-[10px] font-medium text-white/80 sm:text-xs">Worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Unique Background */}
      <section className="relative py-12 sm:py-16 md:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem]" />
        
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <TrackingSearch />
        </div>
      </section>

      {/* Help Section - Redesigned */}
      <section className="relative overflow-hidden border-t border-black/10 py-12 sm:py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-white to-white" />
        
        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-1.5 shadow-lg sm:mb-6 sm:gap-2 sm:px-5 sm:py-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-black sm:h-2 sm:w-2" />
              <span className="font-general-sans text-[10px] font-bold uppercase tracking-wider text-black/70 sm:text-xs">
                24/7 Support
              </span>
            </div>
            
            <h2 className="mb-3 font-satoshi text-3xl font-bold sm:mb-4 sm:text-5xl">Need Assistance?</h2>
            <p className="mb-6 font-general-sans text-sm text-black/60 sm:mb-10 sm:text-lg">
              Our concierge team is ready to help with tracking inquiries
            </p>
            
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              <a href="/contact" className="group">
                <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-2xl sm:p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-black p-2.5 sm:mb-4 sm:rounded-xl sm:p-3">
                    <Package className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mb-1.5 font-satoshi text-base font-bold sm:mb-2 sm:text-lg">Visit Support</h3>
                  <p className="font-general-sans text-xs text-black/60 sm:text-sm">
                    Full contact info
                  </p>
                </div>
              </a>

              <a href="mailto:info@lux-store.eu" className="group">
                <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-2xl sm:p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-black p-2.5 sm:mb-4 sm:rounded-xl sm:p-3">
                    <svg className="h-5 w-5 text-white sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="mb-1.5 font-satoshi text-base font-bold sm:mb-2 sm:text-lg">Email Us</h3>
                  <p className="font-general-sans text-xs text-black/60 sm:text-sm">
                    info@lux-store.eu
                  </p>
                </div>
              </a>

              <a href="tel:+445557771234" className="group sm:col-span-2 lg:col-span-1">
                <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-2xl sm:p-6">
                  <div className="mb-3 inline-flex rounded-lg bg-black p-2.5 sm:mb-4 sm:rounded-xl sm:p-3">
                    <svg className="h-5 w-5 text-white sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="mb-1.5 font-satoshi text-base font-bold sm:mb-2 sm:text-lg">Call Direct</h3>
                  <p className="font-general-sans text-xs text-black/60 sm:text-sm">
                    +44-555-777-1234
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
