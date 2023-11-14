FROM node:latest
WORKDIR /game-frontend
COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["npm", "start"]
