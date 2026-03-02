import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
 {/*
import { Analytics } from "@vercel/analytics/next"
*/}
import { NominikChatbot } from "./nominik"

import "./globals.css"
import { GoogleTagManager } from "@next/third-parties/google";
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
import { GoogleAnalytics } from "@next/third-parties/google"
import Script from "next/script"

export const metadata = {
  title: "Clientes intela",
  icons: {
    icon: [
      {
        url: "/Nommyy.png",
        type: "image/png",
        
      },
     
    ],
  },
    generator: 'v0.app'
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Nommy.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/logoblanco.png" media="(prefers-color-scheme: dark)" />
        
       
      
      </head>
      <body className={`font-sans antialiased`}>
        {/* Google Analytics */}
        <GoogleTagManager gtmId="GTM-5DZBHBTF" />
        <GoogleAnalytics gaId="G-SD0Y7NY18T" />
        
        {children}
        
        {/*
        <Analytics />
        */}
      </body>
    </html>
  )
}
