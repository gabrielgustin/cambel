// Shared partner list: home "Profesionales" cards and the /nosotros team section.
export interface Lawyer {
  id: number
  image: string
  name: string
  role: string
  linkedin?: string
  whatsapp: string
  description?: string
}

export const lawyers: Lawyer[] = [
  {
    id: 1,
    image: "/images/lourdes-martin.jpg",
    name: "Lourdes Martin",
    role: "Socia",
    linkedin: "https://www.linkedin.com/in/lourdes-candelaria-martin-017bb43a0/",
    whatsapp: "+54 9 3516 30-2002",
    description: "Abogada y escribana con especializacion en derecho tributario, civil y comercial, y con experiencia en el ambito de las Fuerzas Aereas. Su enfoque profesional se caracteriza por una rigurosa precision tecnica, una vision estrategica orientada a la resolucion eficiente de conflictos y un compromiso permanente con la actualizacion normativa.",
  },
  {
    id: 2,
    image: "/images/nohelia-montoya.jpg",
    name: "Noheli Montoya",
    role: "Socia",
    linkedin: "https://www.linkedin.com/in/nohel%C3%AD-b-montoya-53a2a7183/",
    whatsapp: "+54 9 3513 69-0410",
    description: "Abogada y escribana. Litigante en Derecho del Consumidor. Miembro de Abogados Consumeristas (Cordoba). Abogada patrocinante en ADCOIN. Acciones individuales y colectivas con enfoque estrategico y tecnico.",
  },
  {
    id: 3,
    image: "/images/pilar-cobos.jpg",
    name: "Pilar Cobos",
    role: "Socia",
    linkedin: "https://www.linkedin.com/in/pilar-cobos-06ba23313/",
    whatsapp: "+54 9 3515 74-7240",
    description: "Abogada y Escribana con mas de 10 anos en litigios castrenses, civiles, sucesorios y de familia. Asesoria integral a organizaciones. Estudiante de UNIR. Orientada a oportunidades internacionales y trabajo colaborativo.",
  },
  {
    id: 4,
    image: "/images/jose-eduardo-lovera.jpg",
    name: "Jose Eduardo Lovera",
    role: "Socio",
    linkedin: "https://www.linkedin.com/in/jos%C3%A9-eduardo-lovera-bb8b43b9/",
    whatsapp: "+54 9 3515 57-3027",
    description: "Abogado, maestrando en Derecho Empresarial (UBP) y cursante de la Especializacion en Derecho del Trabajo (UNC/UCC), con mas de 10 anos de experiencia en litigios civiles, comerciales y laborales, asi como en contratos y cumplimiento normativo. Su practica se orienta al asesoramiento integral de empresas y particulares.",
  },
]
