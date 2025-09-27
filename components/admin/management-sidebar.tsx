"use client"

import { useState } from "react"
import { MapPin, Activity, MessageSquare, ChartBar as BarChart3, FileText, Newspaper, Calendar, Images, Video, FolderOpen, Map, Phone, ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ManagementSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  {
    id: "incident-map",
    label: "Incident Map",
    icon: MapPin,
    description: "Manage incidents with location mapping"
  },
  {
    id: "response-tracking",
    label: "Response Tracking", 
    icon: Activity,
    description: "Track emergency response progress"
  },
  {
    id: "public-feedback",
    label: "Public Feedback",
    icon: MessageSquare,
    description: "Manage citizen feedback and comments"
  },
  {
    id: "feedback-analytics",
    label: "Feedback Analytics",
    icon: BarChart3,
    description: "View feedback statistics and trends"
  },
  {
    id: "survey-responses",
    label: "Survey Responses",
    icon: FileText,
    description: "Manage survey data and responses"
  },
  {
    id: "news-updates",
    label: "News & Updates",
    icon: Newspaper,
    description: "Create and manage news articles"
  },
  {
    id: "activities",
    label: "Activities",
    icon: Calendar,
    description: "Manage events and activities"
  },
  {
    id: "gallery",
    label: "Gallery",
    icon: Images,
    description: "Upload and organize images"
  },
  {
    id: "videos",
    label: "Videos",
    icon: Video,
    description: "Manage video content"
  },
  {
    id: "resources",
    label: "Resources",
    icon: FolderOpen,
    description: "Upload and manage documents"
  },
  {
    id: "maps",
    label: "Maps",
    icon: Map,
    description: "Manage disaster and evacuation maps"
  },
  {
    id: "hotline-numbers",
    label: "Hotline Numbers",
    icon: Phone,
    description: "Manage emergency contact numbers"
  }
]

export default function ManagementSidebar({ activeSection, onSectionChange }: ManagementSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-950 mb-2">Management Center</h2>
        <p className="text-sm text-gray-600">Content & Data Management</p>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          const isExpanded = expandedSections.includes(item.id)

          return (
            <div key={item.id} className="space-y-1">
              <button
                onClick={() => {
                  onSectionChange(item.id)
                  toggleSection(item.id)
                }}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200",
                  isActive 
                    ? "bg-blue-950 text-yellow-500 shadow-md" 
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-950"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className={cn(
                      "text-xs",
                      isActive ? "text-yellow-300" : "text-gray-500"
                    )}>
                      {item.description}
                    </div>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {isExpanded && (
                <div className="ml-8 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-950 hover:bg-blue-50 rounded">
                    View All
                  </button>
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-950 hover:bg-blue-50 rounded">
                    Add New
                  </button>
                  <button className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-950 hover:bg-blue-50 rounded">
                    Settings
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-blue-950 mb-2">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Active Incidents</span>
              <span className="font-medium text-blue-950">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Feedback</span>
              <span className="font-medium text-blue-950">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Published News</span>
              <span className="font-medium text-blue-950">24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}