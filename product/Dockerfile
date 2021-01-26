FROM node:12 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts/start.sh ./scripts/start.sh

RUN ["chmod", "+x", "/scripts/start.sh"]

EXPOSE 3000

ENTRYPOINT [ "/scripts/start.sh" ]