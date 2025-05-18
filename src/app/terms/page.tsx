"use client";

import React from 'react';
import TermsAndConditions from './terms'; // Assuming terms.tsx is in the same directory
import Navbar from '@/app/components/Navbar'; // Adjust path as needed
import Footer from '@/app/components/Footer'; // Adjust path as needed

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <TermsAndConditions />
      </main>
      <Footer />
    </>
  );
} 