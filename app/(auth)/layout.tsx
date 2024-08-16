export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center bg-white min-h-[calc(100vh-65px)] w-full min-w-[480px]">
      {children}
    </div>
  );
}
