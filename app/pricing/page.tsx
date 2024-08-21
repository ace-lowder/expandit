"use client";

import { Header, Plans } from "@/components";

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="flex flex-col items-start">
        <Header size="3xl" className="mb-4">
          Choose Your Plan
        </Header>
        <Plans />
      </div>
    </div>
  );
};

export default PricingPage;
