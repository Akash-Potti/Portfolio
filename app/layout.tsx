'use client'
import { Kanit } from 'next/font/google'
import "./globals.css";
import { ParallaxProvider } from 'react-scroll-parallax'

const kanit = Kanit({
  weight: '500',
  subsets: ['latin'],
  display: 'swap'
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <ParallaxProvider>{children}</ParallaxProvider>
      </body>
    </html>
  );
}