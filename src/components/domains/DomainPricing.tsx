import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DomainPrice {
  extension: string;
  register: number;
  transfer: number;
  renew: number;
  popular?: boolean;
}

const domainPricing: DomainPrice[] = [
  { extension: '.com', register: 14.99, transfer: 14.99, renew: 14.99, popular: true },
  { extension: '.net', register: 12.99, transfer: 12.99, renew: 12.99 },
  { extension: '.org', register: 13.99, transfer: 13.99, renew: 13.99 },
  { extension: '.co', register: 24.99, transfer: 24.99, renew: 24.99 },
  { extension: '.io', register: 39.99, transfer: 39.99, renew: 39.99, popular: true },
  { extension: '.dev', register: 18.99, transfer: 18.99, renew: 18.99, popular: true },
  { extension: '.app', register: 19.99, transfer: 19.99, renew: 19.99 },
  { extension: '.site', register: 16.99, transfer: 16.99, renew: 16.99 },
  { extension: '.online', register: 9.99, transfer: 9.99, renew: 9.99 },
  { extension: '.store', register: 29.99, transfer: 29.99, renew: 29.99 }
];

const DomainPricing: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Transparent Domain Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Competitive pricing on hundreds of domain extensions with no hidden fees.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[180px] font-bold">Domain Extension</TableHead>
                <TableHead className="text-right font-bold">Registration</TableHead>
                <TableHead className="text-right font-bold">Transfer</TableHead>
                <TableHead className="text-right font-bold">Renewal</TableHead>
                <TableHead className="text-right font-bold">Features</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domainPricing.map((domain) => (
                <TableRow key={domain.extension} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    {domain.extension}
                    {domain.popular && (
                      <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-bold">${domain.register}/yr</TableCell>
                  <TableCell className="text-right">${domain.transfer}/yr</TableCell>
                  <TableCell className="text-right">${domain.renew}/yr</TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-1">
                      <span className="inline-flex items-center text-xs text-green-500">
                        <Check className="h-3 w-3 mr-1" /> Free DNS
                      </span>
                      <span className="inline-flex items-center text-xs text-green-500">
                        <Check className="h-3 w-3 mr-1" /> WHOIS Privacy
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Register</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All domains come with free WHOIS privacy protection, DNS management, and email forwarding.
            Prices are for the first year of registration and may vary for subsequent renewals.
          </p>
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90"
          >
            View All Domain Extensions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DomainPricing;