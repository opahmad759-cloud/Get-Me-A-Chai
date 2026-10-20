import Dashboard from '@/components/Dashboard'

// Keep the route page thin; the interactive profile form lives in Dashboard.
const DashboardPage = () => {
    return (
        <Dashboard />
    )
}

export default DashboardPage

export const metadata = {
    title: "Dashboard - Get Me A Chai",
}
