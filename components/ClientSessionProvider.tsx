"use client";

import { SessionProvider } from "next-auth/react";

const ClientSessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <SessionProvider>
        <body>{children}</body>
      </SessionProvider>
    </html>
  );
};

export default ClientSessionProvider;
