FROM node:18-bullseye as files
WORKDIR /
COPY . .
RUN npm ci
RUN npm run build

FROM node:18-bullseye
WORKDIR /app
COPY --from=files / .
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]