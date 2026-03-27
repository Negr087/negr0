"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Github } from "lucide-react"

export default function FuturisticLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [bitcoinData, setBitcoinData] = useState({
    price: 0,
    blockHeight: 0,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const res = await fetch("/api/bitcoin")
        if (!res.ok) throw new Error("API error")
        const data = await res.json()
        setBitcoinData({
          price: data.price ?? 0,
          blockHeight: data.blockHeight ?? 0,
        })
      } catch (error) {
        console.error("Error fetching Bitcoin data:", error)
      }
    }

    fetchBitcoinData()
    const interval = setInterval(fetchBitcoinData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden font-sans">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div
          className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.1), transparent 40%)`,
          }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-grid-pattern bg-[length:50px_50px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Bitcoin Info */}
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-cyan-400 font-poppins font-bold text-lg">
                USD{" "}
                {bitcoinData.price.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="h-4 w-px bg-cyan-500/30" />
            <div className="flex items-center space-x-2">
              <span className="text-cyan-300 font-poppins font-medium">
                # {bitcoinData.blockHeight.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        {/* Header text */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-4 tracking-wider font-poppins font-bold">
            negr0
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
        </div>

        {/* Logo container */}
        <div className="relative group">
          {/* Outer glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-400 rounded-full opacity-75 group-hover:opacity-100 blur-lg transition-opacity duration-500" />

          {/* Golden border */}
          <div className="relative bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-400 p-1 rounded-full">
            <div className="bg-black rounded-full p-4">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                <Image
                  src="/avestruz.png"
                  alt="negr0 Logo"
                  fill
                  className="object-contain filter drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-cyan-400/20 animate-spin-reverse" />
        </div>

        {/* Subtitle */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center mt-4 space-x-4">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-cyan-500 text-sm font-poppins">Esta es mi web</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-cyan-500 rounded-full" />
          ))}
        </div>
      </div>
      {/* Personal Info & Timeline Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Personal Info */}
          <div className="mb-16">
            <div className="flex items-center justify-center mb-4">
              <span className="text-gray-300 text-lg font-poppins">Miembro animal de</span>
              <div className="mx-3">
                <img src="/la-crupta-logo.png" alt="La Crupta Logo" className="h-8 w-auto object-contain" />
              </div>
            </div>
            <p className="text-gray-400 text-base font-poppins max-w-2xl mx-auto">
              Comunidad bitcoiner y libertaria mas grande de Argentina
            </p>
          </div>

          {/* Timeline Section */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-10 font-poppins">Mi recorrido y eventos</h3>

            {/* Timeline */}
            <div className="relative h-48 max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20 -translate-y-1/2" />

              {/* Events */}
              <div className="flex justify-between h-full">

                {/* Event 1 - Above */}
                <div className="h-full flex flex-col items-center group cursor-default">
                  <div className="h-1/2 flex flex-col items-center justify-end">
                    <div className="text-center mb-1">
                      <div className="text-cyan-300 font-bold text-xs font-poppins whitespace-nowrap">28-3-23</div>
                      <div className="text-gray-400 text-xs font-poppins mt-0.5 whitespace-nowrap">me uni a la crypta</div>
                    </div>
                    <div className="w-px h-4 bg-cyan-400/30" />
                  </div>
                  <div className="h-1/2 flex flex-col items-center justify-start">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-cyan-400/20 group-hover:scale-150 group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-10 -translate-y-1.5" />
                  </div>
                </div>

                {/* Event 2 - Below */}
                <div className="h-full flex flex-col items-center group cursor-default">
                  <div className="h-1/2 flex flex-col items-center justify-end">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-cyan-400/20 group-hover:scale-150 group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-10 translate-y-1.5" />
                  </div>
                  <div className="h-1/2 flex flex-col items-center justify-start">
                    <div className="w-px h-4 bg-cyan-400/30" />
                    <div className="text-center mt-1">
                      <div className="text-cyan-300 font-bold text-xs font-poppins whitespace-nowrap">10-11-23</div>
                      <div className="text-gray-400 text-xs font-poppins mt-0.5 whitespace-nowrap">Labitconf</div>
                    </div>
                  </div>
                </div>

                {/* Event 3 - Above */}
                <div className="h-full flex flex-col items-center group cursor-default">
                  <div className="h-1/2 flex flex-col items-center justify-end">
                    <div className="text-center mb-1">
                      <div className="text-cyan-300 font-bold text-xs font-poppins whitespace-nowrap">22-2-24</div>
                      <div className="text-gray-400 text-xs font-poppins mt-0.5 whitespace-nowrap">Btc++</div>
                    </div>
                    <div className="w-px h-4 bg-cyan-400/30" />
                  </div>
                  <div className="h-1/2 flex flex-col items-center justify-start">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-cyan-400/20 group-hover:scale-150 group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-10 -translate-y-1.5" />
                  </div>
                </div>

                {/* Event 4 - Below */}
                <div className="h-full flex flex-col items-center group cursor-default">
                  <div className="h-1/2 flex flex-col items-center justify-end">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-cyan-400/20 group-hover:scale-150 group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-10 translate-y-1.5" />
                  </div>
                  <div className="h-1/2 flex flex-col items-center justify-start">
                    <div className="w-px h-4 bg-cyan-400/30" />
                    <div className="text-center mt-1">
                      <div className="text-cyan-300 font-bold text-xs font-poppins whitespace-nowrap">1-11-24</div>
                      <div className="text-gray-400 text-xs font-poppins mt-0.5 whitespace-nowrap">Labitconf</div>
                    </div>
                  </div>
                </div>

                {/* Event 5 - Above */}
                <div className="h-full flex flex-col items-center group cursor-default">
                  <div className="h-1/2 flex flex-col items-center justify-end">
                    <div className="text-center mb-1">
                      <div className="text-cyan-300 font-bold text-xs font-poppins whitespace-nowrap">2-11-24</div>
                      <div className="text-gray-400 text-xs font-poppins mt-0.5 whitespace-nowrap">Halloween</div>
                    </div>
                    <div className="w-px h-4 bg-cyan-400/30" />
                  </div>
                  <div className="h-1/2 flex flex-col items-center justify-start">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-cyan-400/20 group-hover:scale-150 group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-10 -translate-y-1.5" />
                  </div>
                </div>

                {/* Event 6 - Below */}
                <div className="h-full flex flex-col items-center group cursor-default">
                  <div className="h-1/2 flex flex-col items-center justify-end">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-cyan-400/20 group-hover:scale-150 group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-10 translate-y-1.5" />
                  </div>
                  <div className="h-1/2 flex flex-col items-center justify-start">
                    <div className="w-px h-4 bg-cyan-400/30" />
                    <div className="text-center mt-1">
                      <div className="text-cyan-300 font-bold text-xs font-poppins whitespace-nowrap">22-5-25</div>
                      <div className="text-gray-400 text-xs font-poppins mt-0.5 whitespace-nowrap">Bitcoin pizza day</div>
                    </div>
                  </div>
                </div>

                {/* Event 7 - Above */}
                <div className="h-full flex flex-col items-center group cursor-default">
                  <div className="h-1/2 flex flex-col items-center justify-end">
                    <div className="text-center mb-1">
                      <div className="text-cyan-300 font-bold text-xs font-poppins whitespace-nowrap">7-11-25</div>
                      <div className="text-gray-400 text-xs font-poppins mt-0.5 whitespace-nowrap">Labitconf</div>
                    </div>
                    <div className="w-px h-4 bg-cyan-400/30" />
                  </div>
                  <div className="h-1/2 flex flex-col items-center justify-start">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-cyan-400/20 group-hover:scale-150 group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-10 -translate-y-1.5" />
                  </div>
                </div>

                {/* Event 8 - Below */}
                <div className="h-full flex flex-col items-center group cursor-default">
                  <div className="h-1/2 flex flex-col items-center justify-end">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full ring-2 ring-cyan-400/20 group-hover:scale-150 group-hover:ring-4 group-hover:ring-cyan-400/30 transition-all duration-300 z-10 translate-y-1.5" />
                  </div>
                  <div className="h-1/2 flex flex-col items-center justify-start">
                    <div className="w-px h-4 bg-cyan-400/30" />
                    <div className="text-center mt-1">
                      <div className="text-cyan-300 font-bold text-xs font-poppins whitespace-nowrap">13/24-11-25</div>
                      <div className="text-gray-400 text-xs font-poppins mt-0.5 whitespace-nowrap">El Salvador</div>
                      <div className="text-gray-500 text-xs font-poppins whitespace-nowrap">La cruzada</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="flex items-center justify-center">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="mx-4 text-cyan-500 text-xs font-poppins">JOURNEY</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
        </div>
      </div>
      {/* Projects Section */}
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-cyan-500 text-xs font-poppins uppercase tracking-widest mb-3">Mis proyectos</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
              Algunos de mis proyectos
            </h2>
            <p className="text-gray-400 font-poppins max-w-xl mx-auto">Distintos proyectos, distintas tecnologías, cada uno con su esencia.</p>
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mt-6" />
          </div>

          {/* ── Páginas webs ── */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-cyan-500/20" />
              <h3 className="text-xl font-bold text-cyan-400 font-poppins uppercase tracking-widest">Páginas webs</h3>
              <div className="h-px flex-1 bg-cyan-500/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Novasteel */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://novasteel-page.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/nova.png" alt="Novasteel" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">WEB PLATFORM</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Novasteel</h3>
                  <p className="text-gray-400 text-sm mb-4">Plataforma moderna y elegante administrativa de Novasteel.</p>
                  <a href="https://novasteel-page.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Sebadev */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://sebadev-web.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/seba.dev.png" alt="Sebadev" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">PORTFOLIO</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Sebadev</h3>
                  <p className="text-gray-400 text-sm mb-4">Portfolio personal de desarrollo web.</p>
                  <a href="https://sebadev-web.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Flor Bakery */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://florbakery.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/flor.png" alt="Flor Bakery" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">BAKERY WEB</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Flor Bakery</h3>
                  <p className="text-gray-400 text-sm mb-4">Sitio web para panadería artesanal.</p>
                  <a href="https://florbakery.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Japandi Wood */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://japandiwood.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/japandi.png" alt="Japandi Wood" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">E-COMMERCE</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Japandi Wood</h3>
                  <p className="text-gray-400 text-sm mb-4">Tienda de muebles con estética japandi minimalista.</p>
                  <a href="https://japandiwood.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* CRM Seba */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://crmseba.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/crm.png" alt="CRM Seba" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">CRM PLATFORM</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">CRM Seba</h3>
                  <p className="text-gray-400 text-sm mb-4">Sistema de gestión de clientes y relaciones comerciales.</p>
                  <a href="https://crmseba.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Sorpresa Seba y Ani */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://sorpresasebayani.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/sorpresa.png" alt="Sorpresa Seba y Ani" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">SPECIAL WEB</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Sorpresa Seba y Ani</h3>
                  <p className="text-gray-400 text-sm mb-4">Página sorpresa especial para una ocasión única.</p>
                  <a href="https://sorpresasebayani.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Proyectos Arquitectónicos */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://proyectosarquitectonicos.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/tonchi.png" alt="Proyectos Arquitectónicos" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">ARQUITECTURA</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Proyectos Arquitectónicos</h3>
                  <p className="text-gray-400 text-sm mb-4">Portfolio de proyectos y diseños arquitectónicos.</p>
                  <a href="https://proyectosarquitectonicos.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-300 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── Nostr ── */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-cyan-500/20" />
              <h3 className="text-xl font-bold text-cyan-400 font-poppins uppercase tracking-widest">Nostr</h3>
              <div className="h-px flex-1 bg-cyan-500/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* nostr0 */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://nostr0.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/nostr0.png" alt="nostr0" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">NOSTR CLIENT</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">nostr0</h3>
                  <p className="text-gray-400 text-sm mb-4">Cliente de Nostr moderno para buscar eventos.</p>
                  <a href="https://nostr0.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* NostrGuard */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://nostrguard.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/nostrguard.png" alt="NostrGuard" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">NOSTR TOOL</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">NostrGuard</h3>
                  <p className="text-gray-400 text-sm mb-4">Herramienta de seguridad y protección para Nostr.</p>
                  <a href="https://nostrguard.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Substr */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://substr-three.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/substr.png" alt="Substr" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">NOSTR TOOL</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Substr</h3>
                  <p className="text-gray-400 text-sm mb-4">Herramienta para trabajar con suscripciones en Nostr.</p>
                  <a href="https://substr-three.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Badgy */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://v0-badgy.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/badgy.png" alt="Badgy" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">NOSTR TOOL</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Badgy</h3>
                  <p className="text-gray-400 text-sm mb-4">Generador de badges para perfiles de Nostr.</p>
                  <a href="https://v0-badgy.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Drawstr */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://drawstr.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/drawstr.png" alt="Drawstr" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">NOSTR TOOL</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Drawstr</h3>
                  <p className="text-gray-400 text-sm mb-4">Herramienta de dibujo y notas visuales sobre Nostr.</p>
                  <a href="https://drawstr.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ── Bitcoin ── */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-cyan-500/20" />
              <h3 className="text-xl font-bold text-cyan-400 font-poppins uppercase tracking-widest">Bitcoin</h3>
              <div className="h-px flex-1 bg-cyan-500/20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Bitcoin Pizza Day */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://v0-bitcoin-pizza-countdown.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/pizza.png" alt="Bitcoin Pizza Day" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">BITCOIN TRIBUTE</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Bitcoin Pizza Day</h3>
                  <p className="text-gray-400 text-sm mb-4">Cuenta regresiva conmemorando la primera transacción comercial de BTC.</p>
                  <a href="https://v0-bitcoin-pizza-countdown.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

              {/* Bitcoin Ordinals */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://ordinals.com/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/ordinals.png" alt="Bitcoin Ordinals" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">BITCOIN NFT</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Bitcoin Ordinals</h3>
                  <p className="text-gray-400 text-sm mb-4">Artefacto digital único inscrito en la blockchain de Bitcoin.</p>
                  <a href="https://ordinals.com/content/199aa16a3b4dd3882f16c1a735a29caf640b5732a76724c07996fd7e97385fc0i0" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Ordinal
                  </a>
                </div>
              </div>

              {/* Digital Card Str */}
              <div className="group bg-gray-900/40 border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                  <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2 border-b border-cyan-500/20">
                    <span className="w-3 h-3 rounded-full bg-red-500 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-cyan-400 shrink-0" />
                    <span className="w-3 h-3 rounded-full bg-green-500 shrink-0" />
                    <span className="ml-2 text-gray-500 text-xs font-mono truncate">https://digitalcardstr.vercel.app/</span>
                  </div>
                  <div className="relative h-52 overflow-hidden bg-gray-950">
                    <img src="/digitalcard.png" alt="Digital Card Str" className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-cyan-500 font-poppins uppercase tracking-widest mb-2">BITCOIN TOOL</div>
                  <h3 className="text-lg font-bold text-white mb-2 font-poppins">Digital Card Str</h3>
                  <p className="text-gray-400 text-sm mb-4">Tarjeta digital personal integrada con el ecosistema Bitcoin.</p>
                  <a href="https://digitalcardstr.vercel.app/" target="_blank" rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-5 py-2 rounded-full text-sm font-semibold hover:from-cyan-400 hover:to-cyan-400 transition-all duration-300">
                    Ver Proyecto
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom decoration */}
          <div className="flex items-center justify-center mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="mx-4 text-cyan-500 text-xs font-poppins">PROJECTS</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h4 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-400 to-cyan-600 bg-clip-text text-transparent mb-4 tracking-wider font-poppins font-bold">
              Conecta conmigo
            </h4>
            <div className="h-1 w-40 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
            <p className="text-gray-400 mt-4">Seguime en mis redes</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            {/* Nostr */}
            <a
              href="https://primal.net/p/nprofile1qqszp55czrt2t7ftq3dduqhthtwfqdkhg8xxs6cqg9wy9dprdlj26tc9n968jg"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12 bg-black border border-gray-800 rounded-full flex items-center justify-center hover:border-cyan-500/50 transition-all duration-300"
            >
              <img
                src="/nostr-logo.png"
                alt="Nostr"
                className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Negr087"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12 bg-black border border-gray-800 rounded-full flex items-center justify-center hover:border-cyan-500/50 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Telegram */}
            <a
              href="https://web.telegram.org/a/#-1001974259529"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-12 h-12 bg-black border border-gray-800 rounded-full flex items-center justify-center hover:border-cyan-500/50 transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-cyan-500/20">
            <p className="text-gray-500 text-sm font-poppins">© 2025 negr0 - Bitcoiner y nostrero</p>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" />
              <span className="text-cyan-500 text-xs font-poppins">BUILT WITH ❤️</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-500/50" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan-500/50" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-500/50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-500/50" />
    </div>
  )
}
