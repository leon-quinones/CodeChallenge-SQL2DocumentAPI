FROM node:23.5.0-alpine3.20 as prod
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js" ]