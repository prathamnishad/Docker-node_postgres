FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

COPY . /app

EXPOSE 4000

RUN npm install

CMD ["node","docker.js"]