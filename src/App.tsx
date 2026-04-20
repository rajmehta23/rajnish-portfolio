/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VirtualAgent from './components/VirtualAgent';
const ThreeCanvas = lazy(() => import('./components/ThreeCanvas'));

// Lazy loading for better performance
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <HashRouter>
        <div className="min-h-screen flex flex-col selection:bg-primary/30 relative">
          <Suspense fallback={null}>
            <ThreeCanvas />
          </Suspense>
          <Navbar />
          <main className="flex-grow pt-20">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <VirtualAgent />
          <Toaster position="bottom-right" />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

