"use client"
import { SessionProvider } from "next-auth/react"

// Make the authentication session available to client components throughout the app.
export default function SessionWrapper({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}