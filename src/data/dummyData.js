
// DUMMY DATA FOR DEVELOPMENT
// Replace with API calls in production

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@campus.edu",
    password: "password123", // In real app, this would be hashed
    role: "student",
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@campus.edu",
    password: "password123",
    role: "faculty",
    createdAt: "2023-01-10T11:20:00Z"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@campus.edu",
    password: "admin123",
    role: "admin",
    createdAt: "2023-01-01T09:00:00Z"
  },
  {
    id: 4,
    name: "Lab Manager",
    email: "lab@campus.edu",
    password: "password123",
    role: "facility-head",
    facilityManaged: "computer-lab",
    createdAt: "2023-01-05T14:45:00Z"
  },
  {
    id: 5,
    name: "Maintenance Staff",
    email: "maintenance@campus.edu",
    password: "password123",
    role: "assignee",
    createdAt: "2023-01-08T08:30:00Z"
  }
];

export const facilities = [
  {
    id: 1,
    name: "Computer Lab",
    code: "computer-lab",
    head: 4, // User ID of facility head
    description: "Main computer laboratory with 50 workstations",
    location: "Building A, Floor 2"
  },
  {
    id: 2,
    name: "Lecture Hall",
    code: "lecture-hall",
    head: 2,
    description: "Main lecture hall with capacity for 200 students",
    location: "Building B, Ground Floor"
  },
  {
    id: 3,
    name: "Student Hostel",
    code: "hostel",
    head: 3,
    description: "Student residence with 100 rooms",
    location: "East Campus"
  },
  {
    id: 4,
    name: "Cafeteria",
    code: "cafeteria",
    head: 3,
    description: "Main campus cafeteria",
    location: "Central Campus"
  },
  {
    id: 5,
    name: "Gymnasium",
    code: "gymnasium",
    head: 3,
    description: "Campus gymnasium with fitness equipment",
    location: "Sports Complex"
  }
];

export const severityLevels = [
  { id: 1, name: "Low", description: "Minor issue, can be addressed when convenient" },
  { id: 2, name: "Medium", description: "Issue affecting functionality but with workarounds" },
  { id: 3, name: "High", description: "Significant issue affecting multiple users" },
  { id: 4, name: "Critical", description: "Severe issue requiring immediate attention" }
];

export const requestStatuses = [
  { id: "unassigned", name: "Unassigned", color: "badge-unassigned" },
  { id: "assigned", name: "Assigned", color: "badge-assigned" },
  { id: "progress", name: "Work in Progress", color: "badge-progress" },
  { id: "closed", name: "Closed", color: "badge-closed" },
  { id: "rejected", name: "Rejected", color: "badge-rejected" }
];

export const requests = [
  {
    id: 1,
    title: "Broken Computer Monitor",
    description: "The monitor at workstation #12 is not turning on. I've tried different power cables but no luck.",
    facilityId: 1,
    createdBy: 1,
    assignedTo: 5,
    severityId: 3,
    status: "assigned",
    createdAt: "2023-04-10T09:15:00Z",
    updatedAt: "2023-04-10T14:30:00Z",
    comments: [
      {
        id: 1,
        requestId: 1,
        userId: 1,
        content: "I tried turning it off and on again but it didn't work.",
        createdAt: "2023-04-10T10:20:00Z"
      },
      {
        id: 2,
        requestId: 1,
        userId: 5,
        content: "I'll check it this afternoon. Please use workstation #14 in the meantime.",
        createdAt: "2023-04-10T11:05:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Projector not working",
    description: "The projector in Lecture Hall B is displaying fuzzy images. It's affecting class presentations.",
    facilityId: 2,
    createdBy: 2,
    assignedTo: null,
    severityId: 2,
    status: "unassigned",
    createdAt: "2023-04-11T13:45:00Z",
    updatedAt: "2023-04-11T13:45:00Z",
    comments: []
  },
  {
    id: 3,
    title: "Water leakage in hostel bathroom",
    description: "There's a significant water leak in Room 204's bathroom. Water is seeping into the corridor.",
    facilityId: 3,
    createdBy: 1,
    assignedTo: 5,
    severityId: 4,
    status: "progress",
    createdAt: "2023-04-09T18:20:00Z",
    updatedAt: "2023-04-10T08:15:00Z",
    comments: [
      {
        id: 3,
        requestId: 3,
        userId: 5,
        content: "Temporary fix in place. Will return with parts for permanent repair tomorrow.",
        createdAt: "2023-04-10T08:15:00Z"
      }
    ]
  },
  {
    id: 4,
    title: "Cafeteria microwave not heating",
    description: "The microwave on the left side of the cafeteria isn't heating food properly.",
    facilityId: 4,
    createdBy: 1,
    assignedTo: 5,
    severityId: 1,
    status: "closed",
    createdAt: "2023-04-05T12:10:00Z",
    updatedAt: "2023-04-07T15:30:00Z",
    comments: [
      {
        id: 4,
        requestId: 4,
        userId: 5,
        content: "Fixed the microwave. Issue was with the internal fuse.",
        createdAt: "2023-04-07T15:30:00Z"
      }
    ]
  },
  {
    id: 5,
    title: "Broken treadmill",
    description: "Treadmill #3 in the gymnasium makes a loud noise when in use and stops abruptly.",
    facilityId: 5,
    createdBy: 2,
    assignedTo: null,
    severityId: 2,
    status: "rejected",
    createdAt: "2023-04-08T16:30:00Z",
    updatedAt: "2023-04-09T09:10:00Z",
    comments: [
      {
        id: 5,
        requestId: 5,
        userId: 3,
        content: "This equipment is scheduled for replacement next week. Please use the other treadmills.",
        createdAt: "2023-04-09T09:10:00Z"
      }
    ]
  }
];
