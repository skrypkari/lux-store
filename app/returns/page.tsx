import Link from "next/link";
import { ArrowLeft, RotateCcw, Package, Shield, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReturnsPage() {
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
            Returns & Exchanges
          </h1>
          <p className="font-general-sans text-lg text-black/60">
            Your guide to returns, exchanges, and cancellations
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <RotateCcw className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">30 Days Return</h3>
            <p className="font-general-sans text-sm text-black/60">
              Cancel within 30 days of delivery
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Free Returns</h3>
            <p className="font-general-sans text-sm text-black/60">
              Complimentary return shipping
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Full Refund</h3>
            <p className="font-general-sans text-sm text-black/60">
              Money back within 30 days
            </p>
          </div>
        </div>

        <div className="space-y-8 rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
          {/* Introduction */}
          <section>
            <p className="font-general-sans text-lg leading-relaxed text-black/80">
              This Returns and Exchanges Policy details your options on how you can cancel a contract with us, how you can return your purchase, and your rights in relation to obtaining a refund or exchange.
            </p>
          </section>

          {/* Right to Cancel */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              RIGHT TO CANCEL
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                You have the right to cancel the contract created by our written order confirmation without giving any reason <strong>30 days</strong> from the day on which you acquire, or someone you nominate (other than the carrier) acquires, physical possession of the products in your order.
              </p>
              <p>
                If you are a customer based in the European Union, the United Kingdom or the European Economic Area and have made a purchase via the Sales Channels, this is considered to be your statutory right to withdraw from the contract. To meet the withdrawal deadline, it is sufficient for you to withdraw before the withdrawal period has expired.
              </p>
              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <p className="text-sm">
                  <strong>To cancel the contract and return your product(s):</strong>
                  <br />
                  You can send us in writing an unequivocal statement such as a letter or e-mail to:{" "}
                  <a href="mailto:info@lux-store.eu" className="font-semibold underline underline-offset-2 hover:text-black">
                    info@lux-store.eu
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              RETURN PROCESS
            </h2>
            <div className="space-y-4">
              <p className="font-general-sans leading-relaxed text-black/80">
                Products that have been purchased through the website may only be returned to our distribution center at the address of our Returns Department, as provided in the email confirming the order cancellation.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 rounded-lg border border-black/10 bg-black/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black font-satoshi text-sm font-bold text-white">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-satoshi font-bold">Choose Return Method</h3>
                    <p className="font-general-sans text-sm leading-relaxed text-black/80">
                      You may choose (a) to use our pick-up service and agree on a pick-up date with our logistics partner, or (b) a parcel drop-off at any of our logistics partner's network locations within the eligible return period.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg border border-black/10 bg-black/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black font-satoshi text-sm font-bold text-white">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-satoshi font-bold">Complete Return Form</h3>
                    <p className="font-general-sans text-sm leading-relaxed text-black/80">
                      The Client Relations Center will send you a return form by e-mail or ask you to complete the return form that was enclosed with your product delivery. Please fill out the required information and sign it.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg border border-black/10 bg-black/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black font-satoshi text-sm font-bold text-white">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-satoshi font-bold">Package Your Return</h3>
                    <p className="font-general-sans text-sm leading-relaxed text-black/80">
                      You must include in the delivery package: the completed return form, the product, all its accessories, any free items received, the Service Guide, warranty card and all other documents, in their original box.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg border border-black/10 bg-black/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black font-satoshi text-sm font-bold text-white">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-satoshi font-bold">Seal and Label</h3>
                    <p className="font-general-sans text-sm leading-relaxed text-black/80">
                      Seal the delivery package and affix the pre-paid airway bill received with your purchase.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-lg border border-black/10 bg-black/5 p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-black font-satoshi text-sm font-bold text-white">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-satoshi font-bold">Ship Your Return</h3>
                    <p className="font-general-sans text-sm leading-relaxed text-black/80">
                      For our pick-up service, our logistics partner will pick-up the sealed package on the agreed date. For our drop-off service, please drop-off the product at the agreed logistics partner's network location.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-black/20 bg-white p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-black" />
                  <div className="font-general-sans text-sm leading-relaxed text-black/80">
                    <p className="font-semibold text-black">Important:</p>
                    <p>
                      You must keep a proof of return shipment. We accept no liability if proof cannot be produced. Only merchandise received by our distribution center will be eligible for a refund or exchange.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Condition of Returned Products */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              CONDITION OF RETURNED PRODUCTS
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                We will verify that the returned product satisfies the conditions of the Returns and Exchanges Policy and, if so, then proceed with the applicable refund or exchange.
              </p>
              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi font-bold text-black">Required Condition:</h3>
                <p className="text-sm">
                  Our products must be returned in a <strong>new and unused state</strong>, in perfect condition, with all protective materials in place and tags and stickers attached to them (if applicable), as well as with the original LUX STORE box and delivery package, including all accessories and documents.
                </p>
              </div>
              <p>
                For example, timepiece bracelets that have been adjusted at your request must be returned with the exact same number of links as in the original delivery package.
              </p>
              <p>
                If you have received free items as part of your order, they must be returned with the products.
              </p>
              <p>
                All returns will be subject to strict Quality Control ("QC") by us to ensure that the returned products satisfy these requirements. If the products do not meet QC standards, we will refuse the return, and the products will be returned to you. If the returned product satisfies QC, we will proceed with the applicable refund or exchange.
              </p>
              <div className="rounded-lg border-2 border-black/20 bg-white p-4">
                <p className="font-semibold text-black">
                  We reserve our right not to accept any return if the product shows signs of wear, or has been used or altered from its original condition in any way or, as an alternative, may reduce the amount of any applicable refund or exchange accordingly.
                </p>
              </div>
            </div>
          </section>

          {/* Products You Cannot Return */}
          <section>
            <h2 className="mb-4 flex items-center gap-3 font-satoshi text-2xl font-bold tracking-tight">
              <XCircle className="h-7 w-7" />
              PRODUCTS YOU CANNOT RETURN OR EXCHANGE
            </h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex gap-3">
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                  <div className="font-general-sans text-sm leading-relaxed text-black/80">
                    <p className="font-semibold text-black">Personalized or Bespoke Products</p>
                    <p>
                      Orders for products that have been personalized in any way or otherwise made for you with bespoke specifications cannot be cancelled. This includes, without limitation, products that have been engraved or embossed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex gap-3">
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                  <div className="font-general-sans text-sm leading-relaxed text-black/80">
                    <p className="font-semibold text-black">Writing Instruments</p>
                    <p>
                      Writing instruments that have been filled with ink, as well as bottles and refills that have been opened, cannot be returned to us.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex gap-3">
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                  <div className="font-general-sans text-sm leading-relaxed text-black/80">
                    <p className="font-semibold text-black">Cosmetic Products</p>
                    <p>
                      Cosmetic products that have been opened or for which their original seal has been removed cannot be returned to us. Cosmetic products must be returned unused, unopened and with their original seal.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex gap-3">
                  <XCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
                  <div className="font-general-sans text-sm leading-relaxed text-black/80">
                    <p className="font-semibold text-black">Fragrance and Aerosols - Final Sale</p>
                    <p>
                      Please note, fragrance and aerosols are final sale and may not be returned.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Refunds */}
          <section>
            <h2 className="mb-4 flex items-center gap-3 font-satoshi text-2xl font-bold tracking-tight">
              <CheckCircle className="h-7 w-7" />
              REFUNDS
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                You may return a product purchased through the Sales Channels for refund, provided that the return complies with these Conditions of Sale, in particular with (a) Right to Cancel and (b) Return Process above.
              </p>
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                  <div className="font-general-sans text-sm leading-relaxed text-black/80">
                    <p className="font-semibold text-black">Refund Process:</p>
                    <p>
                      If the return complies with these Conditions of Sale, we will use commercially reasonable endeavours to refund the purchase price to the buyer using the same means of payment as used by the buyer for the initial transaction within <strong>thirty (30) days</strong> after receipt of the returned item by the LUX STORE distribution center.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm">
                Initial shipping charges (if any) will be refunded, except where you had originally opted for a non-standard delivery, in which cases the supplemental costs (if applicable) will be non-refundable.
              </p>
            </div>
          </section>

          {/* Exchanges */}
          <section>
            <h2 className="mb-4 flex items-center gap-3 font-satoshi text-2xl font-bold tracking-tight">
              <RotateCcw className="h-7 w-7" />
              EXCHANGES
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                You may return a product purchased through the Sales Channels for exchange with another LUX STORE product, provided that the return complies with these Conditions of Sale, in particular with (a) Right to Cancel and (b) Return Process above.
              </p>
              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <p className="text-sm">
                  <strong>Exchange Process:</strong>
                  <br />
                  In any event, the sale of the returned product will be cancelled and a new order for the product ordered must be placed.
                </p>
              </div>
              <p>
                Should a product be returned to the LUX STORE distribution center for exchange with a less expensive product, only the buyer of the returned product will be entitled to receive a refund of the price difference.
              </p>
            </div>
          </section>

          {/* Model Cancellation Form */}
          <section className="rounded-xl border-2 border-black/20 bg-gradient-to-br from-black/5 to-transparent p-6">
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              MODEL CANCELLATION FORM
            </h2>
            <div className="space-y-4 font-general-sans text-sm leading-relaxed text-black/70">
              <p>
                - I/We (*) hereby give notice that I/We (*) withdraw from my/our (*) contract of sale of the following goods (*)/for the provision of the following service (*),
              </p>
              <p>- Ordered on (*)/received on (*),</p>
              <p>- Name of consumer(s),</p>
              <p>- Address of consumer(s),</p>
              <p>- Signature of consumer(s) (only if this form is notified on paper),</p>
              <p>- Date</p>
              <p className="mt-4 italic">(*) Delete as appropriate</p>
            </div>
          </section>

          {/* Contact CTA */}
          <div className="mt-8 rounded-xl border border-black/10 bg-gradient-to-r from-black/5 to-transparent p-8 text-center">
            <h3 className="mb-3 font-satoshi text-2xl font-bold">Need help with a return?</h3>
            <p className="mb-6 font-general-sans text-black/60">
              Our Client Relations team is ready to assist you with your return or exchange
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2 px-8 py-6 font-satoshi text-base shadow-lg transition-all duration-300 hover:scale-105">
                  Contact Us
                  <ArrowLeft className="h-5 w-5 rotate-180" />
                </Button>
              </Link>
              <a href="mailto:info@lux-store.eu">
                <Button variant="outline" size="lg" className="gap-2 border-2 px-8 py-6 font-satoshi text-base transition-all duration-300 hover:scale-105">
                  Email: info@lux-store.eu
                </Button>
              </a>
            </div>
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
