FROM node:latest

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .

EXPOSE 4000

CMD ["node", "index.js"]