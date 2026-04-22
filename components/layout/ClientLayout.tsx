'use client';

import React from 'react';
import { SmoothScroll } from '@/components/cinematic/SmoothScroll';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <SmoothScroll>
      <main id="main-content">
        {children}
      </main>
    </SmoothScroll>
  );
};

export default ClientLayout;

