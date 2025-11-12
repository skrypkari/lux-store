import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";
import { Building2, Globe, Shield, Award, MapPin, CheckCircle2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default async function AboutPage() {
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
                  Established Excellence
                </span>
              </div>
            </div>
            <h1 className="mb-6 font-satoshi text-6xl font-bold leading-tight tracking-tight text-white md:text-7xl">
              About Us
            </h1>
            <p className="font-general-sans text-xl leading-relaxed text-white/80">
              Where timeless elegance meets uncompromising authenticity
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6">
          {/* Introduction */}
          <div className="mx-auto mb-24 max-w-4xl">
            <div className="mb-12 flex justify-center">
              <div className="h-1 w-24 bg-black" />
            </div>
            <p className="mb-8 font-general-sans text-2xl leading-relaxed text-black">
              <span className="font-satoshi text-3xl font-bold">LUX STORE</span> is a trusted online 
              boutique for true connoisseurs of luxury. We specialize in offering authentic, certified 
              products from the world's most prestigious brands — including{" "}
              <span className="font-semibold">Cartier, Rolex, Dior, GUCCI, Chanel</span> and{" "}
              <span className="font-semibold">Hermès</span>.
            </p>
            <p className="font-general-sans text-xl leading-relaxed text-black/70">
              Each item in our catalog is a symbol of timeless elegance and craftsmanship, 
              handpicked for those who appreciate the finer things in life.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-24 grid gap-8 md:grid-cols-4">
            {[
              { number: "5000+", label: "Luxury Items" },
              { number: "6", label: "Premium Brands" },
              { number: "120+", label: "Countries Served" },
              { number: "100%", label: "Authentic Guarantee" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-black/5 to-transparent p-8 text-center shadow-lg transition-all duration-500 hover:border-black hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-500 group-hover:opacity-5" />
                <div className="relative">
                  <div className="mb-3 font-satoshi text-5xl font-bold tracking-tight">
                    {stat.number}
                  </div>
                  <div className="font-general-sans text-sm font-medium uppercase tracking-wider text-black/60">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Company Details */}
          <div className="mb-24 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl">
            <div className="grid md:grid-cols-2">
              {/* Left Side - Image */}
              <div className="relative h-[500px] bg-black/5">
                <Image
                  src="/office_img.jpeg"
                  alt="LUX STORE Office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Right Side - Content */}
              <div className="flex flex-col justify-center p-12 lg:p-16">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-black p-2.5">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="font-satoshi text-3xl font-bold">Our Legacy</h2>
                </div>
                <p className="mb-6 font-general-sans text-lg leading-relaxed text-black/80">
                  Owned and operated by <span className="font-bold">LUX TRADE L.P.</span>, a UK-registered 
                  company (Company Number: <span className="font-semibold">SL021977</span>), with our head 
                  office located at 6 Brindley Place, Birmingham, England, UK.
                </p>
                <p className="mb-8 font-general-sans text-lg leading-relaxed text-black/80">
                  <span className="font-satoshi font-bold">LUX STORE</span> represents more than just a 
                  shopping destination — it's a promise of legitimacy, transparency, and excellence.
                </p>
                <div className="flex items-start gap-3 rounded-xl border border-black/10 bg-black/5 p-4">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-black" />
                  <p className="font-general-sans text-sm text-black/70">
                    As an authorized dealer for the brands we carry, we ensure that every purchase is 
                    accompanied by official documentation and a guarantee of authenticity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Strategic Location */}
          <div className="mb-24">
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-black to-black/90 shadow-2xl">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Content */}
                <div className="flex flex-col justify-center p-12 lg:p-16">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-lg bg-white p-2.5">
                      <MapPin className="h-6 w-6 text-black" />
                    </div>
                    <h2 className="font-satoshi text-3xl font-bold text-white">
                      Strategic Excellence
                    </h2>
                  </div>
                  <p className="mb-6 font-general-sans text-lg leading-relaxed text-white/90">
                    Our fulfillment operations are based in <span className="font-bold">Langkawi, Malaysia</span>{" "}
                    — a renowned duty-free trade zone.
                  </p>
                  <p className="mb-8 font-general-sans text-lg leading-relaxed text-white/80">
                    This strategic logistics location allows us to offer luxury products at up to{" "}
                    <span className="font-bold text-white">20% below standard retail prices</span>, as 
                    purchases are exempt from international duties and VAT.
                  </p>
                  <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <p className="font-general-sans text-sm font-medium text-white/90">
                      Without compromising on quality or service, we provide access to iconic pieces 
                      at a more accessible cost.
                    </p>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="relative h-[500px]">
                  <Image
                    src="/langkawi.jpg"
                    alt="Langkawi Malaysia"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* Our Promise */}
          <div className="mb-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="rounded-full bg-black p-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="mb-6 font-satoshi text-4xl font-bold">Our Promise</h2>
              <p className="mb-8 font-general-sans text-xl leading-relaxed text-black/80">
                From exclusive timepieces and fine jewelry to signature fashion accessories,{" "}
                <span className="font-satoshi font-bold">LUX STORE</span> delivers a seamless luxury 
                shopping experience with worldwide express shipping, secure payment systems, and 
                dedicated customer support.
              </p>
              <p className="font-general-sans text-lg leading-relaxed text-black/70">
                Whether you are acquiring your first piece of Cartier or adding a new Rolex to your 
                collection, our team is committed to ensuring you receive not only a product — but 
                a refined and memorable journey.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-24 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Authenticity Guaranteed",
                description: "Every product comes with official documentation and certificates of authenticity from authorized dealers.",
              },
              {
                icon: Globe,
                title: "Worldwide Delivery",
                description: "DHL Express free shipping to over 120 countries with full insurance and premium packaging included.",
              },
              {
                icon: Award,
                title: "Authorized Dealer",
                description: "Official partnerships with luxury brands ensure genuine products and manufacturer warranties.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-8 shadow-lg transition-all duration-500 hover:border-black hover:shadow-2xl"
              >
                <div className="absolute right-4 top-4 h-32 w-32 rounded-full bg-black/5 blur-3xl transition-all duration-500 group-hover:bg-black/10" />
                <div className="relative">
                  <div className="mb-6 inline-flex rounded-xl bg-black p-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 font-satoshi text-2xl font-bold">{feature.title}</h3>
                  <p className="font-general-sans leading-relaxed text-black/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="overflow-hidden rounded-3xl border-2 border-black/10 bg-gradient-to-br from-black/5 via-white to-black/5 p-12 shadow-2xl lg:p-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 flex justify-center">
                <Separator className="h-1 w-32 bg-black" />
              </div>
              <p className="mb-6 font-satoshi text-3xl font-bold leading-tight tracking-tight">
                Discover the art of luxury made personal — with LUX STORE.
              </p>
              <p className="font-general-sans text-lg text-black/60">
                Experience unparalleled service, authenticity, and elegance in every interaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="border-t border-black/10 bg-black/5 py-16">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="mb-8 font-general-sans text-sm font-medium uppercase tracking-widest text-black/50">
              Authorized Dealer For
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {["Cartier", "Rolex", "Hermès", "Dior", "GUCCI", "Chanel"].map((brand) => (
                <div
                  key={brand}
                  className="font-satoshi text-2xl font-bold tracking-tight text-black/40 transition-all duration-300 hover:scale-110 hover:text-black"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
