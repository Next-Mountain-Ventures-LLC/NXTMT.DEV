import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How do I choose the right domain name?",
    answer: "Choose a domain name that is memorable, easy to spell, relevant to your business, and ideally includes keywords related to your products or services. Keep it short, avoid hyphens and numbers if possible, and consider how it will appear in marketing materials."
  },
  {
    question: "How long does it take to register a domain?",
    answer: "Domain registration typically completes within minutes. Once registered, DNS propagation can take 24-48 hours, though most users can access your site much sooner. You'll receive confirmation via email when registration is complete."
  },
  {
    question: "Can I transfer my existing domain to Next Mountain?",
    answer: "Yes, you can transfer your domain from another registrar to Next Mountain. The process usually takes 5-7 days to complete. You'll need to unlock your domain at your current registrar, obtain an authorization code, and initiate the transfer through our dashboard."
  },
  {
    question: "What is WHOIS privacy protection?",
    answer: "WHOIS privacy protection shields your personal information (name, address, phone, email) from being publicly visible in the WHOIS directory. This helps prevent spam, identity theft, and unwanted solicitations. We provide free WHOIS privacy protection for all domain registrations."
  },
  {
    question: "How do I set up DNS records for my domain?",
    answer: "After registering your domain, you can manage DNS records through your Next Mountain dashboard. You'll be able to add or modify records like A, CNAME, MX, and TXT to connect your domain to hosting services, email providers, and other services."
  },
  {
    question: "What happens if I don't renew my domain?",
    answer: "If you don't renew your domain before the expiration date, it will enter a grace period (typically 30 days) where you can still renew at the standard price. After that, there's usually a redemption period with additional fees. Eventually, the domain will become available for registration by others."
  },
  {
    question: "Can I buy a domain that is already registered?",
    answer: "If a domain is already registered, you can attempt to purchase it from the current owner through domain acquisition services. Our team can help negotiate on your behalf or suggest appropriate alternatives if the domain is unavailable."
  },
  {
    question: "Do you offer premium domains?",
    answer: "Yes, we offer a selection of premium domains that provide exceptional branding opportunities. These domains typically have higher value due to their length, memorability, or keyword relevance. Contact our team for information about available premium domains in your industry."
  }
];

const DomainFAQ: React.FC = () => {
  return (
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get answers to common questions about domain registration, management, and transfers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-medium mb-4">
            Still have questions about our domain services?
          </p>
          <div className="inline-flex items-center justify-center rounded-md bg-primary/10 px-4 py-2 text-primary">
            Contact our support team at support@nextmountain.com
          </div>
        </div>
      </div>
    </section>
  );
};

export default DomainFAQ;