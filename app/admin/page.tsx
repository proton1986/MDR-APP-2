import type { Metadata } from "next"
import EnhancedDashboard from "@/components/admin/enhanced-dashboard"

export const metadata: Metadata = {
  title: "Enhanced MDRRMO Admin Panel",
  description: "Comprehensive admin dashboard for MDRRMO Pio Duran",
}

export default function AdminPage() {
  return <EnhancedDashboard />
}
