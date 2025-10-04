import DashboardLayout from "@/layouts/DashboardLayout";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h2>
                <p>Esta es la página principal del dashboard.</p>
            </div>
        </DashboardLayout>
    )
}
