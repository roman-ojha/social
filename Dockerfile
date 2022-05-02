FROM node:14.17.0-alpine

WORKDIR /user/src/server

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn","--ignore-platform","dev"]