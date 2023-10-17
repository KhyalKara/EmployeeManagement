FROM node:18-alpine as builder
WORKDIR /app
COPY package.json package-lock.json .
RUN npm i
RUN npm install pm2@latest -g
COPY . .
ENTRYPOINT ["pm2","start", "index.js", "--no-daemon"]