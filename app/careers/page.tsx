import Link from "next/link";
import { ArrowLeft, Briefcase, Globe, Heart, Users, TrendingUp, Award, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  const benefits = [
    {
      icon: Heart,
      title: "Premium Benefits",
      description: "Comprehensive health insurance, wellness programs, and mental health support",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear career progression paths with regular training and development opportunities",
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Work with international teams and potential relocation to our offices worldwide",
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Performance-based bonuses, employee awards, and exclusive luxury perks",
    },
  ];

  const openPositions = [
    {
      title: "Senior Product Designer",
      department: "Design",
      location: "Birmingham, UK",
      type: "Full-time",
      description: "Lead the design of our luxury e-commerce experience and create innovative solutions for our global customer base.",
    },
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build and maintain our cutting-edge e-commerce platform using Next.js, React, and modern technologies.",
    },
    {
      title: "Client Relations Manager",
      department: "Customer Success",
      location: "Birmingham, UK",
      type: "Full-time",
      description: "Deliver exceptional service to our luxury clientele and build lasting relationships with VIP customers.",
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "London, UK",
      type: "Full-time",
      description: "Develop and execute marketing campaigns for our luxury brand across digital and traditional channels.",
    },
    {
      title: "Supply Chain Coordinator",
      department: "Operations",
      location: "Birmingham, UK",
      type: "Full-time",
      description: "Manage logistics and ensure seamless delivery of luxury products to customers worldwide.",
    },
    {
      title: "Brand Ambassador",
      department: "Sales",
      location: "Multiple Locations",
      type: "Part-time",
      description: "Represent LUX STORE at exclusive events and build brand awareness in the luxury market.",
    },
  ];

  const values = [
    {
      title: "Excellence",
      description: "We strive for perfection in everything we do, from product curation to customer service.",
    },
    {
      title: "Authenticity",
      description: "We believe in genuine luxury and maintain the highest standards of authenticity.",
    },
    {
      title: "Innovation",
      description: "We embrace new technologies and creative solutions to enhance the luxury experience.",
    },
    {
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical practices in all our interactions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA]">
      {/* Header */}
      <div className="border-b border-black/10 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="group gap-2 font-satoshi font-semibold">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* <div className="relative overflow-hidden border-b border-black/10 bg-gradient-to-br from-black via-black to-black/90 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <p className="font-general-sans text-sm font-semibold uppercase tracking-wider text-white/90">
                Join Our Team
              </p>
            </div>
          </div>
          <h1 className="mb-6 font-satoshi text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Shape the Future of
            <br />
            Luxury E-Commerce
          </h1>
          <p className="mx-auto mb-8 max-w-3xl font-general-sans text-xl leading-relaxed text-white/80">
            At LUX STORE, we're building the ultimate destination for luxury shopping. Join our passionate team and help redefine the luxury retail experience.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="#positions">
              <Button size="lg" className="gap-2 bg-white px-8 py-6 font-satoshi text-base text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/90">
                View Open Positions
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
            <a href="#culture">
              <Button size="lg" variant="outline" className="gap-2 border-2 border-white px-8 py-6 font-satoshi text-base text-white transition-all duration-300 hover:scale-105 hover:bg-white/10">
                Learn About Our Culture
              </Button>
            </a>
          </div>
        </div>
      </div> */}

      {/* <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-satoshi text-4xl font-bold tracking-tight sm:text-5xl">
              Why Join LUX STORE?
            </h2>
            <p className="mx-auto max-w-2xl font-general-sans text-lg text-black/60">
              We offer more than just a job — we provide a career in the world of luxury
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-black/10 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:border-black/20 hover:shadow-2xl"
              >
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-black p-4 transition-transform duration-300 group-hover:scale-110">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="mb-3 text-center font-satoshi text-xl font-bold">
                  {benefit.title}
                </h3>
                <p className="text-center font-general-sans text-sm leading-relaxed text-black/70">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="culture" className="mb-20">
          <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-lg sm:p-12">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-satoshi text-4xl font-bold tracking-tight">
                Our Core Values
              </h2>
              <p className="mx-auto max-w-2xl font-general-sans text-lg text-black/60">
                These principles guide everything we do at LUX STORE
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-black/10 bg-gradient-to-br from-black/5 to-transparent p-6"
                >
                  <h3 className="mb-3 font-satoshi text-2xl font-bold">
                    {value.title}
                  </h3>
                  <p className="font-general-sans leading-relaxed text-black/80">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="positions" className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-satoshi text-4xl font-bold tracking-tight sm:text-5xl">
              Open Positions
            </h2>
            <p className="mx-auto max-w-2xl font-general-sans text-lg text-black/60">
              Join our growing team and help shape the future of luxury retail
            </p>
          </div>

          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg transition-all duration-300 hover:border-black/20 hover:shadow-2xl"
              >
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-black/20 bg-black/5 px-3 py-1 font-general-sans text-xs font-semibold uppercase tracking-wide text-black/70">
                          {position.department}
                        </span>
                        <span className="rounded-full border border-black/20 bg-black/5 px-3 py-1 font-general-sans text-xs font-semibold uppercase tracking-wide text-black/70">
                          {position.type}
                        </span>
                      </div>
                      <h3 className="mb-2 font-satoshi text-2xl font-bold transition-all group-hover:underline">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 font-general-sans text-sm text-black/60">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{position.type}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="gap-2 font-satoshi shadow-lg transition-all duration-300 group-hover:scale-105"
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-general-sans leading-relaxed text-black/80">
                    {position.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-black/5 via-white to-black/5 shadow-lg">
            <div className="p-8 sm:p-12">
              <div className="mb-8 text-center">
                <h2 className="mb-4 font-satoshi text-4xl font-bold tracking-tight">
                  Life at LUX STORE
                </h2>
                <p className="mx-auto max-w-2xl font-general-sans text-lg text-black/60">
                  What you can expect when you join our team
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-black/10 bg-white p-6">
                  <div className="mb-4 rounded-full bg-black p-3 w-fit">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-satoshi text-xl font-bold">
                    Collaborative Culture
                  </h3>
                  <p className="font-general-sans text-sm leading-relaxed text-black/70">
                    Work alongside talented professionals who are passionate about luxury and innovation
                  </p>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-6">
                  <div className="mb-4 rounded-full bg-black p-3 w-fit">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-satoshi text-xl font-bold">
                    Continuous Learning
                  </h3>
                  <p className="font-general-sans text-sm leading-relaxed text-black/70">
                    Access to professional development programs, workshops, and industry conferences
                  </p>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-6">
                  <div className="mb-4 rounded-full bg-black p-3 w-fit">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-satoshi text-xl font-bold">
                    Global Impact
                  </h3>
                  <p className="font-general-sans text-sm leading-relaxed text-black/70">
                    Contribute to a platform that serves luxury customers around the world
                  </p>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-6">
                  <div className="mb-4 rounded-full bg-black p-3 w-fit">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-satoshi text-xl font-bold">
                    Work-Life Balance
                  </h3>
                  <p className="font-general-sans text-sm leading-relaxed text-black/70">
                    Flexible working arrangements and generous vacation policy to recharge
                  </p>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-6">
                  <div className="mb-4 rounded-full bg-black p-3 w-fit">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-satoshi text-xl font-bold">
                    Luxury Perks
                  </h3>
                  <p className="font-general-sans text-sm leading-relaxed text-black/70">
                    Employee discounts on luxury products and exclusive access to private sales
                  </p>
                </div>

                <div className="rounded-xl border border-black/10 bg-white p-6">
                  <div className="mb-4 rounded-full bg-black p-3 w-fit">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 font-satoshi text-xl font-bold">
                    Modern Workplace
                  </h3>
                  <p className="font-general-sans text-sm leading-relaxed text-black/70">
                    State-of-the-art offices with premium amenities and the latest technology
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-black shadow-2xl">
            <div className="relative p-12 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              <div className="relative">
                <h2 className="mb-4 font-satoshi text-4xl font-bold text-white">
                  Don't See the Right Role?
                </h2>
                <p className="mx-auto mb-8 max-w-2xl font-general-sans text-lg leading-relaxed text-white/80">
                  We're always looking for talented individuals to join our team. Send us your resume and tell us how you can contribute to LUX STORE.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/contact">
                    <Button size="lg" className="gap-2 bg-white px-8 py-6 font-satoshi text-base text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/90">
                      Get in Touch
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <a href="mailto:careers@lux-store.eu">
                    <Button size="lg" variant="outline" className="gap-2 border-2 border-white px-8 py-6 font-satoshi text-base text-white transition-all duration-300 hover:scale-105 hover:bg-white/10">
                      Email: careers@lux-store.eu
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button size="lg" className="gap-2 px-8 py-6 font-satoshi text-base shadow-lg transition-all duration-300 hover:scale-105">
              <ArrowLeft className="h-5 w-5" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div> */}
    </div>
  );
}
