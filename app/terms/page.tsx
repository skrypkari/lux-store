import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FEFEFE] to-[#FAFAFA]">
      {/* Header */}
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

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 text-center">
          <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Terms of Use
          </h1>
          <p className="font-general-sans text-lg text-black/60">
            Last updated: March 2025
          </p>
        </div>

        <div className="space-y-8 rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
          {/* Section 1 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              ABOUT LUX STORE AND THESE TERMS OF USE
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                <strong>LUX TRADE L.P.</strong> (Company number: SL021977) has
                its registered offices at 272 Bath Street, Glasgow, Scotland, G2
                4JR. The Platforms are owned and edited by LUX TRADE L.P. and
                are operated with the technical support of LUX TRADE L.P. (the
                "Provider").
              </p>
              <p>
                These terms of use ("Terms of Use") govern your use of LUX STORE
                websites and mobile applications (together the "Platforms"). In
                these Terms of Use, we use the term LUX STORE (and "we", "us"
                and "our") to refer to the head office of LUX TRADE L.P. at the
                registered address above and its affiliates.
              </p>
              <p>
                Please read these Terms of Use carefully before using the
                Platform. By using the Platform, you signify your assent and
                agreement to these Terms of Use. If you do not agree to these
                Terms of Use, then you are not authorised to continue use of the
                Platform.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h3 className="mb-3 font-satoshi text-xl font-bold">
              Updates to these Terms of Use
            </h3>
            <p className="font-general-sans leading-relaxed text-black/80">
              We may make changes from time to time to these Terms of Use so
              please check back regularly to keep informed of updates. The
              latest version of these Terms of Use will always be available on
              the Platform. Any new version of these Terms of Use shall take
              effect and will govern the use of the Platform and your
              relationship with us immediately upon the date of posting. By
              continuing to use the Platform, you agree to be bound by the terms
              of these updates and amendments.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              ABOUT OUR HOSTING SERVICES
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              Hosting services for our website is provided by the Provider in
              Germany. Mobile applications may be hosted by us or by other
              companies and you should refer to the relevant conditions of such
              other company.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              OUR PRIVACY POLICY
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              Our information collection practices on the Platforms, such as the
              types of information we collect regarding visitors to the
              Platforms and the ways in which we may use that information, are
              governed by the terms of our{" "}
              <Link
                href="/privacy"
                className="font-semibold underline underline-offset-2 hover:text-black"
              >
                Privacy Policy
              </Link>{" "}
              and Cookie Policy.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              LUX STORE – CONDITIONS OF SALE AND RETURN AND EXCHANGES POLICY
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              Customers purchasing products online must read the Conditions of
              Sale and Return and Exchanges Policy, which will govern the terms
              and conditions of any such purchases. The provisions entitled
              "Limitation of liability" below do not cover the sale of products
              online or over the phone and please refer to the Conditions of
              Sale for the relevant exclusions and limitations of liability.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              USE OF MATERIALS ON THE PLATFORMS
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                LUX STORE has created its various Platforms to provide
                information about its company and products for your personal
                use. Whilst considerable effort has been made to ensure that the
                visual representations of LUX STORE products displayed on the
                Platforms are representative of the colour, design and style
                etc. of the original products, slight variations, distortions
                and/or differences may be apparent when compared to the original
                product. This may, for example, be due to technical issues such
                as your browser or computer settings. Accordingly, LUX STORE and
                the Provider cannot be held liable for any apparent differences
                in the product images represented on the Platforms and the
                original products. We strongly advise you visit one of
                authorised retailers prior to making a purchase online.
              </p>
              <p>
                You may download one computer copy or print one copy of the
                material made available to you via the Platforms, or download
                the application on to your mobile device, for your own
                non-commercial, educational, private or domestic use only,
                provided that proprietary notices, in particular intellectual
                property notices such as copyright©, trademark™, are preserved
                intact and are not modified, deleted or changed. Unless
                otherwise stated, you should assume that everything that you see
                or read on the Platforms (such as creations, products, images,
                photographs, including any person represented in the
                photographs, illustrations, icons, texts, video clips, music,
                written and other materials) ("LUX STORE Material") are
                protected by legislation such as copyright, designs and
                trademark legislation and under international treaty provisions
                and national laws worldwide.
              </p>
              <p>
                You are not authorised to sell, reproduce, distribute,
                communicate, modify, display, publicly perform, report or
                otherwise prepare derivative or second hand works based on or
                use any LUX STORE Material in any way for any public or
                commercial purposes. Furthermore, LUX STORE Material may not be
                displayed or communicated on any other platform, in a networked
                computer environment or on any other digital platform for any
                purpose whatsoever. In the event of breach of any of these Terms
                of Use, your permission to use LUX STORE Material will
                automatically terminate and any copies made of LUX STORE
                Material must be immediately destroyed. Any unauthorised use of
                LUX STORE Material may infringe copyright laws, trademark laws,
                the laws of privacy and publicity, and communications
                regulations and statutes.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              YOUR SUBMISSIONS AND UNSOLICITED COMMUNICATIONS
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                This section concerns communications sent to LUX STORE. It does
                not concern the communication of personal information to LUX
                STORE in relation to customer enquiries, the use of services or
                the purchase of products by phone or through the Platform. The
                latter is governed by the rules stipulated in the Privacy
                Policy.
              </p>
              <p>
                Any unsolicited communication or material that you transmit to
                LUX STORE via the Platforms or through social media, by
                electronic mail or otherwise, including, but not limited to, any
                data, questions or answers, comments, suggestions, or the like
                will be treated as non-confidential and non-proprietary by LUX
                STORE.
              </p>
              <p>
                Furthermore, LUX STORE enjoys a worldwide reputation for both
                the design and manufacture of high quality luxury items.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              LIMITATION OF LIABILITY
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                This section applies to the Platforms and not to the products
                that may be sold online or by phone by one of our local or
                regional markets.
              </p>
              <p>
                LUX STORE tries to ensure that the information provided is
                accurate and complete. However, LUX STORE does not warrant or
                represent that LUX STORE's Material is accurate, error-free or
                reliable or that use of LUX STORE Material will not infringe
                rights of third parties.
              </p>
              <p>
                LUX STORE and the Provider do not warrant that the functional
                and/or technical aspects of the Platforms or the LUX STORE
                Material will be error free or that the Platforms, LUX STORE
                Material or the servers that make them available are free of
                viruses or other harmful components. If use of the Platforms or
                LUX STORE Material results in the need for servicing or
                replacing property, material, equipment, data or other element,
                LUX STORE and the Provider are not responsible for those costs.
                Without limiting the foregoing, everything on the Platforms is
                provided to you "AS IS" AND "AS AVAILABLE" AND, TO THE FULLEST
                EXTENT PERMITTED BY APPLICABLE LAW, WITHOUT WARRANTY OF ANY
                KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED
                TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, SATISFACTORY
                QUALITY, FITNESS FOR A PARTICULAR PURPOSE, REASONABLE CARE AND
                SKILL, OR NON-INFRINGEMENT. LUX STORE and its suppliers make no
                warranties about the LUX STORE Material, software, text,
                downloads, graphics, and links, or about results to be obtained
                from using the Platforms.
              </p>
              <p>
                To the fullest extent permitted by applicable law, LUX STORE and
                the Provider shall not be liable for any indirect, incidental,
                special or consequential damages of any kind arising out of or
                in connection with the use of information available from the
                Platforms or any liability relating to any loss of use,
                interruption of business, lost profits or lost data, regardless
                of the form of action, whether in contract, tort (including
                negligence) or otherwise, even if LUX STORE and/or the Provider
                has been advised of the possibility of such damages.
              </p>
              <p className="font-semibold">
                Please note that in some jurisdictions consumer protection laws
                may not allow certain exclusions or limitation of warranties or
                liabilities, and consequently some of the above exclusions and
                limitations may not apply.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              TRADEMARK NOTICE
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              In general, all trademarks, logos and service marks (collectively
              the "Trademarks") that appear on the Platforms are registered,
              unregistered or otherwise protected LUX STORE trademarks or are
              licensed for use by LUX STORE by third parties. Other trademarks
              are proprietary marks and are registered to their respective
              owners. Nothing contained on the Platforms should be construed as
              granting, by implication or otherwise, any licence or right to use
              any trademark without LUX STORE's prior written permission or that
              of such third party who owns the trademark. Misuse of any
              trademark displayed on the Platforms, or any other content on the
              Platforms, except as provided herein, is strictly prohibited.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              COPYRIGHT NOTICE
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              All content (including LUX STORE Materials) on the Platforms are
              either Copyright © LUX STORE or are licensed for use by LUX STORE.
              All rights are reserved. Please refer to the section above on Use
              of Materials on the Platforms.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              LINKS & LINKING
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                The Platforms may contain links to other platforms operated by
                third parties not affiliated to LUX STORE. The inclusion of any
                link to such third party sites does not imply endorsement by LUX
                STORE of those sites. LUX STORE has not reviewed all of the
                content contained in the linked sites and is not responsible for
                the content or accuracy of any off-site pages or any other sites
                linked to any of the Platforms. If you choose to click through
                any link to off-site pages or third party sites then this is at
                your own risk.
              </p>
              <p>
                LUX STORE does not authorise linking to any of its Platforms
                from a third party platform without its express prior written
                authorisation.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              TERMINATION AND SUSPENSION
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              You agree that LUX STORE may terminate or suspend your access to
              and use of the Platforms if LUX STORE reasonably believes that you
              have violated or acted inconsistently with the letter or spirit of
              these Terms of Use, or violated the rights of LUX STORE, its
              affiliated companies or any third party, with or without notice to
              you. You agree that LUX STORE may modify or discontinue providing
              any of the Platforms, with or without notice to you. You agree
              that LUX STORE and/or the Provider will not be liable to you or
              any third party as a result of such modification or
              discontinuation. The provisions entitled "Limitation of liability"
              and "General provisions" will survive termination of these Terms
              of Use.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              GENERAL PROVISIONS
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                Unless otherwise specified, the information and LUX STORE
                Materials presented on the Platforms are presented solely for
                the purpose of promoting LUX STORE's products and services and
                in certain cases to present products for sale via a variety of
                means. LUX STORE makes no representation that LUX STORE Material
                is appropriate or available for use in every country of the
                world. You are responsible for compliance with applicable local
                laws, keeping in mind that access to LUX STORE Material may not
                be legal by certain persons or in certain countries. Our
                products are available in many parts of the world. However, the
                Platforms may identify products that are not available
                worldwide.
              </p>
              <p>
                If any provision, or part of a provision, of these Terms of Use
                is found to be illegal, invalid or unenforceable, that provision
                or part-provision shall be deemed not to form part of these
                Terms of Use, and the legality, validity or enforceability of
                the remainder of the provisions of these Terms of Use shall not
                be affected, unless otherwise required by operation of
                applicable law.
              </p>
              <p>
                These Terms of Use constitute the entire agreement between you
                and us in relation to the use of the Platform, and replace and
                extinguish all prior agreements, draft agreements, arrangements,
                undertakings, or collateral contracts of any nature made by the
                parties, whether oral or written, in relation to such subject
                matter.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              APPLICABLE LAW AND JURISDICTION
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              These Terms of Use shall be governed by and construed in
              accordance with the laws of United Kingdom, without reference to
              conflict of laws provisions. Any dispute, controversy or claim
              arising out of or in relation to the Terms of Use, including the
              validity, invalidity, breach or termination thereof, shall be
              adjudicated or arbitrated in accordance with said Terms of Use.
              Where the laws of United Kingdom, are different to the mandatory
              consumer laws in your own country, we will afford you with similar
              protection.
            </p>
          </section>

          {/* Section 15 - Contact */}
          <section className="rounded-xl border border-black/10 bg-black/5 p-6">
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              CONTACT US
            </h2>
            <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
              <p>
                If you have any questions or comments about these Terms of Use,
                or matters generally, please contact us at the address provided
                below. You can also use this address if you wish to request a
                copy of the personal data we hold about you.
              </p>
              <div className="mt-4 space-y-1 font-semibold text-black">
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
            </div>
          </section>
          {/* Related Links */}
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
              <Link href="/cookies">
                <Button
                  variant="outline"
                  className="border-2 font-satoshi font-semibold"
                >
                  Cookies
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
        </div>

        {/* Back Button */}
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
