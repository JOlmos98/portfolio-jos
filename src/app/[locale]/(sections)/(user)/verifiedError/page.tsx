"use server";

export default async function VerifiedErrorPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-44">
                <h1 className="text-4xl font-bold bg-transparent"></h1>
                <div>
                    <h1 className="text-4xl font-bold bg-transparent text-red-500 text-center mt-52 mb-64">Error verifying</h1>
                </div>
            </div>
        </div>
    );
}