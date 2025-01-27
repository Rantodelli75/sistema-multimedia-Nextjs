'use client'

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function Logout() {

    const handleLogout = async () => {
        await signOut({
            callbackUrl: '/login',
        })
    }

    return <Button onClick={handleLogout}>cerrar</Button>
}