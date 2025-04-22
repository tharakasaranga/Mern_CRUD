# Backend Dockerfile
FROM node:22-alpine3.18

# Create app directory
WORKDIR /app

# Copy server files
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
