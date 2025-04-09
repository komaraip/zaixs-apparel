FROM node:18-alpine

WORKDIR /app

COPY package* .

RUN npm i --legacy-peer-deps

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "dev"]