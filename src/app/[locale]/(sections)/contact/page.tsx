import ContactForm from "@/components/contact-form/ContactForm";

export default function ContactPage() {


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">

      <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-44">
        <h1 className="text-4xl font-bold bg-transparent"></h1>
        <div>
          <ContactForm />
        </div>
        <div>
          <h1 className="text-4xl bg-transparent mt-44 mb-8 font-bold"></h1>

        </div>
      </div>
    </div>
  );
}