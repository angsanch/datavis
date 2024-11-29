FROM node:20-alpine3.20 AS dependencies
WORKDIR /app

COPY package.json package-lock.json .
RUN npm install

FROM denoland/deno:2.1.2
EXPOSE 5173

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

CMD ["deno", "task", "dev", "--host"]
