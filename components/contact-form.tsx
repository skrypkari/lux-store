"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Send, Check, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.lux-store.eu/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitted(true);


      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 10000);
    } catch (error) {
      console.error('Error submitting form:', error);
      console.log('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-[700px] items-center justify-center rounded-3xl border border-black/5 bg-gradient-to-br from-white via-gray-50/30 to-white p-12 shadow-2xl">
        <div className="max-w-2xl text-center">
          
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-black/20"></div>
              <div className="relative rounded-full bg-black p-8 shadow-xl">
                <Check className="h-16 w-16 text-white" strokeWidth={3} />
              </div>
            </div>
          </div>

          
          <h3 className="mb-6 font-editorial text-5xl font-light tracking-tight text-black">
            Thank you for your message.
          </h3>

          
          <div className="space-y-4">
            <p className="font-satoshi text-xl font-medium text-black/90">
              Your request has been successfully received.
            </p>
            
            <div className="mx-auto w-16 border-t-2 border-black/20"></div>

            <p className="font-general-sans text-lg leading-relaxed text-black/70">
              A member of our <span className="font-semibold text-black">Concierge Service</span> will reach out to you 
              within the next <span className="font-semibold text-black">24 hours</span> with a personal response.
            </p>
          </div>

          
          <div className="mt-10">
            <p className="font-general-sans text-base italic text-black/60">
              We appreciate your trust in <span className="font-semibold not-italic tracking-wide">LUX STORE</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl">
      <div className="border-b border-black/10 bg-black px-8 py-6">
        <h2 className="font-satoshi text-3xl font-bold text-white">
          Send Us a Message
        </h2>
        <p className="mt-2 font-general-sans text-sm text-white/70">
          Fill out the form below and we'll get back to you shortly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="font-satoshi font-semibold">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="h-12 border-black/20 bg-black/5 font-general-sans transition-all focus:border-black focus:bg-white"
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="font-satoshi font-semibold">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="h-12 border-black/20 bg-black/5 font-general-sans transition-all focus:border-black focus:bg-white"
              placeholder="Smith"
            />
          </div>
        </div>

        
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-satoshi font-semibold">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-12 border-black/20 bg-black/5 font-general-sans transition-all focus:border-black focus:bg-white"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-satoshi font-semibold">
              Phone Number
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-general-sans text-black/60">
                +
              </span>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="h-12 border-black/20 bg-black/5 pl-8 font-general-sans transition-all focus:border-black focus:bg-white"
                placeholder="44 555 777 1234"
              />
            </div>
          </div>
        </div>

        <Separator />

        
        <div className="space-y-2">
          <Label htmlFor="subject" className="font-satoshi font-semibold">
            Subject
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="h-12 border-black/20 bg-black/5 font-general-sans transition-all focus:border-black focus:bg-white"
            placeholder="Product inquiry, Appointment booking, etc."
          />
        </div>

        
        <div className="space-y-2">
          <Label htmlFor="message" className="font-satoshi font-semibold">
            Message
          </Label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full rounded-xl border border-black/20 bg-black/5 px-4 py-3 font-general-sans transition-all focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5"
            placeholder="Tell us how we can help you..."
          />
        </div>

        
        <div className="rounded-xl border border-black/10 bg-black/5 p-4">
          <p className="font-general-sans text-xs text-black/60">
            By submitting this form, you agree to our privacy policy. We respect your 
            personal information and will never share it with third parties.
          </p>
        </div>

        
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full gap-2 py-6 text-base font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
