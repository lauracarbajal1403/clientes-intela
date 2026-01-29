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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SD0Y7NY18T"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SD0Y7NY18T');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5DZBHBTF');
          `}
        </Script>

        {children}
        
        {/*
        <Analytics />
        */}
      </body>
    </html>
  )
}
