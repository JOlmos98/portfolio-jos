"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactForm() {

    const t = useTranslations("Contact");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar");

      setStatus("Mensaje enviado correctamente ✅");
      setFormData({ fullName: "", email: "", content: "" });
    } catch (err) {
      setStatus("Hubo un error al enviar el mensaje ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-300 dark:bg-zinc-800 p-6 m-6 rounded-2xl max-w-2xl w-auto mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {t("Send me")}{" "}
        <span className="text-blue-cyan dark:text-blue-cyan font-bold">
        {t("message")}
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder={t("Full Name")}
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
        />

        <input
          type="email"
          name="email"
          placeholder={t("Email")}
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
        />

        <textarea
          name="content"
          placeholder={t("Content")}
          value={formData.content}
          onChange={handleChange}
          required
          className="w-full text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl min-h-[150px]"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-600 hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl w-full"
        >
          {loading ? "..." : t("Submit")}
        </button>

        {status && (
          <p className="text-center text-sm pt-2 text-white dark:text-white">
            {status}
          </p>
        )}
      </form>
    </div>
  );
}


// "use client";

// import { useState } from 'react';

// export default function ContactForm() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     content: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState<string | null>(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatus(null);

//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error('Error al enviar');

//       setStatus('Mensaje enviado correctamente ✅');
//       setFormData({ fullName: '', email: '', content: '' });
//     } catch (err) {
//       setStatus('Hubo un error al enviar el mensaje ❌');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 space-y-4 border rounded shadow">
//       <h2 className="text-xl font-bold">Contacto</h2>

//       <input
//         type="text"
//         name="fullName"
//         placeholder="Full Name"
//         value={formData.fullName}
//         onChange={handleChange}
//         required
//         className="w-full border p-2 rounded"
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         className="w-full border p-2 rounded"
//       />

//       <textarea
//         name="content"
//         placeholder="Content"
//         value={formData.content}
//         onChange={handleChange}
//         required
//         className="w-full border p-2 rounded min-h-[100px]"
//       />

//       <button
//         type="submit"
//         disabled={loading}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//       >
//         {loading ? 'Enviando...' : 'Enviar'}
//       </button>

//       {status && <p className="text-center mt-2">{status}</p>}
//     </form>
//   );
// }
