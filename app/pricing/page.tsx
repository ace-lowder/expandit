"use client";

import { Header, Plans } from "@/components";

const PricingPage: React.FC = () => (
  <div className="h-[calc(100vh-65px)] bg-gray-100 flex flex-col items-center py-24">
    <Header size="3xl" className="mb-5">
      Choose Your Plan
    </Header>
    <Plans />
  </div>
);

export default PricingPage;
