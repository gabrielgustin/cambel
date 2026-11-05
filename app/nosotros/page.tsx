import Image from "next/image"
import { Shield, Users, Scale, Heart, Target, Lightbulb, Award, Globe } from "lucide-react"

export default function NosotrosPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-cambel-deep">
        <div className="absolute inset-0 bg-gradient-to-b from-cambel-deep/50 to-cambel-deep"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Sobre Nosotros</h1>
          <p className="text-xl md:text-2xl text-cambel-warm max-w-3xl mx-auto font-mono uppercase tracking-wider">
            Red de Saberes Jurídicos
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-20 bg-cambel-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-cambel-deep mb-6">¿Quiénes Somos?</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  CAMBEL es más que un estudio jurídico tradicional. Somos una red integrada de especialidades que
                  trabajan en conjunto para ofrecer soluciones completas y personalizadas.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nuestro enfoque colaborativo nos permite abordar cada caso desde múltiples perspectivas, garantizando
                  que nuestros clientes reciban el mejor asesoramiento posible.
                </p>
              </div>
            </div>

            {/* Image Column */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-cambel-warm border-[3px] border-cambel-deep/5 p-2">
              <Image
                src="/images/equipo-nosotros.png"
                alt="Equipo CAMBEL - Red Jurídica"
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cambel-deep mb-4">Nuestro Equipo</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Profesionales comprometidos con la excelencia</p>
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {/* Lourdes Martin */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                <Image
                  src="/images/lourdes-martin.jpg"
                  alt="Lourdes Martin"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-cambel-deep mb-1">Lourdes Martin</h3>
                <p className="text-cambel-salmon font-medium tracking-wide mb-4">Socia</p>
                <p className="text-gray-700 leading-relaxed">
                  Abogada y escribana, con especializacion en Derecho Tributario, Civil y Comercial. Cuenta con experiencia en el ambito de las Fuerzas Armadas. Su ejercicio profesional se caracteriza por la rigurosidad tecnica, una vision estrategica orientada a la resolucion eficiente de conflictos y un compromiso permanente con la actualizacion profesional. Valora el trabajo en equipo y el desarrollo de redes colaborativas, lo que le permite abordar proyectos complejos de manera integral y brindar soluciones solidas y bien fundamentadas.
                </p>
              </div>
            </div>

            {/* Noheli Montoya */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                <Image
                  src="/images/nohelia-montoya.jpg"
                  alt="Noheli Montoya"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-2xl lg:text-3xl font-bold text-cambel-deep mb-1">Noheli Montoya</h3>
                <p className="text-cambel-salmon font-medium tracking-wide mb-4">Socia</p>
                <p className="text-gray-700 leading-relaxed">
                  Abogada y escribana. Litigante en Derecho del Consumidor. Miembro de Abogados Consumeristas (Cordoba). Se desempena como abogada patrocinante en ADCOIN, interviniendo en acciones individuales y colectivas. Su practica profesional se distingue por un enfoque estrategico y tecnico, orientado a la defensa de los derechos de los consumidores y a la resolucion eficaz de conflictos juridicos.
                </p>
              </div>
            </div>

            {/* Pilar Cobos */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                <Image
                  src="/images/pilar-cobos.jpg"
                  alt="Pilar Cobos"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-cambel-deep mb-1">Pilar Cobos</h3>
                <p className="text-cambel-salmon font-medium tracking-wide mb-4">Socia</p>
                <p className="text-gray-700 leading-relaxed">
                  Abogada y escribana, con mas de diez años de experiencia en litigios catastrales, civiles, sucesorios y de familia. Brinda asesoramiento integral a organizaciones, combinando solvencia tecnica y una mirada practica en la gestion de conflictos. Actualmente es estudiante de UNIR, con orientacion a oportunidades internacionales y al trabajo colaborativo, aportando una vision dinamica e interdisciplinaria a su ejercicio profesional.
                </p>
              </div>
            </div>

            {/* Jose Eduardo Lovera */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
                <Image
                  src="/images/jose-eduardo-lovera.jpg"
                  alt="Jose Eduardo Lovera"
                  width={224}
                  height={224}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-2xl lg:text-3xl font-bold text-cambel-deep mb-1">Jose Eduardo Lovera</h3>
                <p className="text-cambel-salmon font-medium tracking-wide mb-4">Socio</p>
                <p className="text-gray-700 leading-relaxed">
                  Abogado, maestrando en Derecho Empresarial (UBP) y cursante de la Especialización en Derecho del
                  Trabajo (UNC/UCC). Ex asesor legal de la Inspección de Personas Jurídicas (IPJ), cuenta con más de
                  diez años de experiencia en litigios civiles, comerciales y laborales, así como en la redacción y
                  negociación de contratos y en cumplimiento normativo.
                  <br />
                  <br />
                  Su práctica profesional se orienta al derecho empresarial, civil, comercial, laboral y societario,
                  brindando asesoramiento integral a empresas y particulares desde una mirada estratégica, centrada
                  en el funcionamiento interno de las organizaciones y en la resolución concreta de sus necesidades
                  jurídicas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-cambel-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cambel-deep mb-4">Nuestros Valores</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Los principios que guían nuestro trabajo diario</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Experiencia */}
            <div className="bg-cambel-salmon rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono uppercase">Experiencia</h3>
              <p className="text-white/90">Años de trayectoria respaldándonos</p>
            </div>

            {/* Colaboración */}
            <div className="bg-cambel-deep rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono uppercase">Colaboración</h3>
              <p className="text-white/90">Trabajo en red multidisciplinario</p>
            </div>

            {/* Integridad */}
            <div className="bg-cambel-salmon rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono uppercase">Integridad</h3>
              <p className="text-white/90">Compromiso ético en cada caso</p>
            </div>

            {/* Cercanía */}
            <div className="bg-cambel-deep rounded-xl p-8 text-white hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-mono uppercase">Cercanía</h3>
              <p className="text-white/90">Atención personalizada y humana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-cambel-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Misión */}
            <div className="bg-white rounded-2xl p-10 shadow-lg">
              <div className="w-16 h-16 bg-cambel-salmon rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-cambel-deep mb-6 font-mono uppercase">Misión</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Brindar asesoramiento jurídico integral de excelencia, combinando expertise técnico con un enfoque
                colaborativo y personalizado. Nos comprometemos a entender las necesidades únicas de cada cliente para
                ofrecer soluciones efectivas y sostenibles.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-2xl p-10 shadow-lg">
              <div className="w-16 h-16 bg-cambel-deep rounded-lg flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-cambel-deep mb-6 font-mono uppercase">Visión</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ser reconocidos como la red jurídica de referencia por nuestra capacidad de innovar, colaborar y generar
                valor real para nuestros clientes. Aspiramos a transformar la práctica legal mediante un modelo
                integrado y humano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciadores */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-cambel-deep mb-4">¿Qué Nos Diferencia?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Nuestro enfoque único en el mercado legal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Red Integrada */}
            <div className="text-center">
              <div className="w-20 h-20 bg-cambel-salmon rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cambel-deep mb-4">Red Integrada</h3>
              <p className="text-gray-600">
                Conectamos especialistas de diversas áreas para abordar casos complejos desde múltiples perspectivas.
              </p>
            </div>

            {/* Soluciones Personalizadas */}
            <div className="text-center">
              <div className="w-20 h-20 bg-cambel-deep rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cambel-deep mb-4">Soluciones Personalizadas</h3>
              <p className="text-gray-600">
                Cada cliente es único. Adaptamos nuestros servicios a las necesidades específicas de cada situación.
              </p>
            </div>

            {/* Excelencia Profesional */}
            <div className="text-center">
              <div className="w-20 h-20 bg-cambel-salmon rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-cambel-deep mb-4">Excelencia Profesional</h3>
              <p className="text-gray-600">
                Mantenemos los más altos estándares de calidad y ética en cada proyecto que emprendemos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cambel-deep">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">¿Listo para Trabajar con Nosotros?</h2>
          <p className="text-xl text-cambel-warm mb-8 max-w-2xl mx-auto">
            Descubre cómo nuestra red de especialistas puede ayudarte
          </p>
          <a
            href="/contacto"
            className="inline-block bg-cambel-salmon text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all font-mono uppercase text-sm tracking-wider"
          >
            Contáctanos Hoy
          </a>
        </div>
      </section>
    </div>
  )
}
