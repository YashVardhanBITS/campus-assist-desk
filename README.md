
# Campus Help Desk - Online Help Desk System

A comprehensive intranet-based application for managing and tracking service requests for various campus facilities. This system streamlines the workflow between request creators and facility staff.

## Features

- User authentication (login/register/password change)
- Request creation and tracking
- Facility management
- Role-based access control (students, faculty, facility-heads, assignees)
- Status tracking for service requests
- Comment system for updates
- Dashboard with statistics
- Help documentation

## Project Setup

### Prerequisites

- Node.js (v14 or above)
- npm (comes with Node.js)

### Installation and Running Locally

1. Clone this repository:
```bash
git clone https://github.com/your-username/campus-help-desk.git
cd campus-help-desk
```

2. Install the dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## How It Works

### User Roles

- **Students/Faculty/Staff**: Can create new requests, track their requests, and close their own requests
- **Facility Heads**: Can view all requests for their facility and assign them to staff members
- **Assignees**: Can update the status of requests assigned to them
- **Admin**: Can manage users, facilities, and view all requests

### Testing Credentials

For testing, you can use these dummy accounts:

- **Student**: john@campus.edu / password123
- **Faculty**: jane@campus.edu / password123
- **Admin**: admin@campus.edu / admin123
- **Facility Head**: lab@campus.edu / password123
- **Maintenance Staff**: maintenance@campus.edu / password123

### Backend Integration

This frontend project is designed to be integrated with a custom backend API. The current version uses dummy data for demonstration purposes. When implementing your backend:

1. Edit the service files in `src/services/api.js` to point to your actual API endpoints
2. Uncomment the API call code that's currently commented in each function
3. Update the authentication mechanism to work with your backend

## Project Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main page components
- `/src/context`: React context for state management
- `/src/services`: API service functions
- `/src/utils`: Utility functions
- `/src/data`: Dummy data (for demonstration)

## License

This project is licensed under the MIT License.
