FROM node:alpine

COPY [ "package.json", "yarn.lock*", "./" ]

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN yarn install
RUN yarn add @prisma/client
EXPOSE 8080


RUN yarn prisma migrate deploy
RUN yarn prisma db push --force-reset --accept-data-loss

RUN yarn build
CMD [ "yarn", "start:prod" ]
