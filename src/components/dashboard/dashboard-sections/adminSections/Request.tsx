"use client";

import { ArticleRequestDTO } from '@/types/dto';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { useRouter } from '@/i18n/navigation';

export const Request = () => {
    const [requests, setRequests] = useState<ArticleRequestDTO[]>([]);
    const router = useRouter();

    const t = useTranslations("Dashboard");

    useEffect(() => {
        const fetchRequests = async () => {
            const res = await fetch("/api/admin/articles");
            const data = await res.json();
            setRequests(data);
        };
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        const res = await fetch("/api/admin/articles");
        const data = await res.json();
        setRequests(data);
    };

    const handleAccept = async (id: number) => {
        try {

            for (const req of requests) {
                if (req.id === id && req.status === "accepted") {
                    toast.error("El artículo ya está aceptado.");
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
                if (req.id === id && req.status === "rejected") {
                    toast.error("El artículo ya está rechazado.");
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
        <div>
            <h1 className="text-4xl font-bold mb-4">Article requests</h1>
            <table className="w-full text-left border bg-neutral-100 dark:bg-neutral-900 text-black dark:text-neutral-200 p-2">
                <thead>
                    <tr>
                        <th className='p-2'>ID</th>
                        <th className='p-2'>User ID</th>
                        <th className='p-2'>URL</th>
                        <th className='p-2'>Title</th>
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
                                    className="text-white rounded-md bg-green-700 mx-2 p-2 hover:bg-green-900 transition-colors duration-300"
                                >
                                    Aceptar
                                </button>

                                <button
                                    onClick={() => handleReject(req.id)}
                                    className="text-white rounded-md bg-red-700 mx-2 p-2 hover:bg-red-900 transition-colors duration-300"
                                >
                                    Rechazar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
