# Notes Application - MERN Stack

A simple, fully functional notes application built with the MERN stack (MongoDB, Express, React + Vite, Node.js).

## Features

- ✅ Create, Read, Update, Delete (CRUD) notes
- ✅ Simple and clean UI with Tailwind CSS
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ RESTful API
- ✅ MongoDB persistence
- ✅ Docker support (no docker-compose needed)

## Project Structure

```
.
├── client/              # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── api.js
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
└── server/              # Express + Mongoose backend
    ├── models/
    │   └── Note.js
    ├── routes/
    │   └── notes.js
    ├── server.js
    ├── Dockerfile
    ├── package.json
    └── .env.example
```

## Technology Stack

### Frontend

- **React 18+** - UI library with functional components and hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Tailwind CSS** - Utility-first CSS framework

### Backend

- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **Node.js** - Runtime environment
- **CORS** - Cross-origin resource sharing

### Database

- **MongoDB** - NoSQL database

## Prerequisites

- Docker and Docker CLI installed
- No need for Node.js/npm/MongoDB locally (everything runs in containers)

## Quick Start with Docker

### 1. Create Docker Network

```bash
docker network create notes-network
```

### 2. Run MongoDB Container

```bash
docker run -d --name mongo --network notes-network -p 27017:27017 mongo:7
```

### 3. Build Docker Images

```bash
docker build -f client/Dockerfile -t notes-client ./client
docker build -f server/Dockerfile -t notes-server ./server
```

### 4. Run Application Containers

```bash
docker run -d --name server --network notes-network -e MONGO_URI=mongodb://mongo:27017/notesdb -p 5000:5000 notes-server
docker run -d --name client --network notes-network -p 3000:80 notes-client
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## API Endpoints

All endpoints are prefixed with `/api/notes`

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| GET    | `/`      | Get all notes       |
| POST   | `/`      | Create a new note   |
| GET    | `/:id`   | Get a specific note |
| PUT    | `/:id`   | Update a note       |
| DELETE | `/:id`   | Delete a note       |

### Request/Response Examples

**Create Note (POST /api/notes)**

```json
{
  "title": "My First Note",
  "content": "This is the content of my note"
}
```

**Response**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My First Note",
  "content": "This is the content of my note",
  "createdAt": "2024-11-20T10:30:00.000Z",
  "updatedAt": "2024-11-20T10:30:00.000Z"
}
```

## Local Development (without Docker)

### Prerequisites

- Node.js 20+
- MongoDB running locally

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
npm start
```

Backend runs on http://localhost:5000

### Frontend Setup

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Frontend runs on http://localhost:3000

## Environment Variables

### Frontend (client/.env)

```
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env)

```
MONGO_URI=mongodb://localhost:27017/notesdb
```

## Docker Cleanup

To stop and remove all containers and the network:

```bash
# Stop containers
docker stop client server mongo

# Remove containers
docker rm client server mongo

# Remove network
docker network rm notes-network

# Remove images (optional)
docker rmi notes-client notes-server
```

## File Descriptions

### Backend

- **server/server.js** - Express app initialization, MongoDB connection, routes setup
- **server/models/Note.js** - Mongoose schema for Note document
- **server/routes/notes.js** - CRUD route handlers for notes
- **server/Dockerfile** - Single-stage Docker build for server

### Frontend

- **client/src/App.jsx** - Main React component with routing
- **client/src/main.jsx** - React DOM entry point
- **client/src/api.js** - Axios instance and API service methods
- **client/src/pages/HomePage.jsx** - List all notes
- **client/src/pages/NewNotePage.jsx** - Create new note form
- **client/src/pages/EditNotePage.jsx** - Edit existing note form
- **client/src/components/NoteCard.jsx** - Note card component
- **client/Dockerfile** - Multi-stage Docker build for client

## Notes

- The application does **not** require authentication
- MongoDB data is persisted in the container volume (data lost when container is removed)
- For production, use MongoDB Atlas or a persistent volume
- The frontend CORS is configured to accept requests from any origin

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB container is running: `docker ps | grep mongo`
- Check network: `docker network inspect notes-network`

### Frontend Cannot Reach Backend

- Verify backend container is running: `docker ps | grep server`
- Check VITE_API_URL matches backend URL
- Ensure both containers are on the same network

### Port Already in Use

```bash
# Find process using port (Linux/Mac)
lsof -i :3000
lsof -i :5000
lsof -i :27017

# On Windows, use netstat
netstat -ano | findstr :3000
```

## License

MIT
