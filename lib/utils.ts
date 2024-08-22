export const formatSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

export const formatAspectRatio = (width: number, height: number) => {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  if (divisor === 0) return "N/A";
  return `${width / divisor}:${height / divisor}`;
};

export const availablePlans = [
  {
    name: "Free",
    price: "$0",
    credits: "3",
    features: [
      "Standard Definition Downloads",
      "High Definition Downloads",
      "Ultra High Definition Downloads",
      "Remove Background",
      "Enhance Image Quality",
    ],
    available: [true, false, false, false, false],
    crownColor: "text-yellow-700",
  },
  {
    name: "Silver",
    price: "$7.99",
    credits: "100",
    features: [
      "Standard Definition Downloads",
      "High Definition Downloads",
      "Ultra High Definition Downloads",
      "Remove Background",
      "Enhance Image Quality",
    ],
    available: [true, true, false, false, false],
    crownColor: "text-gray-500",
  },
  {
    name: "Gold",
    price: "$24.99",
    credits: "Unlimited",
    features: [
      "Standard Definition Downloads",
      "High Definition Downloads",
      "Ultra High Definition Downloads",
      "Remove Background",
      "Enhance Image Quality",
    ],
    available: [true, true, true, true, true],
    crownColor: "text-yellow-500",
  },
];
