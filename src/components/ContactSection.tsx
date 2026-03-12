import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe } from "lucide-react";
// Import the background image provided by the user
import contactoBg from "@/gato/contacto.png";

type InquiryType = "Admisión" | "General" | "Empresas" | "Auspicios" | "Otros";

const inquiryTypes: InquiryType[] = ["Admisión", "General", "Empresas", "Auspicios", "Otros"];

const ContactSection = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType>("General");
  const [agreed, setAgreed] = useState(false);
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0 });
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  const generateCaptcha = () => {
    setCaptcha({
      n1: Math.floor(Math.random() * 10) + 1,
      n2: Math.floor(Math.random() * 10) + 1
    });
    setCaptchaInput("");
    setCaptchaError(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (parseInt(captchaInput) !== captcha.n1 + captcha.n2) {
      setCaptchaError(true);
      return;
    }

    const formData = new FormData(e.currentTarget);

    // Extract form fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const country = formData.get("country") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Build the mailto link parameters
    const subject = encodeURIComponent(`[${selectedInquiry}] Nueva consulta de ${firstName} ${lastName}`);
    let bodyText = `Hola equipo de QuantumHub Perú,\n\n`;
    bodyText += `Mi nombre es ${firstName} ${lastName}.\n`;
    if (country) bodyText += `País: ${country}\n`;
    if (phone) bodyText += `Teléfono: ${phone}\n`;
    if (email) bodyText += `Email de contacto: ${email}\n\n`;
    bodyText += `Mensaje:\n${message}\n\n`;
    if (agreed) bodyText += `* He aceptado recibir ofertas exclusivas y actualizaciones.\n`;

    const body = encodeURIComponent(bodyText);

    // Open default mail client
    window.location.href = `mailto:contacto@qhubperu.org?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative min-h-screen lg:h-screen lg:min-h-[650px] w-full pt-20 lg:pt-24 pb-12 lg:pb-4 overflow-x-hidden bg-background flex items-center justify-center">
      {/* Absolute Background Setup taking the full screen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${contactoBg})`, backgroundPosition: 'center top' }}
      />
      {/* Gradient overlay pushed to corners on desktop, and from top-to-bottom on mobile to ensure reading text */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/40 to-background/90 lg:bg-gradient-to-r lg:from-background/70 lg:via-background/10 lg:to-background/80 z-0 pointer-events-none" />

      {/* Main Container - Allows scrolling on mobile by letting content dictate height natively, but fixed within h-screen on desktop */}
      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-4 w-full lg:h-full max-w-7xl pt-4 pb-2 px-4 md:px-8 lg:px-4">

        {/* --- LEFT SIDE: TEXT AND INFO --- */}
        <div className="w-full lg:w-1/3 flex flex-col justify-end lg:h-full z-10 mt-6 lg:mt-0">

          <div className="mb-6 lg:mb-4 lg:mt-auto">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-[3rem] font-black leading-[0.95] tracking-[-0.03em] flex flex-col items-start uppercase mb-3 lg:mb-2 drop-shadow-md">
              <motion.span
                className="inline-block bg-clip-text text-transparent pb-0.5"
                style={{
                  backgroundImage: "linear-gradient(90deg, #7B2CBF 0%, #F39C12 50%, #7B2CBF 100%)",
                  backgroundSize: "200% auto",
                }}
                animate={{
                  backgroundPosition: ["0% center", "-200% center"],
                  filter: [
                    "drop-shadow(0 0 2px rgba(123,44,191,0.2))",
                    "drop-shadow(0 0 10px rgba(123,44,191,0.5))",
                    "drop-shadow(0 0 2px rgba(123,44,191,0.2))"
                  ]
                }}
                transition={{
                  backgroundPosition: { duration: 3.5, repeat: Infinity, ease: "linear" },
                  filter: { duration: 1.75, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                Tienes Preguntas,
              </motion.span>
              <span className="text-white drop-shadow-md">Tenemos Respuestas</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white drop-shadow-sm text-sm sm:text-base lg:text-sm max-w-[400px] lg:max-w-[300px] font-body leading-relaxed"
            >
              Descubre el ecosistema cuántico y resuelve todas tus dudas.
              Nuestro equipo está conformado por expertos listos para guiar tu camino.
            </motion.p>
          </div>

          {/* Social info with improved mobile structure */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 text-white max-w-full lg:max-w-[300px] bg-background/20 lg:bg-transparent p-4 lg:p-3 rounded-xl backdrop-blur-md lg:backdrop-blur-none"
          >
            <div className="space-y-1">
              <h4 className="text-sm font-bold font-heading uppercase tracking-[-0.02em] text-primary/90 flex items-center gap-1.5 drop-shadow-sm">
                <Mail className="w-4 h-4" /> Email
              </h4>
              <p className="text-white/90 font-body text-xs mt-0.5 drop-shadow-sm">
                contacto@qhubperu.org
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold font-heading uppercase tracking-[-0.02em] text-primary flex items-center gap-1.5 drop-shadow-sm">
                Redes Sociales
              </h4>
              <div className="flex gap-4 text-white/90 font-body text-[11px] font-medium drop-shadow-sm mt-0.5">
                <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: FORM --- */}
        {/* Adjusted to fit freely on mobile but constrained properly on desktop */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center lg:h-full mt-4 lg:mt-0 pb-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2rem] p-6 lg:p-7 w-full shadow-[0_10px_40px_rgba(0,0,0,0.25)] text-gray-800 lg:ml-auto border border-gray-100 lg:my-auto"
          >
            <h3 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-[-0.02em] mb-2 lg:mb-1.5 text-gray-900 leading-none">Cuéntanos qué necesitas</h3>
            <p className="text-gray-500 mb-6 lg:mb-5 text-sm font-medium">Nuestro equipo está listo para asistirte con cada detalle, grande o pequeño.</p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-3">
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="Nombre(s)"
                  className="w-full px-4 lg:px-3.5 py-3 lg:py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
                />
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Apellidos"
                  className="w-full px-4 lg:px-3.5 py-3 lg:py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-3">
                <input
                  type="text"
                  name="country"
                  placeholder="País"
                  className="w-full px-4 lg:px-3.5 py-3 lg:py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Teléfono"
                  className="w-full px-4 lg:px-3.5 py-3 lg:py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Dirección de email"
                  className="w-full px-4 lg:px-3.5 py-3 lg:py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium"
                />
              </div>

              <div>
                <p className="text-sm lg:text-xs font-semibold text-gray-700 mb-2 block">Tipo de Consulta</p>
                <div className="flex flex-wrap gap-2 lg:gap-1.5">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedInquiry(type)}
                      className={`px-4 lg:px-3 py-2 lg:py-1.5 rounded-full text-xs lg:text-[11px] font-bold border transition-colors ${selectedInquiry === type
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700"
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  name="message"
                  required
                  placeholder="Mensaje"
                  rows={3}
                  className="w-full px-4 lg:px-3.5 py-3 lg:py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm font-medium resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div className="flex flex-col flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Verificación de seguridad</p>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-lg text-gray-900 bg-gray-200 px-3 py-1 rounded-lg select-none">
                      {captcha.n1} + {captcha.n2} = ?
                    </span>
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError(false);
                      }}
                      placeholder="Respuesta"
                      required
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-all outline-none ${captchaError ? "border-red-500 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-primary/30"}`}
                    />
                  </div>
                </div>
                {captchaError && (
                  <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] text-red-500 font-bold italic leading-none max-w-[80px]">
                    Incorrecto, intenta de nuevo
                  </motion.p>
                )}
              </div>

              <div className="flex items-center gap-3 lg:gap-2">
                <input
                  type="checkbox"
                  id="offers"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 lg:w-3.5 lg:h-3.5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="offers" className="text-sm lg:text-xs text-gray-500 font-medium cursor-pointer">
                  Me gustaría recibir ofertas exclusivas y actualizaciones
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-2 lg:mt-1.5 py-4 lg:py-3.5 px-6 rounded-xl border border-gray-900 bg-gray-900 text-white font-bold text-sm lg:text-xs tracking-wide uppercase hover:bg-white hover:text-gray-900 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-md"
              >
                Enviar
              </button>

            </form>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
