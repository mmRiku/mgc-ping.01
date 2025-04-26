import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [apiStatus, setApiStatus] = useState('Checking...');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        setApiStatus('Backend Status: ' + data.message);
      } catch (error) {
        setApiStatus('Backend Status: Error fetching status');
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 1000 * 60 * 1); // Refresh every 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h2>{apiStatus}</h2>
      </main>
    </div>
  );
}
