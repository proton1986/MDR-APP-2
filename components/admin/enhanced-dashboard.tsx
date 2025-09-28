"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import EnhancedSidebar from "./enhanced-sidebar"
import EnhancedHeader from "./enhanced-header"
import DashboardStats from "./dashboard-stats"
import RecentActivity from "./recent-activity"
import QuickActions from "./quick-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Users,
  FileText,
  Activity,
  TrendingUp,
  Clock,
  MapPin,
  Phone,
} from "lucide-react"

interface DashboardData {
  totalPersonnel: number
  activeIncidents: number
  responseTeams: number
  equipmentReady: number
  recentActivities: Array<{
    id: string
    title: string
    time: string
    type: "info" | "warning" | "success" | "error"
  }>
  systemStatus: {
    database: "online" | "offline" | "maintenance"
    notifications: "online" | "offline" | "maintenance"
    backup: "online" | "offline" | "maintenance"
  }
}

export default function EnhancedDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API calls - replace with actual Supabase queries
      const mockData: DashboardData = {
        totalPersonnel: 24,
        activeIncidents: 3,
        responseTeams: 8,
        equipmentReady: 95,
        recentActivities: [
          {
            id: "1",
            title: "New incident reported in Barangay Centro",
            time: "2 minutes ago",
            type: "warning",
          },
          {
            id: "2",
            title: "Emergency response team deployed",
            time: "15 minutes ago",
            type: "info",
          },
          {
            id: "3",
            title: "Weather advisory updated",
            time: "1 hour ago",
            type: "success",
          },
        ],
        systemStatus: {
          database: "online",
          notifications: "online",
          backup: "online",
        },
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDashboardData(mockData)
    } catch (err) {
      setError("Failed to load dashboard data")
      console.error("Dashboard data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "offline":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "success":
        return <Activity className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={fetchDashboardData}>Retry</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Enhanced Sidebar */}
      <EnhancedSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-80">
        {/* Enhanced Header */}
        <EnhancedHeader
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title="Dashboard"
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Dashboard" },
          ]}
        />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Personnel</p>
                    <p className="text-3xl font-bold text-blue-950">{dashboardData?.totalPersonnel}</p>
                    <p className="text-sm text-green-600 mt-1">
                      <TrendingUp className="inline h-3 w-3 mr-1" />
                      +2 this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-950" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                    <p className="text-3xl font-bold text-red-600">{dashboardData?.activeIncidents}</p>
                    <p className="text-sm text-red-600 mt-1">
                      <AlertTriangle className="inline h-3 w-3 mr-1" />
                      Requires attention
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Response Teams</p>
                    <p className="text-3xl font-bold text-green-600">{dashboardData?.responseTeams}</p>
                    <p className="text-sm text-green-600 mt-1">
                      <Activity className="inline h-3 w-3 mr-1" />
                      All active
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Activity className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Equipment Ready</p>
                    <p className="text-3xl font-bold text-yellow-600">{dashboardData?.equipmentReady}%</p>
                    <Progress value={dashboardData?.equipmentReady} className="mt-2" />
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>Frequently used administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-500"
                    onClick={() => window.location.href = "/admin/management"}
                  >
                    <MapPin className="h-6 w-6 text-blue-950" />
                    <span className="text-sm font-medium">Incident Map</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-500"
                  >
                    <Activity className="h-6 w-6 text-green-600" />
                    <span className="text-sm font-medium">Response Tracking</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-yellow-50 hover:border-yellow-500"
                  >
                    <Phone className="h-6 w-6 text-yellow-600" />
                    <span className="text-sm font-medium">Hotlines</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-500"
                  >
                    <FileText className="h-6 w-6 text-purple-600" />
                    <span className="text-sm font-medium">Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData?.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Status</span>
              </CardTitle>
              <CardDescription>Current system health and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <div className={cn("w-3 h-3 rounded-full", getStatusColor(dashboardData?.systemStatus.database || "offline"))} />
                  <div>
                    <p className="font-medium">Database</p>
                    <p className="text-sm text-gray-600 capitalize">{dashboardData?.systemStatus.database}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={cn("w-3 h-3 rounded-full", getStatusColor(dashboardData?.systemStatus.notifications || "offline"))} />
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-gray-600 capitalize">{dashboardData?.systemStatus.notifications}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={cn("w-3 h-3 rounded-full", getStatusColor(dashboardData?.systemStatus.backup || "offline"))} />
                  <div>
                    <p className="font-medium">Backup System</p>
                    <p className="text-sm text-gray-600 capitalize">{dashboardData?.systemStatus.backup}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}