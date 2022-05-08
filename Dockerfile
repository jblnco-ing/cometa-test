FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY .env.local ./.env.local

CMD ["yarn","dev"]
