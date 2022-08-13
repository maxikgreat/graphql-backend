# syntax:docker/dockerfile:1

FROM node:16.14 AS base

WORKDIR /graphql-backend
COPY ["package.json", "yarn.lock*", "./"]

FROM base AS development
RUN yarn install --frozen-lockfile
COPY . .
CMD ["yarn", "start:dev"]

FROM base AS production
RUN yarn install --frozen-lockfile --production
COPY . .
RUN yarn add @nestjs/cli
RUN yarn build
CMD ["yarn", "start:prod"]
