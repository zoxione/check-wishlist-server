FROM node:alpine

COPY [ "package.json", "yarn.lock*", "./" ]

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN yarn install
RUN yarn prisma migrate deploy
RUN yarn add @prisma/client
EXPOSE 3000


RUN yarn add global @nestjs/cli
RUN yarn build
CMD [ "yarn", "start:prod" ]