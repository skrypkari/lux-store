"use client";

import Link from "next/link";
import { ArrowLeft, Cookie, Shield, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CookiesPage() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [personalizationEnabled, setPersonalizationEnabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSavePreferences = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        essential: true,
        analytics: analyticsEnabled,
        personalization: personalizationEnabled,
      })
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAcceptAll = () => {
    setAnalyticsEnabled(true);
    setPersonalizationEnabled(true);
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        essential: true,
        analytics: true,
        personalization: true,
      })
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEssentialOnly = () => {
    setAnalyticsEnabled(false);
    setPersonalizationEnabled(false);
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        essential: true,
        analytics: false,
        personalization: false,
      })
    );
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA]">
      <div className="border-b border-black/10 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="group gap-2 font-satoshi font-semibold"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed left-1/2 top-24 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-top-5">
          <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-4 shadow-lg">
            <p className="font-satoshi font-semibold text-green-900">
              ✓ Cookie preferences saved successfully
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-black p-4">
              <Cookie className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Cookie Policy
          </h1>
          <p className="font-general-sans text-lg text-black/60">
            Manage your cookie preferences and learn how we use cookies
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8">
          <h2 className="mb-4 font-satoshi text-2xl font-bold">
            Privacy Notice
          </h2>
          <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
            <p>
              We use cookies and similar technologies to remember your
              preferences and keep you logged in ("essential" cookies); to
              measure effectiveness of our campaigns and analyze depersonalized
              data to improve performance of our site ("non-essential" cookies).
            </p>
            <p>
              By choosing "Accept All Cookies", you consent to the use of all
              the cookies. To set up your cookie preferences, use the controls
              below. You can change your cookie preferences anytime in My
              Account → Cookie consent or at the bottom of the site.
            </p>
            <p>
              Learn more in our{" "}
              <Link
                href="/privacy"
                className="font-semibold underline underline-offset-2 hover:text-black"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
          <h2 className="mb-6 font-satoshi text-3xl font-bold tracking-tight">
            Cookie Settings
          </h2>

          <div className="rounded-xl border-2 border-black/20 bg-black/5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-full bg-black p-2">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-satoshi text-xl font-bold">
                    Essential (always allowed)
                  </h3>
                </div>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  Mandatory website cookies, such as security cookies. Consent
                  for essential cookies cannot be revoked.
                </p>
                <div className="mt-3 rounded-lg border border-black/10 bg-white p-3">
                  <p className="font-general-sans text-xs text-black/60">
                    <strong>Examples:</strong> Authentication, security tokens,
                    session management, site functionality
                  </p>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center">
                <div className="rounded-full bg-black px-4 py-2 font-satoshi text-sm font-bold text-white">
                  Always On
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-black/10 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-full bg-black/10 p-2">
                    <BarChart3 className="h-5 w-5 text-black" />
                  </div>
                  <Label
                    htmlFor="analytics"
                    className="font-satoshi text-xl font-bold"
                  >
                    Analytics
                  </Label>
                </div>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  Consent for cookies used for analytics, such as Google
                  Analytics and internal store statistics.
                </p>
                <div className="mt-3 rounded-lg border border-black/10 bg-black/5 p-3">
                  <p className="font-general-sans text-xs text-black/60">
                    <strong>Examples:</strong> Google Analytics, page views,
                    user behavior analysis, performance metrics
                  </p>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center">
                <Switch
                  id="analytics"
                  checked={analyticsEnabled}
                  onCheckedChange={setAnalyticsEnabled}
                  className="data-[state=checked]:bg-black"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-black/10 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-full bg-black/10 p-2">
                    <Settings className="h-5 w-5 text-black" />
                  </div>
                  <Label
                    htmlFor="personalization"
                    className="font-satoshi text-xl font-bold"
                  >
                    Personalization
                  </Label>
                </div>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  Consent for cookies that remember settings to improve visitor
                  experience. For example, an indication that you dismissed a
                  popup.
                </p>
                <div className="mt-3 rounded-lg border border-black/10 bg-black/5 p-3">
                  <p className="font-general-sans text-xs text-black/60">
                    <strong>Examples:</strong> Language preferences, currency
                    selection, dismissed notifications, saved filters
                  </p>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center">
                <Switch
                  id="personalization"
                  checked={personalizationEnabled}
                  onCheckedChange={setPersonalizationEnabled}
                  className="data-[state=checked]:bg-black"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-black/10 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                onClick={handleAcceptAll}
                className="gap-2 px-8 py-6 font-satoshi text-base shadow-lg transition-all duration-300 hover:scale-105"
              >
                Accept All Cookies
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleSavePreferences}
                className="gap-2 border-2 px-8 py-6 font-satoshi text-base transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black/5"
              >
                Save Selected
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleEssentialOnly}
                className="gap-2 border-2 px-8 py-6 font-satoshi text-base transition-all duration-300 hover:scale-105 hover:border-black hover:bg-black/5"
              >
                Allow Only Essential
              </Button>
            </div>
            <p className="text-center font-general-sans text-xs text-black/50">
              Your preferences will be saved and applied across the site
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8 rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              What are cookies?
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work, or work more efficiently, as well as to
              provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              Why do we use cookies?
            </h2>
            <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
              <p>We use cookies for several reasons:</p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>
                  <strong>Essential functionality:</strong> To enable core
                  website features and keep you logged in
                </li>
                <li>
                  <strong>Performance & Analytics:</strong> To understand how
                  visitors use our site and improve user experience
                </li>
                <li>
                  <strong>Personalization:</strong> To remember your preferences
                  and provide a tailored experience
                </li>
                <li>
                  <strong>Security:</strong> To protect your account and prevent
                  fraudulent activity
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              How long do cookies last?
            </h2>
            <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
              <p>
                Cookies can be either "session" cookies or "persistent" cookies:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>
                  <strong>Session cookies:</strong> These are temporary and
                  expire when you close your browser
                </li>
                <li>
                  <strong>Persistent cookies:</strong> These remain on your
                  device for a set period or until you delete them
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              Managing cookies
            </h2>
            <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
              <p>
                You can control and manage cookies in various ways. Please note
                that removing or blocking cookies can impact your user
                experience and parts of our website may no longer be fully
                accessible.
              </p>
              <p>
                Most browsers automatically accept cookies, but you can modify
                your browser settings to decline cookies if you prefer.
                Instructions for managing cookies in popular browsers:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and security →
                  Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Settings → Privacy & Security →
                  Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Manage
                  Website Data
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Cookies and site permissions
                  → Manage and delete cookies
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              Third-party cookies
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              In addition to our own cookies, we may also use various
              third-party cookies to report usage statistics of the website,
              deliver advertisements, and improve user experience. These third
              parties may include analytics providers (such as Google Analytics)
              and advertising partners.
            </p>
          </section>

          <section className="rounded-xl border border-black/10 bg-black/5 p-6">
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              Questions about cookies?
            </h2>
            <p className="mb-4 font-general-sans leading-relaxed text-black/80">
              If you have any questions about our use of cookies or other
              technologies, please contact us:
            </p>
            <div className="space-y-1 font-general-sans text-sm font-semibold text-black">
              <p>LUX TRADE L.P.</p>
              <p>272 Bath Street, Glasgow, Scotland, G2 4JR</p>
              <p>
                <a
                  href="mailto:info@lux-store.eu"
                  className="underline underline-offset-2 hover:text-black/70"
                >
                  info@lux-store.eu
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              Updates to this Cookie Policy
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              We may update this Cookie Policy from time to time to reflect
              changes in technology, legislation, our operations, or for other
              reasons. We encourage you to review this page periodically for the
              latest information on our cookie practices.
            </p>
          </section>
        </div>

        <div className="mt-8 rounded-xl border border-black/10 bg-gradient-to-r from-black/5 to-transparent p-8">
          <h3 className="mb-4 text-center font-satoshi text-xl font-bold">
            Related Policies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy">
              <Button
                variant="outline"
                className="border-2 font-satoshi font-semibold"
              >
                Privacy Policy
              </Button>
            </Link>
            <Link href="/terms">
              <Button
                variant="outline"
                className="border-2 font-satoshi font-semibold"
              >
                Terms of Use
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-2 font-satoshi font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button
              size="lg"
              className="gap-2 px-8 py-6 font-satoshi text-base shadow-lg transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
