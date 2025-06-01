# 🫱 HelpHands NGO Donation App

A full-stack donation tracking app for NGOs — built with React, Node.js, Express, and MongoDB, containerized with Docker, deployed and hosted using Render and Vercel for backend and frontend respectively. This project showcases DevOps practices like containerization, secrets management, namespaces, manifest-based deployments and CI/CD pipeline.

---

## 🧱 Tech Stack

- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **DevOps**: Docker, Kubernetes, ArgoCD, GitHub
- **Hosting**:
  - Frontend: [Vercel](https://ngo-donation-tracker.vercel.app/)
  - Backend: [Render](https://ngo-donation-tracker-1.onrender.com)
---

## 🚀 Features

- Submit donations (name + amount)
- View total donations
- Fully containerized
- Automated CI/CD pipeline for creation of containers using Argo CD
- Deployed using Render and Vercel

---

## 📦 Local Setup

1. Clone the repository

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
## 🐳 Docker Setup
1. Build Images
```
# Backend
docker build -t ngo-donation-backend ./backend

# Frontend
docker build -t ngo-donation-frontend ./frontend
```
2. Push Images
```
# Backend
docker push hemanandj/ngo-backend

# Frontend
docker push hemanandj/ngo-frontend
```
## ☸️ Kubernetes (KIND) local Deployment
1. Start KIND Cluster
```
kind create cluster --name dev-cluster
```
2. Apply Namespace and Secret
```
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongo-secret.yaml
```
3. Deploy Backend & Frontend
```
kubectl apply -n ngo-app -f k8s/backend-deployment.yaml
kubectl apply -n ngo-app -f k8s/backend-service.yaml
kubectl apply -n ngo-app -f k8s/frontend-deployment.yaml
kubectl apply -n ngo-app -f k8s/frontend-service.yaml
```
4. Enable ArgoCD and connect GitHub repo
```
kubectl apply -f k8s/argo-app.yaml
```
5. Access the App for local preview
```
kubectl port-forward svc/frontend-service 8081:80 -n ngo-donation
kubectl port-forward svc/backend-service 5000:5000 -n ngo-donation

Then open http://localhost:8081
```
## 📂 File Structure

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


## 📌 DevOps Highlights
    
  ✅ Dockerized frontend and backend

  ✅ KIND local cluster setup

  ✅ Secrets management with Secret resource

  ✅ Resource isolation with Namespace

  ✅ Clean Kubernetes manifests

  ✅ CI/CD via ArgoCD 


## 👤 Author License

Hemanand
This project is open source and free to use.
