"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export const LikeButton = ({ articleId }: { articleId: number }) => {

    const { data: session } = useSession();
    const t = useTranslations("Articles");
    const [liked, setLiked] = useState(false);

    useEffect(() => {

        const checkIfLiked = async () => {

            if (!session?.user?.id) return;

            try {
                const res = await fetch(`/api/articlesFeed/liked/${articleId}`);
                const data = await res.json();
                setLiked(data.liked);
            } catch (err) {
                console.error("Error checking liked state:", err);
            }
        };

        checkIfLiked();

    }, [articleId, session?.user?.id]);

    const handleLike = async () => {
        try {
            const res = await fetch("/api/articlesFeed/toggleLike", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ articleId }),
            });

            if (!res.ok) throw new Error("Failed to toggle like");

            setLiked((prev) => !prev);
            toast.success(liked ? t("removedFromSaved") : t("addedToSaved"));
        } catch (err) {
            console.error("Error toggling like:", err);
            toast.error(t("likeError"));
        }
    };

    return (
        <button
            onClick={handleLike}
            title={t("setLike")}
            className="active:scale-75 transition-transform duration-150"
        >
            {liked ? (
                <IoHeart className="text-xl mx-2 text-blue-cyan" />
            ) : (
                <IoHeartOutline className="text-xl mx-2  hover:text-blue-cyan" />
            )}
        </button>
    );
};


// "use client";

// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { IoHeartOutline } from "react-icons/io5"

// export const LikeButton = () => {

//     const t = useTranslations("Articles");
//     const [liked, setLiked] = useState(false);

//     const handleLike = () => {


//         setLiked(!liked);
//     };

//     return (
//         <div>
//             <IoHeartOutline
//                 onClick={handleLike}
//                 title={t("setLike")}
//                 className="active:scale-75 transition-transform duration-150"
//             />
//         </div>
//     )
// }