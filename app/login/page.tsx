import LoginForm from "@/app/components/login-form"

export const metadata = {
  title: "Acceso Administrativo - CAMBEL",
  description: "Panel de administración de CAMBEL Red Jurídica",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cambel-warm flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cambel-deep mb-2">CAMBEL</h1>
          <p className="text-gray-600">Red Jurídica - Panel Administrativo</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
