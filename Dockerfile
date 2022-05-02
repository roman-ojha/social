FROM node:14.17.0-alpine AS development

ENV NODE_ENV development

WORKDIR /user/src/server

COPY package.json ./

COPY yarn.lock ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["yarn","start"]