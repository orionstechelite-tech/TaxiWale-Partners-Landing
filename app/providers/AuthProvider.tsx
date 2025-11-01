'use client';

import { AuthProvider } from '../context/AuthContext';
import { DemoModalProvider } from '../context/DemoModalContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DemoModalProvider>{children}</DemoModalProvider>
    </AuthProvider>
  );
}
