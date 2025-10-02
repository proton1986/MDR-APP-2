"use client";

import { useState } from "react";
import { MapPin, Activity, MessageSquare, ChartBar as BarChart3, FileText, Newspaper, Calendar, Images, Video, FolderOpen, Map, Phone, ChevronDown, ChevronRight, TriangleAlert as AlertTriangle, Users, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ManagementSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface MenuSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    id: "incidents",
    label: "Incident Management",
    icon: AlertTriangle,
    items: [
      { id: "incident-map-management", label: "Incident Map", icon: Map, description: "Manage incidents with location mapping" },
      { id: "incidents-management", label: "All Incidents", icon: MapPin, description: "View and manage all reported incidents" },
      { id: "incident-management", label: "Incident Reports", icon: FileText, description: "Process incident reports" },
      { id: "response-tracking-management", label: "Response Tracking", icon: Activity, description: "Track emergency response progress" },
    ],
  },
  {
    id: "personnel",
    label: "Personnel & Teams",
    icon: Users,
    items: [
      { id: "personnel-management", label: "Personnel", icon: Activity, description: "Manage MDRRMO personnel" },
      { id: "teams-management", label: "Teams", icon: Activity, description: "Organize and manage teams" },
      { id: "schedules-management", label: "Schedules", icon: Calendar, description: "Manage work schedules" },
      { id: "volunteer-management", label: "Volunteers", icon: Activity, description: "Manage volunteer applications" },
    ],
  },
  {
    id: "alerts",
    label: "Alerts & Communications",
    icon: Megaphone,
    items: [
      { id: "alerts-management", label: "Emergency Alerts", icon: Activity, description: "Manage emergency alerts" },
      { id: "announcement-management", label: "Announcements", icon: Newspaper, description: "Public announcements" },
      { id: "hotline-management", label: "Hotline Numbers", icon: Phone, description: "Emergency contact numbers" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback & Surveys",
    icon: MessageSquare,
    items: [
      { id: "public-feedback-management", label: "Public Feedback", icon: MessageSquare, description: "Citizen feedback and concerns" },
      { id: "feedback-analytics-management", label: "Feedback Analytics", icon: BarChart3, description: "Feedback statistics and insights" },
      { id: "survey-responses-management", label: "Survey Responses", icon: FileText, description: "Survey data and analysis" },
      { id: "contact-management", label: "Contact Messages", icon: MessageSquare, description: "Manage contact inquiries" },
    ],
  },
  {
    id: "content",
    label: "Content Management",
    icon: Newspaper,
    items: [
      { id: "news-management", label: "News & Updates", icon: Newspaper, description: "Publish news and updates" },
      { id: "activities-management", label: "Activities", icon: Calendar, description: "Manage activities and events" },
      { id: "events-management", label: "Events", icon: Calendar, description: "Organize community events" },
    ],
  },
  {
    id: "media",
    label: "Media & Resources",
    icon: Images,
    items: [
      { id: "gallery-management", label: "Photo Gallery", icon: Images, description: "Manage image gallery" },
      { id: "video-management", label: "Video Gallery", icon: Video, description: "Manage video content" },
      { id: "image-upload", label: "Image Upload", icon: Images, description: "Upload new images" },
      { id: "resources-management", label: "Documents", icon: FolderOpen, description: "Upload and manage documents" },
      { id: "documents-management", label: "Public Documents", icon: FileText, description: "Manage public documents" },
      { id: "maps-management", label: "Hazard Maps", icon: Map, description: "Disaster and evacuation maps" },
    ],
  },
];

export default function ManagementSidebar({ activeSection, onSectionChange }: ManagementSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["incidents"]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sec) => sec !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-950">Management Dashboard</h2>
        <p className="text-sm text-gray-600 mt-1">Content & Data Management</p>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-2">
          {menuSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSections.includes(section.id);

            return (
              <div key={section.id}>
                {sectionIndex > 0 && <Separator className="my-3" />}

                <div className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 hover:bg-blue-50 group"
                  >
                    <div className="flex items-center space-x-3">
                      <SectionIcon className="h-5 w-5 text-blue-950 group-hover:text-blue-700" />
                      <span className="font-semibold text-blue-950 group-hover:text-blue-700">
                        {section.label}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="ml-4 space-y-1 pt-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                          <button
                            key={item.id}
                            onClick={() => onSectionChange(item.id)}
                            className={cn(
                              "w-full flex items-start p-2.5 rounded-lg text-left transition-all duration-200",
                              isActive
                                ? "bg-blue-950 text-white shadow-md"
                                : "text-gray-700 hover:bg-blue-50 hover:text-blue-950"
                            )}
                          >
                            <Icon className={cn("h-4 w-4 mt-0.5 mr-3 flex-shrink-0", isActive ? "text-yellow-500" : "")} />
                            <div className="flex-1 min-w-0">
                              <div className={cn("font-medium text-sm", isActive ? "text-white" : "")}>
                                {item.label}
                              </div>
                              <div
                                className={cn(
                                  "text-xs mt-0.5 line-clamp-2",
                                  isActive ? "text-blue-200" : "text-gray-500"
                                )}
                              >
                                {item.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600 text-center">
          <p className="font-medium">Management Portal</p>
          <p className="mt-1">MDRRMO Pio Duran, Albay</p>
        </div>
      </div>
    </div>
  );
}