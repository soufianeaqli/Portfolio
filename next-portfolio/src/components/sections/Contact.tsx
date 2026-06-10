"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // REMPLACER ICI PAR VOTRE CLÉ WEB3FORMS
          access_key: "e9cec431-0133-4851-8665-96cd736f9da7",
          nom: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "Nouveau message de votre Portfolio",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 relative z-10 px-8">
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: -90 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
            style={{ transformOrigin: "bottom" }}
          >
            <AnimatedTitle
              text="Travaillons Ensemble"
              highlightText="Ensemble"
              className="text-4xl md:text-6xl font-bold mb-6"
            />
            
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              Vous avez un projet en tête ou vous souhaitez simplement dire bonjour ? N'hésitez pas à me contacter !
            </p>

            <div className="space-y-6 text-gray-300">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-red-500 group-hover:text-red-500 transition-colors shadow-lg shadow-black/50">
                  <Mail size={20} />
                </div>
                <a href="mailto:aqlisoufiane364@gmail.com" className="text-lg hover:text-red-500 transition-colors font-medium md:cursor-none">
                  aqlisoufiane364@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-red-500 group-hover:text-red-500 transition-colors shadow-lg shadow-black/50">
                  <MapPin size={20} />
                </div>
                <span className="text-lg font-medium">Meknes, Maroc</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -45 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            style={{ perspective: 1000 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-semibold text-gray-300 ml-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all hover:border-red-500/50"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-semibold text-gray-300 ml-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Votre adresse email"
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all hover:border-red-500/50"
                />
              </div>

              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-semibold text-gray-300 ml-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Comment puis-je vous aider ?"
                  rows={4}
                  className="bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all hover:border-red-500/50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className={`group mt-4 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-all shadow-lg md:cursor-none ${status === "success"
                  ? "bg-green-600 hover:bg-green-700 shadow-green-500/20"
                  : status === "error"
                    ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                    : "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 shadow-red-500/20 active:scale-95"
                  }`}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Envoi en cours...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={18} />
                    Message envoyé !
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={18} />
                    Erreur d'envoi. Réessayer ?
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
