"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Phone, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-cambel-deep text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-cambel-final.png"
              alt="Cambel - Red Jurídica"
              width={180}
              height={51}
              className="h-9 w-auto mb-4"
            />
            <p className="text-cambel-warm">Red de saberes jurídicos para soluciones integrales</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono mb-4 text-cambel-warm uppercase text-sm tracking-wider">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/nosotros" className="text-cambel-warm/80 hover:text-cambel-salmon transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-cambel-warm/80 hover:text-cambel-salmon transition-colors">
                  Novedades Jurídicas
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-cambel-warm/80 hover:text-cambel-salmon transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-cambel-warm/80 hover:text-cambel-salmon transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-mono mb-4 text-cambel-warm uppercase text-sm tracking-wider">Conecta con nosotros</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/cambel.redjuridica?igsh=and2ajV3d2xvdGNo&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cambel-mist/20 rounded-full flex items-center justify-center hover:bg-cambel-salmon transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/cambel/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cambel-mist/20 rounded-full flex items-center justify-center hover:bg-cambel-salmon transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5493515573027"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cambel-mist/20 rounded-full flex items-center justify-center hover:bg-cambel-salmon transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cambel-mist/20 pt-8 text-center">
          <p className="text-cambel-warm/70 text-sm">
            © {new Date().getFullYear()} CAMBEL. Todos los derechos reservados.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            {/* Firma de Autogestiva: pastilla con flecha para invitar a visitar autogestiva.com.ar */}
            <a
              href="https://www.autogestiva.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Desarrollado por Autogestiva (se abre en una pestaña nueva)"
              className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full border [border-color:color-mix(in_srgb,currentColor_30%,transparent)] px-4 py-2 text-[13px] font-medium leading-none opacity-90 transition hover:-translate-y-0.5 hover:border-orange-500 hover:opacity-100 text-cambel-warm/70"
            >
              <span>Desarrollado por</span>
              <svg viewBox="0 0 40 42" className="h-[1.6em] w-auto" aria-hidden="true"><path d="M0 40 L15.5 0 H24.5 L40 40 H30.5 L20 13 L9.5 40 Z" fill="currentColor" /><path transform="translate(-4.4 -6) scale(1.2)" d="M19 22 V37.5 l3.9-3.7 2.9 6 2.8-1.4-2.9-5.9 h5.3z" fill="#f97316" /></svg>
              <svg viewBox="0 0 24 24" className="h-[0.95em] w-auto opacity-60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-500 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
