import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Globe, ShieldCheck, X } from "lucide-react";
// Import the background image provided by the user
import contactoBg from "@/gato/contacto.png";

type InquiryType = "Admisión" | "General" | "Empresas" | "Auspicios" | "Otros";

const inquiryTypes: InquiryType[] = ["Admisión", "General", "Empresas", "Auspicios", "Otros"];

const ContactSection = () => {
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryType>("General");
  const [orgType, setOrgType] = useState<string>("Persona natural individual");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0 });
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [deptError, setDeptError] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const orgTypes = [
    "Persona natural individual",
    "Organización gubernamental estatal",
    "Empresa privada",
    "Universidad (Departamento Académico)",
    "Universidad (Capítulo Estudiantil)",
    "Laboratorio o Grupo de Investigación",
    "ONG u organización juvenil"
  ];

  const departments = [
    "Departamento Académico",
    "Departamento de Investigación",
    "Departamento de Innovación",
    "Departamento de Relaciones Públicas",
    "Departamento de Comunidad"
  ];

  const toggleDepartment = (dept: string) => {
    setSelectedDepartments(prev =>
      prev.includes(dept)
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

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

    if (selectedDepartments.length === 0) {
      setDeptError(true);
      return;
    }

    generateCaptcha();
    setShowCaptcha(true);
  };

  const proceedToSubmit = () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    // Extract form fields
    const name = formData.get("name") as string;
    const orgName = formData.get("orgName") as string;
    const country = formData.get("country") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Build the mailto link parameters
    const subject = encodeURIComponent(`[${selectedInquiry}] Nueva consulta de ${name}`);
    let bodyText = `Hola equipo de QuantumHub Perú,\n\n`;
    bodyText += `Información Personal:\n`;
    bodyText += `- Nombre: ${name}\n`;
    if (orgType !== "Persona natural individual" && orgName) {
      bodyText += `- Nombre de la organización: ${orgName}\n`;
    }
    bodyText += `- Tipo de organización: ${orgType}\n`;
    bodyText += `- País: ${country}\n`;
    bodyText += `- Teléfono: ${phone}\n`;
    bodyText += `- Email: ${email}\n\n`;

    bodyText += `Interés en Departamentos:\n`;
    if (selectedDepartments.length > 0) {
      selectedDepartments.forEach(dept => {
        bodyText += `- ${dept}\n`;
      });
    } else {
      bodyText += `- Ninguno seleccionado\n`;
    }
    bodyText += `\n`;

    bodyText += `Mensaje:\n${message}\n\n`;
    if (agreed) bodyText += `* He aceptado recibir ofertas exclusivas y actualizaciones.\n`;

    const body = encodeURIComponent(bodyText);

    // Open default mail client
    window.location.href = `mailto:contacto@qhubperu.org?subject=${subject}&body=${body}`;
    setShowCaptcha(false);
  };

  const handleCaptchaVerify = () => {
    if (parseInt(captchaInput) === captcha.n1 + captcha.n2) {
      proceedToSubmit();
    } else {
      setCaptchaError(true);
      setTimeout(() => setCaptchaError(false), 2000);
    }
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
                <a href="https://www.instagram.com/quantumhub.pe/" className="hover:text-primary transition-colors">Instagram</a>
                <a href="https://www.linkedin.com/company/quantumhub-per%C3%BA/" className="hover:text-primary transition-colors">LinkedIn</a>
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
            <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-[-0.02em] mb-1 text-gray-900 leading-none">Cuéntanos qué necesitas</h3>
            <p className="text-gray-500 mb-4 lg:mb-3 text-[13px] font-medium leading-tight">Nuestro equipo está listo para asistirte con cada detalle, grande o pequeño.</p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-3 lg:space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-2.5">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Nombre Completo"
                    className="w-full px-3.5 py-2.5 lg:py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[13px] font-medium"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Dirección de email"
                    className="w-full px-3.5 py-2.5 lg:py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[13px] font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-2.5">
                  <input
                    type="text"
                    name="country"
                    required
                    placeholder="País"
                    className="w-full px-3.5 py-2.5 lg:py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[13px] font-medium"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Teléfono"
                    className="w-full px-3.5 py-2.5 lg:py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[13px] font-medium"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-700 mb-1 block uppercase tracking-wider">Tipo de Organización</label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value)}
                    className="w-full px-3.5 py-2.5 lg:py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[13px] font-medium"
                  >
                    {orgTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {orgType !== "Persona natural individual" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <input
                      type="text"
                      name="orgName"
                      required
                      placeholder="Nombre de la organización"
                      className="w-full px-3.5 py-2.5 lg:py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[13px] font-medium"
                    />
                  </motion.div>
                )}

                <div>
                  <div className="flex justify-between items-center mb-1.5 ">
                    <label className="text-[10px] font-bold text-gray-700 block uppercase tracking-wider">¿Con qué departamento le gustaría contactar? (Opción múltiple)</label>
                    {deptError && <span className="text-[9px] text-red-500 font-bold uppercase animate-pulse">Requerido</span>}
                  </div>
                  <div className={`flex flex-wrap gap-1.5 p-1 rounded-xl transition-all ${deptError ? "bg-red-50 ring-1 ring-red-200" : ""}`}>
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => {
                          toggleDepartment(dept);
                          setDeptError(false);
                        }}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${selectedDepartments.includes(dept)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-gray-200 text-gray-500 hover:border-gray-400"
                          }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-1.5">
                <p className="text-[10px] font-bold text-gray-700 mb-1.5 block uppercase tracking-wider">Tipo de Consulta</p>
                <div className="flex flex-wrap gap-1.5">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedInquiry(type)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${selectedInquiry === type
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
                  rows={2}
                  className="w-full px-3.5 py-2.5 lg:py-2 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[13px] font-medium resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 lg:gap-1.5">
                <input
                  type="checkbox"
                  id="offers"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="offers" className="text-[11px] text-gray-500 font-medium cursor-pointer">
                  Me gustaría recibir ofertas exclusivas y actualizaciones
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-1 lg:mt-0.5 py-3 lg:py-2.5 px-6 rounded-xl border border-gray-900 bg-gray-900 text-white font-bold text-xs tracking-wide uppercase hover:bg-white hover:text-gray-900 transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 shadow-md"
              >
                Enviar
              </button>

            </form>
          </motion.div>
        </div>

      </div>

      {/* --- CAPTCHA MODAL --- */}
      <AnimatePresence>
        {showCaptcha && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[2rem] p-6 w-full max-w-[320px] shadow-2xl border border-gray-100 relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-gray-900">Seguridad</h4>
                </div>
                <button
                  onClick={() => setShowCaptcha(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-4 leading-tight">
                Resuelve esta operación para continuar
              </p>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6">
                <div className="flex flex-col items-center gap-4">
                  <span className="font-heading text-2xl font-black text-gray-900 bg-white px-5 py-2 rounded-xl shadow-sm border border-gray-100 select-none">
                    {captcha.n1} + {captcha.n2} = ?
                  </span>
                  <input
                    type="number"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setCaptchaError(false);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCaptchaVerify()}
                    placeholder="Respuesta"
                    autoFocus
                    className={`w-full px-4 py-3 rounded-xl border text-center text-lg font-black transition-all outline-none ${captchaError ? "border-red-500 bg-red-50 text-red-600 focus:ring-red-200" : "border-gray-200 bg-white focus:ring-primary/30 text-gray-900"}`}
                  />
                  {captchaError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-red-500 font-bold uppercase tracking-wide text-center"
                    >
                      Respuesta incorrecta
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCaptchaVerify}
                  className="w-full py-3 px-6 rounded-xl bg-gray-900 text-white font-black text-xs tracking-widest uppercase hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
                >
                  Confirmar y Enviar
                </button>
                <button
                  onClick={() => setShowCaptcha(false)}
                  className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Regresar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactSection;
