"use client";

import { Header, Plans } from "@/components";

const PricingPage: React.FC = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
    <Header size="3xl" className="mb-5">
      Choose Your Plan
    </Header>
    <Plans />
  </div>
);

export default PricingPage;
