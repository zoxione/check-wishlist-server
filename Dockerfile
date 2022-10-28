FROM node:alpine AS builder

WORKDIR /app

COPY [ "package.json", "yarn.lock*", "./" ]
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN yarn build

FROM node:alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD [ "yarn", "start:migrate:prod" ]