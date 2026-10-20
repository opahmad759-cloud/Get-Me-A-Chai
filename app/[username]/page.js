import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDB'
import User from '@/models/User'

// Resolve a creator's public page by username and return 404 for unknown accounts.
const Username = async ({ params }) => {
    const { username } = await params

    // If the username is not present in the database, show a 404 page
    const checkUser = async () => {
        await connectDb()
        let u = await User.findOne({ username })
        if (!u) {
            return notFound()
        }
    }
    await checkUser()



    return (
        <>
            <PaymentPage username={username} />
        </>
    )
}

export default Username

export async function generateMetadata({ params }) {
    const { username } = await params

    return {
        title: `Support ${username} - Get Me A Chai`,
    }
}