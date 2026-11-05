"use client"
import ContactForm from "./contact-form"

export default function Contact() {
  return (
    <section id="contacto" className="py-16 bg-cambel-warm relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
