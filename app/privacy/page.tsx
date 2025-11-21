import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
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

      
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 text-center">
          <h1 className="mb-3 font-satoshi text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="font-general-sans text-lg text-black/60">
            Last updated: March 2025
          </p>
        </div>

        
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">
              Transparency & Trust
            </h3>
            <p className="font-general-sans text-sm text-black/60">
              Privacy built into all products by design
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Protection</h3>
            <p className="font-general-sans text-sm text-black/60">
              Leading security standards implemented
            </p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="mb-2 font-satoshi text-lg font-bold">Your Rights</h3>
            <p className="font-general-sans text-sm text-black/60">
              Full control over your personal data
            </p>
          </div>
        </div>

        <div className="space-y-8 rounded-2xl border border-black/10 bg-white p-6 shadow-lg sm:p-8 lg:p-12">
          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              ABOUT LUX STORE
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              <strong>LUX TRADE L.P.</strong> ("LUX STORE", "we", "us" and
              "our") has its registered offices at 272 Bath Street, Glasgow,
              Scotland, G2 4JR. This is considered to be the "data controller"
              for the purposes of certain data protection laws and regulations.
            </p>
          </section>

          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              OUR DATA PROMISE
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              At LUX STORE, we treasure our relationship with you. In order to
              deliver the most relevant services and design the right experience
              for you, we handle your personal information with the highest care
              and rigour.
            </p>
          </section>

          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              OUR PRIVACY COMMITMENTS
            </h2>
            <p className="mb-4 font-general-sans leading-relaxed text-black/80">
              Our Privacy Policy is centred around the following three privacy
              commitments:
            </p>
            <div className="space-y-4">
              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi text-lg font-bold">
                  Commitment 1: Transparency & Trust
                </h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  Privacy is built into all of our products and services by
                  design and by default. We respect the trust you place in us
                  with your personal information. We will be fully transparent
                  with you regarding the purposes for which we use your personal
                  information and will only use it for those specified purposes
                  when we have a right to do so. This will include, where
                  necessary, obtaining your explicit consent. Any material
                  changes to how we process your personal information will be
                  notified to you.
                </p>
              </div>
              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi text-lg font-bold">
                  Commitment 2: Protecting Your Personal Information
                </h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We commit to implementing leading data protection, privacy and
                  security standards so that you feel comfortable that your
                  personal information is protected – if there is an incident
                  impacting your personal information, we commit to notifying
                  you and/or relevant regulators in accordance with data breach
                  notification requirements. Your personal information will be
                  handled with the same protection when it is shared with third
                  parties or when it is transferred internationally. We will
                  only retain your personal information for as long as is
                  necessary or for as long as required by law.
                </p>
              </div>
              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi text-lg font-bold">
                  Commitment 3: Respecting Your Rights
                </h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We will respect the choices you make in relation to your
                  personal information. We will respect the legal rights you
                  have in relation to accessing, erasing and updating the
                  personal information that we hold about you. We will also
                  respect the choices you make in relation to objecting to how
                  we process your personal information and will provide channels
                  for you to contact us with questions or complaints.
                </p>
              </div>
            </div>
          </section>

          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              THIS PRIVACY POLICY & UPDATES
            </h2>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                Please take a moment to read the following policy as well as our
                Cookie Policy that explains how we collect, use, disclose and
                transfer the personal information collected about you at any
                touchpoint, including on our websites, mobile applications and
                other digital platforms (together referred to as the
                "Platforms"), when you visit our boutiques or events, contact us
                by e-mail, telephone or online chat, or when you interact with
                us over social media platforms or other marketing and
                advertising channels. Our Cookie Policy explains how we collect
                information through the use of cookies and related technologies
                when you use our Platforms.
              </p>
              <p>
                LUX TRADE L.P. company has been appointed a data processor in
                connection with some of the services offered on the Platforms,
                including the processing of orders you place on the Platforms.
              </p>
              <p>
                Where we offer our products for sale online or by phone through
                our Client Relations Center, you must read the applicable
                Conditions of Sale, which will govern the terms and conditions
                of any such purchases made in this way. Other terms and
                conditions, such as Conditions of Service, may also apply in
                respect of any other services that we may provide to you.
              </p>
              <p>
                From time to time we may update this Privacy Policy. When we do,
                we will publish the changes on this Platform.
              </p>
            </div>
          </section>

          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              GENERAL DATA PROTECTION REGULATION REPRESENTATIVE
            </h2>
            <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
              <p>
                For the purpose of the General Data Protection Regulation in the
                United Kingdom, we have appointed the following entity as our
                legal representative:
              </p>
              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <p className="font-semibold text-black">
                  Data Protection & Privacy Team
                </p>
                <p className="font-semibold text-black">LUX TRADE L.P.</p>
                <p>272 Bath Street, Glasgow, Scotland, G2 4JR</p>
              </div>
              <p>For general questions, please see "Contact us" below.</p>
            </div>
          </section>

          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              COMMITMENT 1: TRANSPARENCY & TRUST
            </h2>

            <h3 className="mb-3 font-satoshi text-xl font-bold">
              Information that you provide to us or we collect about you
            </h3>
            <p className="mb-4 font-general-sans leading-relaxed text-black/80">
              We collect the following personal information about you as
              detailed below:
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  General personal & user account information
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  To benefit from our products, services, events, boutique
                  appointments and/or other client programmes, you may need to
                  provide your contact details or create an account with us. You
                  may provide personal information about yourself, including
                  name and address, date of birth, e-mail address, telephone
                  number, marital status, nationality and gender.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Client 360 view data
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  In order to have a full understanding of our clients, we may
                  also collect and store data about your behaviour, interests,
                  preferences, wish lists, hobbies, client interactions and
                  marketing campaign activities, opinions, customer reviews,
                  demographic data, habits, and purchasing tendencies.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Transactional and payment information
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  When you purchase products and/or services, we collect
                  additional information, such as your shipping address, proof
                  of delivery, billing address and relevant payment information.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Identification information
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We may collect identification information from you, such as
                  passport data or national ID data, in circumstances where we
                  need this to provide products and/or services to you.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Correspondence, call recordings, online or video chat
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We collect personal information from you when you correspond
                  with us. Please note that phone calls, online or video chat or
                  other correspondence will on occasion be recorded for
                  security, evidence, training, quality control, analysis and
                  development purposes.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Social media platforms data
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  If you choose to interact with us via a social media platform
                  or other third party service, we will collect the information
                  you have provided to us through that platform.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">Cookie data</h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We also collect certain information automatically about
                  visitors to our Platforms, described in our Cookie Policy.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">Location data</h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We will collect information about your location to the extent
                  that we provide any location services.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Surveys and market research
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We carry out surveys and market research and we will collect
                  your response data.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Information you provide about third parties
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  You may provide personal information about a third party (such
                  as your partner or child), including name and address, date of
                  birth, e-mail address, telephone number, marital status, wish
                  list, hobbies and preferences.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Information we collect from third parties about you
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We also may collect any of the above information about you
                  from third parties, including our authorised dealers, social
                  media platforms, advertising and marketing partners, analytics
                  providers, and third parties that provide technical or
                  strategic data services to us.
                </p>
              </div>

              <div>
                <h4 className="mb-2 font-satoshi font-bold">
                  Sensitive or special categories of data
                </h4>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  We may ask you to provide sensitive or special categories of
                  data (for example, allergens or accessibility requirements for
                  events), in which case we will provide you with enhanced
                  privacy information and ask for your explicit consent at the
                  time of our request.
                </p>
              </div>
            </div>
          </section>

          
          <section>
            <h3 className="mb-3 font-satoshi text-xl font-bold">
              Purposes of processing and our legal justification for processing
            </h3>
            <div className="space-y-4 font-general-sans leading-relaxed text-black/80">
              <p>
                We may process your personal information for the purposes listed
                below on the basis of the following justifications:
              </p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>
                  <strong>Consent:</strong> when you have given clear consent
                  for us to process your personal information
                </li>
                <li>
                  <strong>Performance of a contract:</strong> the processing is
                  necessary for a contract we are entering into with you
                </li>
                <li>
                  <strong>Legitimate interests:</strong> the processing is
                  necessary for our legitimate interests or the legitimate
                  interests of a third party
                </li>
                <li>
                  <strong>Legal obligation:</strong> the processing is necessary
                  for us to comply with the law
                </li>
              </ul>
              <p className="mt-4">The purposes of processing include:</p>
              <ul className="list-inside list-disc space-y-2 pl-4">
                <li>
                  Service-related processing (product sales, service
                  communications, notifications)
                </li>
                <li>
                  Marketing-related communications and digital advertising
                </li>
                <li>Accounts & records management</li>
                <li>Logistics, transactional and payment processing</li>
                <li>Customer enquiries and support</li>
                <li>Competitions, prize draws and promotions</li>
                <li>Regulatory compliance and fraud prevention</li>
                <li>Automated technologies & profiling</li>
                <li>Market research and feedback analysis</li>
                <li>Location services</li>
                <li>Platform support, maintenance and security</li>
              </ul>
            </div>
          </section>

          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              COMMITMENT 2: PROTECTING YOUR PERSONAL INFORMATION
            </h2>

            <h3 className="mb-3 font-satoshi text-xl font-bold">
              Protecting your personal information
            </h3>
            <p className="mb-4 font-general-sans leading-relaxed text-black/80">
              We want you to feel confident about sharing your personal
              information with us, and we are committed to protecting the
              personal information we collect by implementing leading data
              protection, privacy and security standards. We limit access to
              personal information about you to employees who reasonably need
              access to it, to provide products or services to you or in order
              to do their jobs.
            </p>

            <h3 className="mb-3 font-satoshi text-xl font-bold">
              Sharing your personal information
            </h3>
            <p className="mb-4 font-general-sans leading-relaxed text-black/80">
              We only share personal information with others when we are
              permitted by law to do so. We share your personal information with
              third parties in the following circumstances:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-4 font-general-sans text-sm leading-relaxed text-black/80">
              <li>Our affiliated group companies</li>
              <li>Service providers (including data processors)</li>
              <li>Regulatory, authority and other third party disclosures</li>
              <li>Mergers & acquisitions</li>
              <li>
                Social media platforms and other third party digital vendors
              </li>
            </ul>

            <h3 className="mb-3 mt-6 font-satoshi text-xl font-bold">
              Transferring your personal information globally
            </h3>
            <p className="font-general-sans leading-relaxed text-black/80">
              If the country we transfer your personal information to does not
              provide an adequate level of data protection, we have implemented
              standard contractual clauses to ensure adequate safeguards are in
              place to protect your personal information.
            </p>

            <h3 className="mb-3 mt-6 font-satoshi text-xl font-bold">
              Retaining your personal information
            </h3>
            <p className="font-general-sans leading-relaxed text-black/80">
              We keep your personal information only for as long as is necessary
              for our purposes of processing, and in particular to protect
              ourselves in the event of a legal claim (for example, information
              relating to a contract with you will be kept for the lifetime of
              the contract and up to ten years after) as well as necessary to
              comply with statutory retention obligations.
            </p>
          </section>

          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              COMMITMENT 3: RESPECTING YOUR RIGHTS
            </h2>
            <p className="mb-4 font-general-sans leading-relaxed text-black/80">
              We commit to respecting your rights. If you wish to exercise any
              of the rights set out below, which are available to you under
              applicable law, please write to us at the address listed below.
            </p>

            <div className="space-y-4">
              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi font-bold">Right of access</h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  You have the right to ask for access to any personal
                  information that is being processed by us.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi font-bold">
                  Right to erasure / restriction of processing
                </h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  In some circumstances, you have the right to request the
                  erasure of your personal information or to restrict how we use
                  it.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi font-bold">
                  Right to update or correct
                </h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  You have the right to ask us to correct any inaccurate
                  personal information and to update any out-of-date personal
                  information.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi font-bold">Right to object</h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  You have in certain circumstances the right to object, on
                  grounds relating to your particular situation, at any time to
                  the processing of personal information concerning you.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi font-bold">
                  Right to data portability
                </h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  In some circumstances, you have the right to request from us
                  the personal information concerning you that you have provided
                  to us in a structured, commonly used, machine-readable format.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi font-bold">
                  Right to withdraw consent
                </h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  If you have given us consent to process your personal
                  information, you can withdraw this consent at any time with
                  effect for the future.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-black/5 p-4">
                <h3 className="mb-2 font-satoshi font-bold">
                  Right to complain
                </h3>
                <p className="font-general-sans text-sm leading-relaxed text-black/80">
                  If you have a concern about how we use your personal
                  information, please contact us using the details set out below
                  and we will do our best to resolve your concern.
                </p>
              </div>
            </div>
          </section>

          
          <section>
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              Children
            </h2>
            <p className="font-general-sans leading-relaxed text-black/80">
              The Platforms are not directed at anyone who we know to be a child
              in the relevant country of data collection (for example, in the US
              this is under 13 and in certain European countries this is under
              16), nor do we collect any personal information from anyone who we
              know to be a child unless we have parental or guardian consent.
              Children should not use the Platforms and should not submit any
              personal information to us without parental or guardian consent.
            </p>
          </section>

          
          <section className="rounded-xl border border-black/10 bg-black/5 p-6">
            <h2 className="mb-4 font-satoshi text-2xl font-bold tracking-tight">
              CONTACT US
            </h2>
            <div className="space-y-3 font-general-sans leading-relaxed text-black/80">
              <p>
                If you have any questions, comments or complaints about this
                Privacy Policy or Cookie Policy, or privacy matters generally,
                please contact us at the address provided below. You can also
                use this address if you wish to request access to the personal
                information about you that we process or to unsubscribe from any
                further e-mail marketing communications.
              </p>
              <div className="mt-4 space-y-1 font-semibold text-black">
                <p>LUX TRADE L.P.</p>
                <p>Company number: SL021977</p>
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

          
          <div className="mt-8 rounded-xl border border-black/10 bg-gradient-to-r from-black/5 to-transparent p-8">
            <h3 className="mb-4 text-center font-satoshi text-xl font-bold">
              Related Policies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/cookies">
                <Button
                  variant="outline"
                  className="border-2 font-satoshi font-semibold"
                >
                  Cookies
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
