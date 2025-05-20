"use client"

import Image from "next/image"
import { Mail, Phone, Globe, MapPin, Download } from "lucide-react"
import { useEffect, useState } from "react"

export default function BusinessCard() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if the user is on a mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      return /android|iPad|iPhone|iPod/i.test(userAgent)
    }

    setIsMobile(checkMobile())
  }, [])

  const handleDownload = () => {
    // Create a VCard file content with proper formatting for mobile devices
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
N:Rautenbach;Maunda;;;    
FN:Maunda Rautenbach 
TITLE:Head of Operations
ORG:IJG namibia
EMAIL;type=WORK: maunda@ijg.net
TEL;type=CELL: +264819583529
URL:https://www.ijg.net
ADR;type=WORK:;;4th Floor, 1@Steps C/O Grove & Chasie Street, Windhoek
END:VCARD`

    // Create a Blob with the vCard content
    const blob = new Blob([vCardContent], { type: "text/vcard" })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger download
    const link = document.createElement("a")
    link.href = url
    link.download = "maunda.vcf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Format the address for Google Maps
  const getGoogleMapsUrl = () => {
    const address = encodeURIComponent(
      "4th Floor, 1@Steps C/O Grove & Chasie Street, Windhoek",
    )
    return `https://www.google.com/maps/search/?api=1&query=${address}`
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        {/* Modern card with diagonal design */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Diagonal blue accent */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rotate-45 bg-[#094794] opacity-20"></div>
          
          {/* Content container */}
          <div className="relative z-10 p-8">
            {/* Logo and name */}
            <div className="flex items-center gap-6">
              <div className="h-32 w-32 rounded-lg bg-white p-3 shadow-lg">
                <Image
                  src="/images/logo.png"
                  alt="IJG Logo"
                  width={400}
                  height={400}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Maunda Rautenbach</h1>
                <p className="text-lg font-medium text-[#094794]">Head of Operations</p>
              </div>
            </div>

            {/* Contact details in two columns */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#094794]" />
                  <a href="mailto:maunda@ijg.net" className="text-sm text-gray-700 hover:text-[#094794]">
                    maunda@ijg.net
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#094794]" />
                  <a href="tel:+264819583529" className="text-sm text-gray-700 hover:text-[#094794]">
                    +264819583529
                  </a>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-[#094794]" />
                  <a href="https://ijg.net" className="text-sm text-gray-700 hover:text-[#094794]">
                    www.ijg.net
                  </a>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[#094794]" />
                  <p className="text-sm text-gray-700">
                    4th Floor, 1@Steps C/O Grove & Chasie Street, Windhoek
                  </p>
                </div>
              </div>
            </div>

            {/* Download button with modern styling */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-lg bg-[#094794] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#083b7a] hover:shadow-md"
              >
                <Download className="h-4 w-4" />
                Save Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
