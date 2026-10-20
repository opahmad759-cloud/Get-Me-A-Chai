import GitHubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        // Require a GitHub account email and create a matching application user if needed.
        async signIn({ user, account }) {
            if (account?.provider !== 'github' || !user.email) return false

            await mongoose.connect('mongodb://localhost:27017/chai')
            let dbUser = await User.findOne({ email: user.email })

            if (!dbUser) {
                dbUser = await User.create({
                    email: user.email,
                    username: user.email.split('@')[0],
                })
            }

            user.name = dbUser.username
            return true
        },
        // Replace the OAuth display name with the creator's saved username.
        async session({ session }) {
            if (!session.user?.email) return session

            await mongoose.connect('mongodb://localhost:27017/chai')
            const dbUser = await User.findOne({ email: session.user.email })
            if (dbUser) session.user.name = dbUser.username
            return session
        },
    },
}
