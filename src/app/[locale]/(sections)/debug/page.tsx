import ButtonAuth from '../../../../components/ButtonAuth';

export default function ContactPage() {


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
        <div>
          <ButtonAuth />
        </div>
      </div>
    </div>
  );
}