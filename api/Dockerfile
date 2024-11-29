FROM python:3.12-bookworm AS data

WORKDIR app

COPY data/requirements.txt .

RUN python3 -m pip install -r requirements.txt

COPY data/. .
RUN python3 main.py

FROM node:20-alpine3.20 AS dependencies
WORKDIR /app

COPY package.json package-lock.json .
RUN npm install

FROM node:20-alpine3.20
EXPOSE 3001

WORKDIR /app
USER node

COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=data /app/data.json .
COPY . .

CMD ["node", "src/index.js"]
