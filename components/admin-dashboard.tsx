"use client"

import { useState } from "react"
import AdminSidebar from "./admin-sidebar"
import AdminHeader from "./admin-header"
import AdminContent from "./admin-content"

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")

  // Dummy logout handler
  const handleLogout = () => {
    // Implement logout logic here
    alert("Logged out!")
  }

  return (
    <div className="flex h-screen bg-blue-50">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <AdminHeader onMenuToggle={() => setSidebarOpen((open) => !open)} onLogout={handleLogout} />
        <AdminContent activeSection={activeSection} />
      </div>
    </div>
  )
}

export default AdminDashboard
