import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations('HomePage');


  return (
    <div>
      <h1 className="text-xl font-bold bg-transparent">Contact</h1>
      </div>
  );
}