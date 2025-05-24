# 🫱 HelpHands NGO Donation App

A full-stack donation tracking app for NGOs — built with React, Node.js, Express, and MongoDB, containerized with Docker, and deployed using Kubernetes (KIND). This project showcases DevOps practices like containerization, secrets management, namespaces, and manifest-based deployments.

---

## 🧱 Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **DevOps:** Docker, Kubernetes (KIND), Secrets, Namespaces

---

## 🚀 Features

- Submit donations (name + amount)
- View total donations
- Fully containerized
- Deployed on Kubernetes with KIND

---

## 📦 Local Setup

### 1. Clone the repository

```
git clone https://github.com/hemanand24/NGO-Donation-Tracker.git
cd ngo-donation-app
```
2. Backend Setup
Install dependencies
```
cd backend
npm install
```
Environment variables

Create a .env file:

MONGO_URI=your_mongodb_uri_here
PORT=5000

Start server
```
npm start
```
3. Frontend Setup
```
cd frontend
npm install
npm start
```
🐳 Docker Setup
Build Images
```
# Backend
docker build -t ngo-donation-backend ./backend

# Frontend
docker build -t ngo-donation-frontend ./frontend
```
☸️ Kubernetes (KIND) Deployment
1. Start KIND Cluster
```
kind create cluster --name dev-cluster
```
2. Apply Namespace and Secret
```
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/secret.yaml
```
3. Deploy Backend & Frontend
```
kubectl apply -n ngo-app -f k8s/backend-deployment.yaml
kubectl apply -n ngo-app -f k8s/backend-service.yaml
kubectl apply -n ngo-app -f k8s/frontend-deployment.yaml
kubectl apply -n ngo-app -f k8s/frontend-service.yaml
```
4. Access the App

To access the frontend:
```
kubectl port-forward svc/ngo-donation-frontend-service 3000:80 -n ngo-app

Then open http://localhost:3000
```
📂 File Structure

.
├── backend/
│   ├── server.js
│   ├── models/
│   │   └── Donation.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── public/
│       └── index.html
├── k8s/
│   ├── namespace.yaml
│   ├── secret.yaml
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   └── frontend-service.yaml
└── README.md

📌 DevOps Highlights
    
  ✅ Dockerized frontend and backend

  ✅ KIND local cluster setup

  ✅ Secrets management with Secret resource

  ✅ Resource isolation with Namespace

  ✅ Clean Kubernetes manifests


