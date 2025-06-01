# Use Node.js image for building React app
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Install dependencies and build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve using nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
