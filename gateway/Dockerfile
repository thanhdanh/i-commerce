FROM node:14.8.0-alpine

RUN mkdir -p /var/www/app
WORKDIR /var/www/app
ADD . /var/www/app

RUN npm install

CMD npm run build && npm run start:prod