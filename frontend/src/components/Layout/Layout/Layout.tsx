import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F0F3F3]">
      <Header />
      <main className="flex-1 p-4 justify-center max-w-7xl mx-auto w-full flex flex-col mb-8">
        <Breadcrumb />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
