import type { Metadata } from "next"
import EnhancedManagementDashboard from "@/components/admin/enhanced-management-dashboard"

export const metadata: Metadata = {
  title: "Enhanced Management Dashboard - MDRRMO Admin",
  description: "Comprehensive content and data management dashboard for MDRRMO",
}

export default function ManagementPage() {
  return <EnhancedManagementDashboard />
}