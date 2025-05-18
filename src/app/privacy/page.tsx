"use client";

import React from 'react';
import PrivacyPolicy from './privacy'; // Assuming privacy.tsx is in the same directory
import Navbar from '@/app/components/Navbar'; // Adjust path as needed
import Footer from '@/app/components/Footer'; // Adjust path as needed

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}
