import PersonnelManagement from "./admin/personnel-management"
import TeamsManagement from "./admin/teams-management"
import SchedulesManagement from "./admin/schedules-management"
import AlertsManagement from "./admin/alerts-management"
import IncidentsManagement from "./admin/incidents-management"
import ManagementDashboard from "./admin/management-dashboard"
// Import other management components as they are created

interface AdminContentProps {
  activeSection: string
}

export default function AdminContent({ activeSection }: AdminContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "analytics":
        return <AnalyticsContent />
      case "personnel":
        return <PersonnelManagement />
      case "teams":
        return <TeamsManagement />
      case "schedules":
        return <SchedulesManagement />
      case "alerts":
        return <AlertsManagement />
      case "warnings":
        return <WarningsManagement />
      case "weather":
        return <WeatherManagement />
      case "incidents":
        return <IncidentsManagement />
      case "incident-map":
        return <IncidentMapManagement />
      case "response":
        return <ResponseManagement />
      case "feedback":
        return <FeedbackManagement />
      case "feedback-analytics":
        return <FeedbackAnalyticsManagement />
      case "surveys":
        return <SurveysManagement />
      case "news":
        return <NewsManagement />
      case "activities":
        return <ActivitiesManagement />
      case "gallery":
        return <GalleryManagement />
      case "videos":
        return <VideosManagement />
      case "resources":
        return <ResourcesManagement />
      case "maps":
        return <MapsManagement />
      case "hotlines":
        return <HotlinesManagement />
      case "admin":
        return <AdminManagement />
      case "settings":
        return <SettingsManagement />
      case "profile":
        return <ProfileManagement />
      case "management":
        return <ManagementDashboard />
      default:
        return <DashboardContent />
    }
  }

  return (
    <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-900 p-3 sm:p-4 lg:p-6">
      {renderContent()}
    </main>
  )
}

function DashboardContent() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Personnel</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-950">24</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i className="fas fa-users text-blue-950 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Incidents</p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600">3</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-red-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Teams</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600">8</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="fas fa-user-check text-green-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Equipment Ready</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">95%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <i className="fas fa-tools text-yellow-600 text-lg sm:text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-bullhorn text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add Announcement</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-newspaper text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add News</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-calendar-plus text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Add Activity</span>
              </button>
              <button className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 sm:p-4 flex flex-col items-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <i className="fas fa-upload text-yellow-500 text-sm sm:text-base"></i>
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-950 text-center">Upload Media</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-4 sm:mb-6">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-plus text-blue-950 text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">New announcement posted</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-user text-yellow-500 text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">New user registered</p>
                <p className="text-xs text-gray-500">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <i className="fas fa-edit text-white text-xs"></i>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-blue-950">News article updated</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function AnalyticsContent() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-chart-line text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Analytics Dashboard</h2>
      <p className="text-gray-500">Analytics and reporting features coming soon.</p>
    </div>
  )
}

function WarningsManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-bullhorn text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Public Warnings</h2>
      <p className="text-gray-500">Public warning management system coming soon.</p>
    </div>
  )
}

function WeatherManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-satellite text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Weather Advisories</h2>
      <p className="text-gray-500">Weather advisory management system coming soon.</p>
    </div>
  )
}

function IncidentMapManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-map-marked text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Incident Map</h2>
      <p className="text-gray-500">Interactive incident mapping system coming soon.</p>
    </div>
  )
}

function ResponseManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-tasks text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Response Tracking</h2>
      <p className="text-gray-500">Response tracking and coordination system coming soon.</p>
    </div>
  )
}

function FeedbackManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-comment-alt text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Public Feedback</h2>
      <p className="text-gray-500">Public feedback management system coming soon.</p>
    </div>
  )
}

function FeedbackAnalyticsManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-chart-bar text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Feedback Analytics</h2>
      <p className="text-gray-500">Feedback analytics and insights coming soon.</p>
    </div>
  )
}

function SurveysManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-envelope-open-text text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Survey Responses</h2>
      <p className="text-gray-500">Survey management system coming soon.</p>
    </div>
  )
}

function NewsManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-newspaper text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">News & Updates</h2>
      <p className="text-gray-500">News management system coming soon.</p>
    </div>
  )
}

function ActivitiesManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-calendar-alt text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Activities</h2>
      <p className="text-gray-500">Activities management system coming soon.</p>
    </div>
  )
}

function GalleryManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-images text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Gallery</h2>
      <p className="text-gray-500">Gallery management system coming soon.</p>
    </div>
  )
}

function VideosManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-video text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Videos</h2>
      <p className="text-gray-500">Video management system coming soon.</p>
    </div>
  )
}

function ResourcesManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-file-alt text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Resources</h2>
      <p className="text-gray-500">Resource management system coming soon.</p>
    </div>
  )
}

function MapsManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-map-marked text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Maps</h2>
      <p className="text-gray-500">Maps management system coming soon.</p>
    </div>
  )
}

function HotlinesManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-phone-alt text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Hotline Numbers</h2>
      <p className="text-gray-500">Hotline management system coming soon.</p>
    </div>
  )
}

function AdminManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-user-shield text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Admin Management</h2>
      <p className="text-gray-500">Admin user management system coming soon.</p>
    </div>
  )
}

function SettingsManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-cog text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">General Settings</h2>
      <p className="text-gray-500">System settings and configuration coming soon.</p>
    </div>
  )
}

function ProfileManagement() {
  return (
    <div className="text-center py-12">
      <i className="fas fa-user text-gray-400 text-4xl mb-4"></i>
      <h2 className="text-xl font-bold text-blue-950 mb-2">Profile Settings</h2>
      <p className="text-gray-500">Profile management system coming soon.</p>
    </div>
  )
}
