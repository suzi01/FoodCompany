import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 p-4 justify-center max-w-7xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
