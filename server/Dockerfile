FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json .
RUN npm i
COPY . .
ENTRYPOINT ["pm2", "index.js"]