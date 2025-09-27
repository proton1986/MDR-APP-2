import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

// Updated hotline numbers from ADMIN-UPDATE
const hotlineData = [
  { service: "MDRRMO Emergency", number: "911 / (052) 234-5678", status: "Active" },
  { service: "Police", number: "117 / (052) 456-7890", status: "Active" },
];

const hotlineColumns: ColumnDef<typeof hotlineData[0]>[] = [
  {
    accessorKey: "service",
    header: "Service",
    cell: info => (
  <div className="font-medium text-blue-950 whitespace-nowrap">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: "number",
    header: "Number",
    cell: info => (
  <div className="text-gray-600 whitespace-nowrap">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: info => (
  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">{String(info.getValue())}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex space-x-2">
        <button className="text-blue-950 hover:text-blue-700 p-1 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-950/20">
          <i className="fas fa-edit"></i>
        </button>
        <button className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500/20">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    ),
  },
];

// Updated users from ADMIN-UPDATE
const userData = [
  { name: "Admin User", role: "Administrator", email: "admin@pioduran.gov.ph", status: "Active", avatar: "A" },
  { name: "Content Editor", role: "Editor", email: "editor@pioduran.gov.ph", status: "Active", avatar: "C" },
];

const userColumns: ColumnDef<typeof userData[0]>[] = [
  {
    accessorKey: "name",
    header: "User",
    cell: info => (
      <div className="flex items-center">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
          <span className="text-blue-950 font-bold text-xs">{info.row.original.avatar}</span>
        </div>
        <div className="min-w-0">
          <div className="font-medium text-blue-950 whitespace-nowrap">{String(info.getValue())}</div>
          <div className="text-xs text-gray-500 whitespace-nowrap">{info.row.original.role}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: info => (
  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs whitespace-nowrap">{String(info.getValue())}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: info => (
  <div className="text-gray-600 whitespace-nowrap">{String(info.getValue())}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: info => (
  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap">{String(info.getValue())}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex space-x-2">
        <button className="text-blue-950 hover:text-blue-700 p-1 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-950/20">
          <i className="fas fa-edit"></i>
        </button>
        <button className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500/20">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    ),
  },
];

export default function AdminContent() {
  const hotlineTable = useReactTable({
    data: hotlineData,
    columns: hotlineColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  const userTable = useReactTable({
    data: userData,
    columns: userColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-blue-900 p-3 sm:p-4 lg:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
// Stats cards can be updated to use the new stats from ADMIN-UPDATE if needed
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

      <div className="space-y-4 sm:space-y-6">
        {/* Hotline Numbers Management */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950">Hotline Numbers Management</h2>
            <button className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20 self-start sm:self-auto">
              <i className="fas fa-plus mr-2"></i>Add Hotline
            </button>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <table className="w-full">
                <thead>
                  {hotlineTable.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {hotlineTable.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950">User Management</h2>
            <button className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-950/20 self-start sm:self-auto">
              <i className="fas fa-plus mr-2"></i>Add User
            </button>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <table className="w-full">
                <thead>
                  {userTable.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="px-4 py-3 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {userTable.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
