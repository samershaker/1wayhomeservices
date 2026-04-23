import type { Metadata } from "next";
import { ProposalClient } from "./ProposalClient";

// Private proposal, must not be indexed or surfaced in any search engine.
export const metadata: Metadata = {
  title: "A Proposal for 1Way Home Services",
  description: "Private proposal for Sam Eram and Bakhan Kareem.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: { canonical: undefined },
};

export default function ProposalPage() {
  return <ProposalClient />;
}
