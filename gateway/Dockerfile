FROM node:14.15.4-alpine3.10 As builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14.15.4-alpine3.10

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]