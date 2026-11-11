"use client"

import Image from "next/image"
import { Shield, Users, Scale, Heart } from "lucide-react"

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-cambel-warm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="space-y-8" data-reveal-stagger>
            {/* Title and Subtitle */}
            <div data-reveal>
              <h2 className="text-5xl md:text-6xl font-bold text-cambel-deep mb-3">Sobre Nosotros</h2>
              <p className="text-sm font-mono uppercase tracking-widest text-gray-600">RED DE SABERES JURÍDICOS</p>
            </div>

            {/* Description */}
            <div className="space-y-4 text-cambel-deep">
              <p data-reveal className="text-lg leading-relaxed">
                CAMBEL es más que un estudio jurídico tradicional. Somos una red integrada de especialidades que
                trabajan en conjunto para ofrecer soluciones completas y personalizadas.
              </p>
              <p data-reveal className="text-lg leading-relaxed">
                Nuestro enfoque colaborativo nos permite abordar cada caso desde múltiples perspectivas, garantizando
                que nuestros clientes reciban el mejor asesoramiento posible.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {/* Experiencia */}
              <div data-reveal className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cambel-salmon rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-cambel-deep mb-1 uppercase text-sm tracking-wide">Experiencia</h3>
                  <p className="text-gray-700 text-sm">Años de trayectoria respaldándonos</p>
                </div>
              </div>

              {/* Colaboración */}
              <div data-reveal className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cambel-deep rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-cambel-deep mb-1 uppercase text-sm tracking-wide">Colaboración</h3>
                  <p className="text-gray-700 text-sm">Trabajo en red multidisciplinario</p>
                </div>
              </div>

              {/* Integridad */}
              <div data-reveal className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cambel-salmon rounded-lg flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-cambel-deep mb-1 uppercase text-sm tracking-wide">Integridad</h3>
                  <p className="text-gray-700 text-sm">Compromiso ético en cada caso</p>
                </div>
              </div>

              {/* Cercanía */}
              <div data-reveal className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cambel-deep rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-cambel-deep mb-1 uppercase text-sm tracking-wide">Cercanía</h3>
                  <p className="text-gray-700 text-sm">Atención personalizada y humana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div data-reveal="photo" className="relative w-full rounded-2xl overflow-hidden bg-cambel-warm border-[3px] border-cambel-deep/5 p-2">
            <Image
              src="/images/equipo-cambel.jpg"
              alt="Equipo CAMBEL - Red Jurídica"
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
