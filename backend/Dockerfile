FROM node:18-bullseye
WORKDIR /
COPY . .
RUN npm ci
EXPOSE 5001
ENTRYPOINT [ "npm", "run", "start" ]