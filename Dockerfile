FROM node:16.17.0
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json .
COPY package-lock.json .
ARG NODE_ENV
RUN npm install
COPY . .
RUN npx prisma generate
ENV PORT 8000
EXPOSE $PORT