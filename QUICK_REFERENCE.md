# Quick Reference - MERN Notes App

## 🚀 Start Application

```bash
docker start mongo server client
```

## 🛑 Stop Application

```bash
docker stop client server mongo
```

## 🌐 Access Points

- **App**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Health**: http://localhost:5000/api/health

## 📝 API Examples

### Create Note

```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My Note","content":"Note content"}'
```

### Get All Notes

```bash
curl http://localhost:5000/api/notes
```

### Update Note

```bash
curl -X PUT http://localhost:5000/api/notes/{id} \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","content":"Updated content"}'
```

### Delete Note

```bash
curl -X DELETE http://localhost:5000/api/notes/{id}
```

## 📂 Key Files

| File                | Purpose                      |
| ------------------- | ---------------------------- |
| `server/server.js`  | Express server               |
| `client/Dockerfile` | Frontend build (multi-stage) |
| `server/Dockerfile` | Backend build (Alpine)       |
| `README.md`         | Full documentation           |

## 🔧 Rebuild Images

```bash
docker build -f client/Dockerfile -t notes-client ./client
docker build -f server/Dockerfile -t notes-server ./server
```

## 📊 Container Status

```bash
docker ps
```

## 📋 View Logs

```bash
docker logs server    # Backend
docker logs client    # Frontend
docker logs mongo     # Database
```

## 🧹 Clean Up

```bash
docker stop client server mongo
docker rm client server mongo
docker network rm notes-network
docker rmi notes-client notes-server
```

## 💾 Restart Everything from Scratch

```bash
# Stop and remove
docker stop client server mongo
docker rm client server mongo

# Create network
docker network create notes-network

# Start MongoDB
docker run -d --name mongo --network notes-network -p 27017:27017 mongo:7

# Build images
docker build -f client/Dockerfile -t notes-client ./client
docker build -f server/Dockerfile -t notes-server ./server

# Run containers
docker run -d --name server --network notes-network -e MONGO_URI=mongodb://mongo:27017/notesdb -p 5000:5000 notes-server
docker run -d --name client --network notes-network -p 3000:80 notes-client
```

---

**Status**: ✅ All systems operational
**Frontend**: React 18 + Vite + Tailwind
**Backend**: Express + Mongoose
**Database**: MongoDB 7
**Runtime**: Docker
