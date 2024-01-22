# FROM node:latest
# WORKDIR /game-frontend
# COPY package.json .

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 8081

# CMD ["npm", "start"]

FROM registry.gitlab.inria.fr/diverse/docker/docker-image/insa-nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/game-frontend /usr/share/nginx/html

EXPOSE 8080
