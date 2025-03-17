# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-slim
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/server.js .
COPY --from=build /app/package.json .
RUN npm install --production --silent
EXPOSE 8080
CMD ["node", "server.js"]
