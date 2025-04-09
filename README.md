# Barangay Attendance System

A web-based attendance tracking system for barangay officials, integrating:
- PHP backend
- MySQL database
- React frontend

## Features
- Official management (add/view officials)
- Attendance recording (time in/out)
- Status tracking (present, late, on leave)
- Attendance history viewing

## Setup Instructions

### Database Setup
1. Create MySQL database using the schema in `database/schema.sql`
2. Update database credentials in `database/db_connect.php`

### Backend Setup
1. Ensure PHP is installed (version 7.4 or higher recommended)
2. Configure your web server to point to the project root
3. Enable mod_rewrite for URL routing

### Frontend Setup
1. Navigate to the `frontend` directory
2. Install dependencies: `npm install`
3. Build the React app: `npm run build`
4. The built files will be in `frontend/dist/`

### Running the Application
1. Start your web server (Apache/Nginx)
2. Access the application through your browser
3. Default URL: `http://localhost`

## Project Structure
- `database/`: Contains database schema and connection files
- `backend/`: PHP API endpoints and server-side logic
- `frontend/`: React application components and services
- `index.php`: Main application entry point

## Dependencies
- PHP 7.4+
- MySQL 5.7+
- Node.js 14+ (for frontend development)
- React 18+
