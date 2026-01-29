"use client"

import type React from "react"
import { Phone, Linkedin, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { FormEvent } from "react"
import { X, Check } from "lucide-react"
import NominikChatbot  from "@/app/nominik"

  
export default function Home() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    empleados: "",
    email: "",
    empresa: "",
    sitioweb: "",
    mensaje: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [showThanksModal, setShowThanksModal] = useState(false)

  const scrollToDemo = () => {
    const formSection = document.getElementById("demo-form")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

   const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

  try {
    const response = await fetch("/api/send-demo-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      // Abrir página de agradecimiento en nueva pestaña
      window.open('/gracias', '_blank')
      
    } else {
      setMessage(data.error || "Hubo un error al agendar el demo. Por favor intenta de nuevo.")
    }
    } catch (error) {
      setMessage("Error al enviar la solicitud. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <main className="min-h-screen">
      {showThanksModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => setShowThanksModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-[#4FD1C5] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-[#2C5F6F] mb-4">
                  ¡Gracias por tu interés!
                </h3>
                
                <p className="text-lg text-gray-600 mb-6">
                  Hemos recibido tu solicitud de DEMO. Nuestro equipo se pondrá en contacto contigo muy pronto.
                </p>
                
                <div className="bg-[#4FD1C5]/10 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-[#2C5F6F]">Próximos pasos:</span>
                    <br />
                    Te contactaremos en menos de 24 horas para agendar tu demostración personalizada.
                  </p>
                </div>
                
                <Button
                  onClick={() => setShowThanksModal(false)}
                  className="w-full bg-[#4FD1C5] hover:bg-[#3DB9AD] text-white font-semibold py-6 rounded-full text-lg"
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        )}
      {/* Hero Section */}
      <section
        id="demo-form"
        className="relative min-h-screen bg-gradient-to-r from-[#1a5f7a] via-[#2a8a9e] to-[#57c5d4] flex items-center px-6 py-20"
      >
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Izquierda */}
          <div className="space-y-8 lg:order-1 text-left">
            <img src="/nommy.png" alt="Nommy Logo" className="w-32 h-32 object-contain opacity-90" />
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight [text-shadow:_2px_2px_8px_rgba(0,0,0,0.4)]">
              Para nuestra familia <span className="font-extrabold">Intela</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
              Porque ser parte de Intela tiene sus ventajas.
            </p>
            <Button
              size="lg"
              onClick={scrollToDemo}
              className="bg-[#4db8c4] hover:bg-[#3da5b0] text-white font-semibold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110"
            >
              ¡Quiero mi DEMO!
            </Button>
            <img src="intela.png" alt="Intela" />
          </div>

          {/* Derecha - Form */}
          <div className="bg-[#ADD8E6] rounded-lg lg:order-1 shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="bg-[#ADD8E6] text-gray-700 px-6 py-4">
              <h3 className="text-2xl font-bold text-gray-700">Cuéntanos sobre tu empresa</h3>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/50 backdrop-blur-lg"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/50 backdrop-blur-lg"
                      placeholder="tu@empresa.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa *
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/50 backdrop-blur-lg"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>

                  <div>
                    <label htmlFor="empleados" className="block text-sm font-medium text-gray-700 mb-2">
                      Número de empleados *
                    </label>
                    <select
                      id="empleados"
                      name="empleados"
                      value={formData.empleados}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/50 backdrop-blur-lg"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="1-10">1-10 empleados</option>
                      <option value="11-50">11-50 empleados</option>
                      <option value="51-100">51-100 empleados</option>
                      <option value="101-500">101-500 empleados</option>
                      <option value="500+">Más de 500 empleados</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/50 backdrop-blur-lg"
                    placeholder="+52 55 1234 5678"
                  />
                </div>

                <div>
                  <label htmlFor="sitioWeb" className="block text-sm font-medium text-gray-700 mb-2">
                    Sitio web
                  </label>
                  <input
                    type="url"
                    id="sitioweb"
                    name="sitioweb"
                    value={formData.sitioweb}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/50 backdrop-blur-lg"
                    placeholder="https://tuempresa.com"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">
                    Cuéntanos sobre tus necesidades
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent bg-white/50 backdrop-blur-lg"
                    placeholder="Describe los desafíos actuales en tu gestión de nómina..."
                  />
                </div>

                {message && (
                  <div className={`p-4 rounded-lg ${message.includes('exitosamente') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#4db8c4] hover:bg-[#274263] rounded-full text-white w-full text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="group-hover:animate-pulse">
                    {isLoading ? 'Enviando...' : '¡Agenda tu DEMO!'}
                  </span>
                </button>

                <p className="text-sm text-gray-600 text-center">
                  * Campos obligatorios. Nos pondremos en contacto contigo en 24 horas.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-white to-teal-300/15 py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-[#1e3a5f]">
              Beneficios <span className="text-[#4db8c4]">Nommy</span>
            </h2>
            <div className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl flex-shrink-0">🔍</span>
              <p className="text-lg text-gray-700 leading-relaxed">
                Reclutamiento impulsado por IA que encuentra al mejor talento en menos tiempo.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl flex-shrink-0">⏱️</span>
              <p className="text-lg text-gray-700 leading-relaxed">
                Control de incidencias y horarios totalmente automatizado.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl flex-shrink-0">📂</span>
              <p className="text-lg text-gray-700 leading-relaxed">
                Expediente digital del colaborador siempre actualizado.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-purple-400 text-2xl flex-shrink-0">📍</span>
              <p className="text-lg text-gray-700 leading-relaxed">
                Check-in / Check-out inteligente para una gestión precisa de asistencia.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-red-500 text-2xl flex-shrink-0">⭐</span>
              <p className="text-lg text-gray-700 leading-relaxed">
                Califica a tus colaboradores y mejora sus procesos de desempeño.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img src="images/imagenn.png" alt="Nommy Benefits" className="w-full max-w-4xl h-auto object-contain" />
          </div>
        </div>
      </section>

      <section className="bg-teal-300/10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <img src="si.png" alt="Nommy Platform" />
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1e3a5f] mb-12">
              Conoce qué hace <span className="text-[#4db8c4]">Nommy</span>
            </h2>

            <div className="space-y-8">
              <p className="text-2xl lg:text-3xl text-[#1e3a5f] leading-relaxed">
                <span className="font-bold text-[#1e3a5f]">Nom</span>
                <span className="font-bold text-[#4db8c4]">my</span> es una plataforma inteligente de automatización de
                nómina desarrollada.
              </p>

              <p className="text-2xl lg:text-3xl text-[#1e3a5f] leading-relaxed">
                Nuestro <span className="font-bold text-[#4db8c4]">objetivo</span> es ayudarte a simplificar los
                procesos contables y laborales, <span className="font-bold text-[#4db8c4]">eliminando</span> tareas
                manuales, <span className="font-bold text-[#4db8c4]">errores</span> de cálculo y{" "}
                <span className="font-bold text-[#4db8c4]">duplicidad</span> de información.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-[#274263]">
            Haz crecer tu operación con <span className="text-[#4db8c4]">más herramientas</span> que trabajan por ti
          </h2>

          <div className="space-y-8">
            <div className="flex justify-start">
              <div className="bg-[#4db8c4] text-white px-8 py-6 rounded-3xl rounded-bl-none max-w-2xl shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="flex flex-row items-center gap-4">
                  <img src="/Reloj.png" alt="Reloj" className="w-12 h-12" />
                  <p className="text-lg lg:text-xl leading-relaxed">
                    Ahorra tiempo con cálculos automáticos y actualizaciones en línea
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-[#4db8c4] text-white px-8 py-6 rounded-3xl rounded-br-none max-w-2xl shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="flex flex-row items-center gap-4">
                  <img src="/Tablero.png" alt="Tablero" className="w-12 h-12" />
                  <p className="text-lg lg:text-xl leading-relaxed text-center">
                    Controla desde incidencias, vacaciones y movimientos desde una sola vista
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-[#4db8c4] text-white px-8 py-6 rounded-3xl rounded-bl-none max-w-2xl shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="flex flex-row items-center gap-4">
                  <img src="Vision360.png" alt="Vision 360" className="w-12 h-12" />
                  <p className="text-lg lg:text-xl leading-relaxed">
                    Obtén visibilidad total del historial y estatus de tus empleados
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#17a2b8] to-[#1e3a5f] py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Prueba Nommy
            <br />y olvídate de la nómina.
          </h2>

          <Button
            size="lg"
            onClick={scrollToDemo}
            className="bg-[#4db8c4] hover:bg-[#3da5b0] text-white font-semibold text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110"
          >
            ¡Quiero mi DEMO!
          </Button>
        </div>
      </section>

      <footer className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
            <div className="text-[#1e3a5f]">
              <p className="font-semibold mb-2">Ventas</p>
              <a
                href="https://wa.me/523315179175"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:text-[#1e3a5f] transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-[#1e3a5f] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[#1e3a5f] group-hover:text-[#1e3a5f]">(33) 15179175</span>
              </a>
            </div>

            <div className="flex justify-center">
              <div className="text-[#1e3a5f] text-10xl font-bold flex flex-col items-center gap-1">
                <img src="Nommyy.png" alt="Nommy Logo" className="w-24 h-24" />
              </div>
            </div>

            <div className="text-[#1e3a5f] text-right">
              <p className="font-semibold mb-2 text-[#1e3a5f]">Email</p>
              <p>ventas@nommy.mx</p>
            </div>
          </div>

          <div className="border-t border-[#4db8c4] pt-8">
            <div className="flex justify-between items-center">
              <a
                href="https://drive.google.com/file/d/1cFTxtE8PW_hOgmomy2i56W1SArO7J-dV/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-left font-bold space-x-3 group hover:text-[#1e3a5f] transition-colors duration-300"
              >Política de privacidad</a>

              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/nommy-m%C3%A9xico-a797a1376/?trk=public-profile-join-page"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61578598203669"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>

                <a
                  href="https://www.instagram.com/nommymexico/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#4db8c4] rounded-full flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <NominikChatbot />
    </main>
  )
}
