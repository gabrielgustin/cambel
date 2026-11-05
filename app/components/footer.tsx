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
            <span className="text-cambel-warm/50 text-xs">Created by</span>
            <a
              href="https://www.autogestiva.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Autogestiva"
            >
              <Image
                src="/images/autogestiva-logo.png"
                alt="Autogestiva"
                width={240}
                height={72}
                className="h-12 w-auto brightness-125"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
