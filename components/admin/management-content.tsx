"use client"

import { useState } from "react"
import IncidentMapManagement from "./incident-map-management"
import ResponseTrackingManagement from "./response-tracking-management"
import PublicFeedbackManagement from "./public-feedback-management"
import FeedbackAnalyticsManagement from "./feedback-analytics-management"
import SurveyResponsesManagement from "./survey-responses-management"
import NewsManagement from "./news-management"
import ActivitiesManagement from "./activities-management"
import GalleryManagement from "./gallery-management"
import VideoManagement from "./video-management"
import ResourcesManagement from "./resources-management"
import MapsManagement from "./maps-management"
import HotlineManagement from "./hotline-management"

interface ManagementContentProps {
  activeSection: string
}

export default function ManagementContent({ activeSection }: ManagementContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "incident-map":
        return <IncidentMapManagement />
      case "response-tracking":
        return <ResponseTrackingManagement />
      case "public-feedback":
        return <PublicFeedbackManagement />
      case "feedback-analytics":
        return <FeedbackAnalyticsManagement />
      case "survey-responses":
        return <SurveyResponsesManagement />
      case "news-updates":
        return <NewsManagement />
      case "activities":
        return <ActivitiesManagement />
      case "gallery":
        return <GalleryManagement />
      case "videos":
        return <VideoManagement />
      case "resources":
        return <ResourcesManagement />
      case "maps":
        return <MapsManagement />
      case "hotline-numbers":
        return <HotlineManagement />
      default:
        return <DefaultDashboard />
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {renderContent()}
    </div>
  )
}

function DefaultDashboard() {
  return (
    <div className="p-6">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-chart-line text-yellow-500 text-2xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-blue-950 mb-2">Management Dashboard</h2>
        <p className="text-gray-600">Select a management module from the sidebar to get started.</p>
      </div>
    </div>
  )
}