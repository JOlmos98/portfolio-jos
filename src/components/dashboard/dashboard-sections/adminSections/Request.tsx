"use client";

import { ArticleRequestDTO } from '@/types/dto';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Link, usePathname } from '@/i18n/navigation';

export const Request = () => {

    const [requests, setRequests] = useState<ArticleRequestDTO[]>([]);

    const t = useTranslations("Dashboard");
    const pathname = usePathname();

    useEffect(() => {
        const fetchRequests = async () => {
            const res = await fetch("/api/admin/articlesRequests");
            const data = await res.json();
            setRequests(data);
        };
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        const res = await fetch("/api/admin/articlesRequests");
        const data = await res.json();
        setRequests(data);
    };

    const handleAccept = async (id: number) => {
        try {

            for (const req of requests) {
                if (req.id === id && (req.status === "accepted" || req.status === "rejected")) {
                    toast.error("El artículo ya se ha aceptado o rechazado.");
                    return;
                }
            }

            const res = await fetch("/api/admin/acceptArticle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) { throw new Error("Error accepting article"); }

            toast.success("Artículo aceptado");
            await fetchRequests();
        } catch (err) {
            console.error("Failed to accept article:", err);
            toast.error("Error al aceptar el artículo");
        }
    };

    const handleReject = async (id: number) => {
        try {

            for (const req of requests) {
                if (req.id === id && (req.status === "accepted" || req.status === "rejected")) {
                    toast.error("El artículo ya se ha aceptado o rechazado.");
                    return;
                }
            }

            const res = await fetch("/api/admin/rejectArticle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error("Error rejecting article");
            }

            toast.success("Artículo rechazado");
            await fetchRequests();
        } catch (err) {
            console.error("Failed to reject article:", err);
            toast.error("Error al rechazar el artículo");
        }
    };

    return (
        <main className="flex-1 p-2 pt-28 ml-32 lg:ml-80">
            <h1 className="text-4xl font-bold mb-4">{t("Admin")}</h1>
            {/* <p className="text-zinc-700 dark:text-zinc-300 text-xl mb-6">
                Requests: Solicitudes de artículos. - Users: Usuarios registrados - Articles: Artículos aceptados.
            </p> */}
      <Link className={pathname.includes("requests") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2' : 'text-black dark:text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-200 dark:bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/requests"}>Solicitudes de artículos</Link>
      <Link className={pathname.includes("users") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2' : 'text-black dark:text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/users"}>Usuarios registrados</Link>
      <Link className={pathname.includes("articles") ? 'text-blue-cyan text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2' : 'text-black dark:text-white text-xl hover:text-blue-cyan rounded-md bg-neutral-200  dark:bg-neutral-600 p-2 m-2'} href={"/dashboard/admin/articles"}>Artículos aceptados</Link>
            <div>
                <h1 className="text-3xl font-bold mb-4 mt-5">Solicitudes de artículos</h1>
                <table className="w-full text-left border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-neutral-200 p-2">
                    <thead>
                        <tr>
                            <th className='p-2'>ID</th>
                            <th className='p-2'>User ID</th>
                            <th className='p-2'>URL</th>
                            <th className='p-2'>Título</th>
                            <th className='p-2'>Status</th>
                            <th className='p-2'>Created</th>
                            <th className='p-2'>Updated</th>
                            <th className='p-2'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((req) => (
                            <tr key={req.id} className="border-t rounded-md">
                                <td className='p-2 border'>{req.id}</td>
                                <td className='p-2 border'>{req.userId}</td>
                                <td className='p-2 border'><a href={req.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Ver</a></td>
                                <td className='p-2 border'>{req.title}</td>
                                <td className={req.status === "accepted" ? 'p-2 border text-green-500' : (req.status === "pending" ? 'p-2 border text-blue-cyan' : 'p-2 border text-red-500')}>{req.status}</td>
                                <td className='p-2 border'>{new Date(req.createdAt as string).toLocaleDateString()}</td>
                                <td className='p-2 border'>{new Date(req.updatedAt as string).toLocaleDateString()}</td>
                                <td className='p-2 border'>
                                    <button
                                        onClick={() => handleAccept(req.id)}
                                        className={req.status === "accepted" ? "text-white rounded-md bg-neutral-700 mx-2 p-2 transition-colors duration-300" : (req.status === "rejected" ? "text-white rounded-md bg-neutral-700 mx-2 p-2 transition-colors duration-300" : "text-white rounded-md bg-green-700 mx-2 p-2 hover:bg-green-900 transition-colors duration-300")}
                                    >
                                        Aceptar
                                    </button>

                                    <button
                                        onClick={() => handleReject(req.id)}
                                        className={req.status === "accepted" ? "text-white rounded-md bg-neutral-700 mx-2 p-2 transition-colors duration-300" : (req.status === "rejected" ? "text-white rounded-md bg-neutral-700 mx-2 p-2 transition-colors duration-300" : "text-white rounded-md bg-red-700 mx-2 p-2 hover:bg-red-900 transition-colors duration-300")}
                                    >
                                        Rechazar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};
