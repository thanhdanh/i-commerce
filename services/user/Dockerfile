FROM node:14.15.4-alpine3.10 AS builder

WORKDIR /app

COPY package*.json ./
COPY .env ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.15.4-alpine3.10

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

EXPOSE 3000

# ENTRYPOINT [ "/scripts/start.sh" ]
CMD [ "npm", "run", "start:prod" ]