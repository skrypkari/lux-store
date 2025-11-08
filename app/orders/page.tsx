import Link from "next/link";
import { ArrowLeft, CreditCard, Package, Truck, Globe, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA]">
      {/* Header */}
      <div className="border-b border-black/10 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" className="group gap-2 font-satoshi font-semibold">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 text-center">
          <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Orders & Payment
          </h1>
          <p className="font-general-sans text-lg text-black/60">
            Everything you need to know about ordering and delivery
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Secure Payment</h3>
            <p className="font-general-sans text-sm text-black/60">
              Multiple payment options available
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Truck className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Free Shipping</h3>
            <p className="font-general-sans text-sm text-black/60">
              Complimentary delivery worldwide
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Authenticity</h3>
            <p className="font-general-sans text-sm text-black/60">
              Certificate included with every order
            </p>
          </div>
        </div>

        <div className="space-y-8 rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
          {/* Orders & Payment Section */}
          <section>
            <h2 className="mb-6 font-satoshi text-3xl font-bold tracking-tight">
              ORDERS & PAYMENT
            </h2>

            <div className="space-y-6">
              {/* Payment Methods */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  What payment methods can I use?
                </h3>
                <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
                  <p>
                    <strong>Online:</strong> you can pay with the following credit cards (American Express, Visa, Mastercard).
                  </p>
                  <p>
                    You can also choose to pay by <strong>Bank transfer</strong>, <strong>PayPal</strong> or <strong>Cryptocurrency</strong>.
                  </p>
                  <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                    <p className="text-sm">
                      <strong>Please note:</strong> The Paypal payment method is only available for orders below €25,000. In case of low product availability it will not be possible to pay with Paypal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  How may I check the status of my order?
                </h3>
                <ul className="list-inside list-disc space-y-2 font-general-sans leading-relaxed text-black/80">
                  <li>
                    You can directly{" "}
                    <Link href="/track" className="font-semibold underline underline-offset-2 hover:text-black">
                      track your order
                    </Link>
                  </li>
                  <li>
                    You can{" "}
                    <Link href="/contact" className="font-semibold underline underline-offset-2 hover:text-black">
                      Contact Us
                    </Link>{" "}
                    to find out the status of your order
                  </li>
                  <li>LUX STORE will inform you of the progress of your order by email</li>
                  <li>After confirmation, your local carrier (DHL or UPS) will provide an estimated delivery date</li>
                  <li>You will receive a tracking number to follow the shipment on the carrier's website</li>
                </ul>
              </div>

              {/* Phone Orders */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  Can I order by phone?
                </h3>
                <p className="font-general-sans leading-relaxed text-black/80">
                  No, ordering is only available online.
                </p>
              </div>

              {/* Available Products */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  What creations are available for order on LUX-STORE.EU?
                </h3>
                <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
                  <p>
                    All creations that feature an <strong>"Add to Shopping Bag"</strong> button on the product page are available for purchase online.
                  </p>
                  <p>
                    If you are interested in a creation whose product page does not show the "Add to Shopping Bag" button please{" "}
                    <Link href="/contact" className="font-semibold underline underline-offset-2 hover:text-black">
                      Contact Us
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Order Limits */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  How many items may I purchase in one order?
                </h3>
                <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
                  <p>
                    Each order can include a <strong>maximum of 5 creations</strong>.
                  </p>
                  <p>
                    If you wish to purchase more than 5 creations in one order, please{" "}
                    <Link href="/contact" className="font-semibold underline underline-offset-2 hover:text-black">
                      Contact Us
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Certificate of Authenticity */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  Do creations come with a certificate of authenticity?
                </h3>
                <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
                  <p>
                    When you purchase a creation on LUX STORE, it will be accompanied by a <strong>certificate of authenticity</strong>.
                  </p>
                  <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                    <p className="text-sm">
                      <strong>Important:</strong> In case you wish to return or exchange a creation, it will be mandatory to include this certificate into the return parcel.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />

          {/* Shipping & Delivery Section */}
          <section>
            <h2 className="mb-6 font-satoshi text-3xl font-bold tracking-tight">
              SHIPPING & DELIVERY
            </h2>

            <div className="space-y-6">
              {/* Delivery Times */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  What are delivery times?
                </h3>
                <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
                  <p>
                    Delivery lead times and fees depend on your delivery address.
                  </p>
                  <p>
                    You can check the estimated delivery time in the checkout page while processing your order online.
                  </p>
                  <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                    <p className="text-sm">
                      <strong>Please note:</strong> This is an estimate and not a guarantee.
                    </p>
                  </div>
                </div>
              </div>

              {/* Delivery Locations */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  Where does LUX STORE deliver to?
                </h3>
                <p className="mb-4 font-general-sans text-lg font-semibold leading-relaxed text-black">
                  LUX STORE offers secure complimentary shipping worldwide
                </p>
              </div>

              {/* Packaging */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  What kind of packaging will I receive my order in?
                </h3>
                <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
                  <p>
                    Orders placed on the LUX STORE website are beautifully wrapped in the signature Brand gift wrapping and delivered in the Brand box.
                  </p>
                  <p>
                    A Brand shopping bag is also enclosed within the package.
                  </p>
                  <p>
                    All orders placed on the website are also placed in especially designed discreet protected packaging for delivery.
                  </p>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  What delivery address may I use?
                </h3>
                <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
                  <p>
                    You may use any residential or workplace address where the carrier can hand over the parcel personally.
                  </p>
                  <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                    <p className="text-sm">
                      <strong>This does not include:</strong> Military addresses, certain restricted areas, pick-up points, or PO boxes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Multiple Addresses */}
              <div>
                <h3 className="mb-3 font-satoshi text-xl font-bold">
                  Can I ship my order to multiple addresses if I purchase several products?
                </h3>
                <p className="font-general-sans leading-relaxed text-black/80">
                  We are unable to ship a single order to multiple addresses. If you are ordering more than one item, we suggest you place a separate order for each purchase.
                </p>
              </div>
            </div>
          </section>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />

          {/* Regions and Countries */}
          <section>
            <h2 className="mb-6 font-satoshi text-3xl font-bold tracking-tight">
              REGIONS AND COUNTRIES
            </h2>

            <div className="space-y-6">
              {/* Europe */}
              <div className="rounded-xl border border-black/10 bg-black/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-black p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-satoshi text-2xl font-bold">Europe</h3>
                </div>
                <div className="space-y-4 font-general-sans text-sm leading-relaxed text-black/80">
                  <div>
                    <p className="mb-2 font-semibold text-black">Western Europe:</p>
                    <p>Austria, Belgium, France, Germany, Liechtenstein, Luxembourg, Monaco, Netherlands, Switzerland</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-black">Northern Europe:</p>
                    <p>Denmark, Estonia, Finland, Iceland, Ireland, Latvia, Lithuania, Norway, Sweden, United Kingdom</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-black">Southern Europe:</p>
                    <p>Albania, Andorra, Bosnia and Herzegovina, Croatia, Greece, Italy, Malta, Montenegro, North Macedonia, Portugal, San Marino, Serbia, Slovenia, Spain, Vatican City</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-black">Eastern Europe:</p>
                    <p>Armenia, Azerbaijan, Belarus, Bulgaria, Czech Republic, Georgia, Hungary, Moldova, Poland, Romania, Slovakia, Ukraine</p>
                  </div>
                </div>
              </div>

              {/* North America */}
              <div className="rounded-xl border border-black/10 bg-black/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-black p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-satoshi text-2xl font-bold">North America</h3>
                </div>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  Canada, Mexico, United States of America (USA)
                </p>
              </div>

              {/* South America */}
              <div className="rounded-xl border border-black/10 bg-black/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-black p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-satoshi text-2xl font-bold">South America</h3>
                </div>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  Argentina, Bolivia, Brazil, Chile, Colombia, Ecuador, Paraguay, Peru, Venezuela
                </p>
              </div>

              {/* Asia */}
              <div className="rounded-xl border border-black/10 bg-black/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-black p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-satoshi text-2xl font-bold">Asia</h3>
                </div>
                <div className="space-y-4 font-general-sans text-sm leading-relaxed text-black/80">
                  <div>
                    <p className="mb-2 font-semibold text-black">Central Asia:</p>
                    <p>Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, Uzbekistan</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-black">East Asia:</p>
                    <p>China, Hong Kong, Japan, Mongolia, Taiwan</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-black">South Asia:</p>
                    <p>Bangladesh, India, Maldives, Nepal, Sri Lanka</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-black">Southeast Asia:</p>
                    <p>Cambodia, Indonesia, Laos, Malaysia, Philippines, Singapore, Thailand, Vietnam</p>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-black">Western Asia (Middle East):</p>
                    <p>Cyprus, Israel, Jordan, Kuwait, Lebanon, Oman, Qatar, Saudi Arabia, Turkey, United Arab Emirates</p>
                  </div>
                </div>
              </div>

              {/* Oceania */}
              <div className="rounded-xl border border-black/10 bg-black/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-black p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-satoshi text-2xl font-bold">Oceania</h3>
                </div>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  Australia, New Zealand
                </p>
              </div>

              {/* Other Territories */}
              <div className="rounded-xl border border-black/10 bg-black/5 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-black p-2">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-satoshi text-2xl font-bold">Other Territories</h3>
                </div>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  Greenland, U.S. Virgin Islands, British Virgin Islands, French Polynesia, Isle of Man, Gibraltar
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <div className="mt-8 rounded-xl border border-black/10 bg-gradient-to-r from-black/5 to-transparent p-8 text-center">
            <h3 className="mb-3 font-satoshi text-2xl font-bold">Still have questions?</h3>
            <p className="mb-6 font-general-sans text-black/60">
              Our team is here to help you with any inquiries about orders and delivery
            </p>
            <Link href="/contact">
              <Button size="lg" className="gap-2 px-8 py-6 font-satoshi text-base shadow-lg transition-all duration-300 hover:scale-105">
                Contact Us
                <ArrowLeft className="h-5 w-5 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link href="/">
            <Button size="lg" className="gap-2 px-8 py-6 font-satoshi text-base shadow-lg transition-all duration-300 hover:scale-105">
              <ArrowLeft className="h-5 w-5" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
