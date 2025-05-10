"use client";

import { useState } from "react";
import { IoHeartOutline } from "react-icons/io5"

export const LikeButton = () => {

    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <div>
            <IoHeartOutline className="text-xl mx-2" />
        </div>
    )
}