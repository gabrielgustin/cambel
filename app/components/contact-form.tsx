"use client" // Aseguramos que sea un componente de cliente

import type React from "react"

import { useState, useEffect } from "react"

const countryCodes = {
  AR: "+54",
  US: "+1",
  CA: "+1",
  MX: "+52",
  // Puedes añadir más países aquí
}

const ContactForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("AR") // Estado para el país seleccionado
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false) // Estado para la política de privacidad
  const [professionalName, setProfessionalName] = useState("") // Estado para el nombre profesional

  useEffect(() => {
    const storedProfessional = sessionStorage.getItem("selectedProfessional")
    if (storedProfessional) {
      setProfessionalName(storedProfessional)
      // Clear it after reading
      sessionStorage.removeItem("selectedProfessional")
    }
  }, [])

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value)
  }

  return (
    <div className="bg-cambel-warm py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24 pt-0 lg:pb-0">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-cambel-deep font-mono">CONTÁCTENOS</h2>
      </div>
      <div className="relative max-w-xl mx-auto">
        <svg
          className="absolute left-full transform translate-x-1/2"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-cambel-mist/20" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>
        <svg
          className="absolute right-full bottom-0 transform -translate-x-1/2"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={4} height={4} className="text-cambel-mist/20" fill="currentColor" />
            </pattern>
          </defs>
          <rect width={404} height={404} fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
        </svg>

        <div className="mt-12">
          <form action="#" method="POST" className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-mono uppercase tracking-wider text-cambel-deep mb-2"
              >
                Nombre
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-cambel-mist focus:border-cambel-mist border-gray-300 rounded-md bg-white text-cambel-deep"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-mono uppercase tracking-wider text-cambel-deep mb-2"
              >
                Apellido
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-cambel-mist focus:border-cambel-mist border-gray-300 rounded-md bg-white text-cambel-deep"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-mono uppercase tracking-wider text-cambel-deep mb-2">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="py-3 px-4 block w-full shadow-sm focus:ring-cambel-mist focus:border-cambel-mist border-gray-300 rounded-md bg-white text-cambel-deep"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-mono uppercase tracking-wider text-cambel-deep mb-2"
              >
                Número de teléfono
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center w-24">
                  <label htmlFor="country" className="sr-only">
                    País
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="focus:ring-cambel-mist focus:border-cambel-mist h-full py-0 pl-4 pr-9 border-transparent bg-transparent text-cambel-deep sm:text-sm rounded-md font-mono"
                    value={selectedCountry} // Controlamos el valor del select
                    onChange={handleCountryChange} // Manejamos el cambio
                  >
                    {Object.keys(countryCodes).map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="py-3 px-4 block w-full pl-24 focus:ring-cambel-mist focus:border-cambel-mist border-gray-300 rounded-md bg-white text-cambel-deep"
                  placeholder={countryCodes[selectedCountry as keyof typeof countryCodes]} // Placeholder dinámico
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="professional"
                className="block text-sm font-mono uppercase tracking-wider text-cambel-deep mb-2"
              >
                Profesional (opcional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="professional"
                  id="professional"
                  value={professionalName}
                  onChange={(e) => setProfessionalName(e.target.value)}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-cambel-mist focus:border-cambel-mist border-gray-300 rounded-md bg-white text-cambel-deep"
                  placeholder="Nombre del profesional"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-mono uppercase tracking-wider text-cambel-deep mb-2"
              >
                Mensaje
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-cambel-mist focus:border-cambel-mist border border-gray-300 rounded-md bg-white text-cambel-deep"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsPrivacyAccepted(!isPrivacyAccepted)}
                    className={`${isPrivacyAccepted ? "bg-cambel-salmon" : "bg-gray-200"} relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cambel-mist transition-colors ease-in-out duration-200`}
                    role="switch"
                    aria-checked={isPrivacyAccepted}
                    aria-labelledby="privacy-policy-label"
                  >
                    <span className="sr-only">Aceptar la política de privacidad</span>
                    <span
                      aria-hidden="true"
                      className={`${isPrivacyAccepted ? "translate-x-5" : "translate-x-0"} pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    ></span>
                  </button>
                </div>
                <div className="ml-3 w-0 flex-1">
                  <span className="text-sm text-cambel-deep/70" id="privacy-policy-label">
                    Acepto la{" "}
                    <a href="#" className="font-medium text-cambel-salmon underline hover:text-cambel-salmon/80">
                      política de privacidad
                    </a>
                    .
                  </span>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-mono uppercase tracking-wider text-white bg-cambel-salmon hover:bg-cambel-salmon/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cambel-salmon transition-all duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
