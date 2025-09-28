"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Home,
  BarChart3,
  Users,
  UserCheck,
  Calendar,
  AlertTriangle,
  Megaphone,
  Satellite,
  FileText,
  MapPin,
  Activity,
  MessageSquare,
  PieChart,
  FileSpreadsheet,
  Newspaper,
  CalendarDays,
  Images,
  Video,
  FolderOpen,
  Map,
  Phone,
  Settings,
  User,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  badge?: string
  children?: MenuItem[]
}

interface EnhancedSidebarProps {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  className?: string
}

const menuItems: MenuItem[] = [
  {
    id: "main",
    label: "Main",
    icon: Home,
    children: [
      { id: "dashboard", label: "Dashboard", icon: Home, href: "/admin" },
      { id: "analytics", label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    ],
  },
  {
    id: "personnel",
    label: "Personnel",
    icon: Users,
    children: [
      { id: "personnel", label: "Personnel Directory", icon: Users, href: "/admin/personnel" },
      { id: "teams", label: "Team Assignments", icon: UserCheck, href: "/admin/teams" },
      { id: "schedules", label: "Schedules", icon: Calendar, href: "/admin/schedules" },
    ],
  },
  {
    id: "alerts",
    label: "Alerts & Warnings",
    icon: AlertTriangle,
    children: [
      { id: "alerts", label: "Emergency Alerts", icon: AlertTriangle, href: "/admin/alerts" },
      { id: "warnings", label: "Public Warnings", icon: Megaphone, href: "/admin/warnings" },
      { id: "weather", label: "Weather Advisories", icon: Satellite, href: "/admin/weather" },
    ],
  },
  {
    id: "incidents",
    label: "Incident Reports",
    icon: FileText,
    children: [
      { id: "incidents", label: "Reported Incidents", icon: FileText, href: "/admin/incidents" },
      { id: "incident-map", label: "Incident Map", icon: MapPin, href: "/admin/management", badge: "New" },
      { id: "response", label: "Response Tracking", icon: Activity, href: "/admin/response" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback Reports",
    icon: MessageSquare,
    children: [
      { id: "public-feedback", label: "Public Feedback", icon: MessageSquare, href: "/admin/feedback" },
      { id: "feedback-analytics", label: "Feedback Analytics", icon: PieChart, href: "/admin/feedback-analytics" },
      { id: "surveys", label: "Survey Responses", icon: FileSpreadsheet, href: "/admin/surveys" },
    ],
  },
  {
    id: "content",
    label: "Content Management",
    icon: Newspaper,
    children: [
      { id: "news", label: "News & Updates", icon: Newspaper, href: "/admin/news" },
      { id: "activities", label: "Activities", icon: CalendarDays, href: "/admin/activities" },
      { id: "gallery", label: "Gallery", icon: Images, href: "/admin/gallery" },
      { id: "videos", label: "Videos", icon: Video, href: "/admin/videos" },
      { id: "resources", label: "Resources", icon: FolderOpen, href: "/admin/resources" },
      { id: "maps", label: "Maps", icon: Map, href: "/admin/maps" },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: Settings,
    children: [
      { id: "hotlines", label: "Hotline Numbers", icon: Phone, href: "/admin/hotlines" },
      { id: "settings", label: "General Settings", icon: Settings, href: "/admin/settings" },
    ],
  },
  {
    id: "account",
    label: "Account",
    icon: User,
    children: [
      { id: "profile", label: "Profile", icon: User, href: "/admin/profile" },
      { id: "logout", label: "Logout", icon: LogOut, href: "/logout" },
    ],
  },
]

export default function EnhancedSidebar({ isOpen, onToggle, onClose, className }: EnhancedSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["main"])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Auto-expand parent menu if child is active
    menuItems.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some((child) => child.href === pathname)
        if (hasActiveChild && !expandedItems.includes(item.id)) {
          setExpandedItems((prev) => [...prev, item.id])
        }
      }
    })
  }, [pathname, expandedItems])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const handleItemClick = () => {
    if (isMobile) {
      onClose()
    }
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const isActive = item.href === pathname
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleExpanded(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-auto p-3 font-normal transition-all duration-200",
                level === 0 ? "text-blue-200 hover:text-white hover:bg-blue-800/50" : "text-blue-300 hover:text-white hover:bg-blue-800/30",
                isExpanded && "bg-blue-800/30 text-white"
              )}
            >
              <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform duration-200" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            <div className="ml-4 border-l border-blue-800/30 pl-4 space-y-1">
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Link key={item.id} href={item.href || "#"} onClick={handleItemClick}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-auto p-3 font-normal transition-all duration-200",
            level === 0 ? "text-blue-200 hover:text-white hover:bg-blue-800/50" : "text-blue-300 hover:text-white hover:bg-blue-800/30",
            isActive && "bg-blue-800 text-white shadow-lg border-l-4 border-yellow-500"
          )}
        >
          <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-2 bg-yellow-500 text-blue-950 text-xs">
              {item.badge}
            </Badge>
          )}
        </Button>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-blue-950 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto",
          className
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-blue-950 border-b border-blue-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <img 
                  src="/images/design-mode/logome_h9snnx.webp" 
                  alt="MDRRMO Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold">MDRRMO Admin</h1>
                <p className="text-blue-200 text-sm">Pio Duran, Albay</p>
              </div>
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-blue-200 hover:text-white hover:bg-blue-800/50"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.id !== "main" && <Separator className="my-4 bg-blue-800/30" />}
                {renderMenuItem(item)}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="sticky bottom-0 bg-blue-950 border-t border-blue-800 p-4">
          <div className="text-center text-xs text-blue-300">
            <p>&copy; 2025 MDRRMO Pio Duran</p>
            <p>Admin Panel v2.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}