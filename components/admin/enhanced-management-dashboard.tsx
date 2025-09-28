"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import EnhancedSidebar from "./enhanced-sidebar"
import EnhancedHeader from "./enhanced-header"
import { DataTable } from "./data-table"
import { FormBuilder, FormField } from "./form-builder"
import { useAdminData } from "@/hooks/use-admin-data"
import { adminService } from "@/lib/admin-utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MapPin,
  Activity,
  MessageSquare,
  BarChart3,
  FileSpreadsheet,
  Newspaper,
  CalendarDays,
  Images,
  Video,
  FolderOpen,
  Map,
  Phone,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"

interface ManagementModule {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  table: string
  fields: FormField[]
  columns: ColumnDef<any>[]
}

const managementModules: Record<string, ManagementModule> = {
  "incident-map": {
    id: "incident-map",
    title: "Incident Map",
    description: "Manage incidents with location mapping",
    icon: MapPin,
    table: "incident_reports",
    fields: [
      {
        name: "title",
        label: "Incident Title",
        type: "text",
        required: true,
        section: "Basic Information",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        section: "Basic Information",
      },
      {
        name: "incident_type",
        label: "Incident Type",
        type: "select",
        required: true,
        options: [
          { label: "Fire", value: "fire" },
          { label: "Flood", value: "flood" },
          { label: "Accident", value: "accident" },
          { label: "Medical Emergency", value: "medical" },
          { label: "Other", value: "other" },
        ],
        section: "Basic Information",
      },
      {
        name: "severity",
        label: "Severity",
        type: "select",
        required: true,
        options: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
          { label: "Critical", value: "critical" },
        ],
        section: "Basic Information",
      },
      {
        name: "location",
        label: "Location",
        type: "text",
        required: true,
        section: "Location Details",
      },
      {
        name: "coordinates",
        label: "Coordinates",
        type: "coordinates",
        section: "Location Details",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Reported", value: "reported" },
          { label: "Investigating", value: "investigating" },
          { label: "Resolved", value: "resolved" },
          { label: "Closed", value: "closed" },
        ],
        section: "Status",
      },
    ],
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: "Incident",
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.getValue("title")}</div>
            <div className="text-sm text-gray-500">{row.original.incident_type}</div>
          </div>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
            {row.getValue("location")}
          </div>
        ),
      },
      {
        accessorKey: "severity",
        header: "Severity",
        cell: ({ row }) => {
          const severity = row.getValue("severity") as string
          const colors = {
            low: "bg-green-100 text-green-800",
            medium: "bg-yellow-100 text-yellow-800",
            high: "bg-orange-100 text-orange-800",
            critical: "bg-red-100 text-red-800",
          }
          return (
            <Badge className={colors[severity as keyof typeof colors] || colors.medium}>
              {severity}
            </Badge>
          )
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          const colors = {
            reported: "bg-blue-100 text-blue-800",
            investigating: "bg-yellow-100 text-yellow-800",
            resolved: "bg-green-100 text-green-800",
            closed: "bg-gray-100 text-gray-800",
          }
          return (
            <Badge className={colors[status as keyof typeof colors] || colors.reported}>
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("created_at"))
          return date.toLocaleDateString()
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const incident = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
  },
  "response-tracking": {
    id: "response-tracking",
    title: "Response Tracking",
    description: "Track emergency response progress",
    icon: Activity,
    table: "response_tasks",
    fields: [
      {
        name: "title",
        label: "Task Title",
        type: "text",
        required: true,
        section: "Task Details",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        section: "Task Details",
      },
      {
        name: "assigned_to",
        label: "Assigned To",
        type: "select",
        required: true,
        options: [
          { label: "Team Alpha", value: "team-alpha" },
          { label: "Team Beta", value: "team-beta" },
          { label: "Medical Team", value: "medical-team" },
        ],
        section: "Assignment",
      },
      {
        name: "priority",
        label: "Priority",
        type: "select",
        required: true,
        options: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
          { label: "Urgent", value: "urgent" },
        ],
        section: "Assignment",
      },
      {
        name: "due_date",
        label: "Due Date",
        type: "date",
        required: true,
        section: "Timeline",
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Pending", value: "pending" },
          { label: "In Progress", value: "in_progress" },
          { label: "Completed", value: "completed" },
          { label: "Cancelled", value: "cancelled" },
        ],
        section: "Status",
      },
    ],
    columns: [], // Will be populated dynamically
  },
  // Add other modules here...
}

export default function EnhancedManagementDashboard() {
  const searchParams = useSearchParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeModule, setActiveModule] = useState("incident-map")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const module = managementModules[activeModule]
  
  const {
    data,
    loading,
    error,
    refetch,
    create,
    update,
    delete: deleteItem,
    bulkUpdate,
    bulkDelete,
  } = useAdminData({
    table: module?.table || "incident_reports",
    orderBy: { column: "created_at", ascending: false },
    realtime: true,
  })

  useEffect(() => {
    const moduleParam = searchParams.get("module")
    if (moduleParam && managementModules[moduleParam]) {
      setActiveModule(moduleParam)
    }
  }, [searchParams])

  const handleCreateSubmit = async (formData: any) => {
    await create(formData)
    setShowCreateForm(false)
  }

  const handleBulkAction = async (action: string, rows: any[]) => {
    const ids = rows.map((row) => row.id)
    
    switch (action) {
      case "delete":
        await bulkDelete(ids)
        break
      case "archive":
        await bulkUpdate(ids, { status: "archived" })
        break
      default:
        console.log(`Bulk action: ${action}`, ids)
    }
  }

  if (!module) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Module Not Found</h2>
            <p className="text-gray-600">The requested management module could not be found.</p>
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
          title={module.title}
          breadcrumbs={[
            { label: "Admin", href: "/admin" },
            { label: "Management", href: "/admin/management" },
            { label: module.title },
          ]}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Module Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-950 rounded-lg flex items-center justify-center">
                  <module.icon className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
                  <p className="text-gray-600">{module.description}</p>
                </div>
              </div>
              
              <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New {module.title}</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new {module.title.toLowerCase()}.
                    </DialogDescription>
                  </DialogHeader>
                  <FormBuilder
                    title=""
                    fields={module.fields}
                    onSubmit={handleCreateSubmit}
                    onCancel={() => setShowCreateForm(false)}
                    submitLabel="Create"
                    loading={loading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Data Table */}
            <Card>
              <CardHeader>
                <CardTitle>Manage {module.title}</CardTitle>
                <CardDescription>
                  View, edit, and manage all {module.title.toLowerCase()} records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={module.columns}
                  data={data}
                  searchPlaceholder={`Search ${module.title.toLowerCase()}...`}
                  onRowSelect={setSelectedRows}
                  onBulkAction={handleBulkAction}
                  filters={[
                    {
                      key: "status",
                      label: "Status",
                      options: [
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" },
                        { label: "Archived", value: "archived" },
                      ],
                    },
                  ]}
                  loading={loading}
                  error={error}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}