FROM node:14.17.0-alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY ./ ./
EXPOSE 3000
CMD ["yarn","start"]