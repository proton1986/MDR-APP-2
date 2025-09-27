"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Personnel {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  status: "active" | "inactive"
  avatar?: string
}

const mockPersonnel: Personnel[] = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    position: "MDRRMO Head",
    department: "Management",
    email: "juan.delacruz@pioduran.gov.ph",
    phone: "(052) 234-5678",
    status: "active",
  },
  {
    id: "2",
    name: "Maria Santos",
    position: "Emergency Response Coordinator",
    department: "Operations",
    email: "maria.santos@pioduran.gov.ph",
    phone: "(052) 234-5679",
    status: "active",
  },
]

export default function PersonnelManagement() {
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredPersonnel = personnel.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Personnel Directory</h1>
          <p className="text-gray-600">Manage MDRRMO personnel and staff</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
          <i className="fas fa-plus mr-2"></i>
          Add Personnel
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search personnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonnel.map((person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-blue-950 font-bold text-lg">
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-blue-950 truncate">{person.name}</CardTitle>
                  <p className="text-sm text-gray-600 truncate">{person.position}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Department</span>
                <Badge variant="secondary">{person.department}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <Badge variant={person.status === "active" ? "default" : "destructive"}>{person.status}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-envelope mr-2 w-4"></i>
                  <span className="truncate">{person.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <i className="fas fa-phone mr-2 w-4"></i>
                  <span>{person.phone}</span>
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-edit mr-1"></i>
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700 bg-transparent">
                  <i className="fas fa-trash mr-1"></i>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPersonnel.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-users text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-500">No personnel found matching your search.</p>
        </div>
      )}
    </div>
  )
}
