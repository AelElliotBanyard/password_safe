# Password Safe

## Setup Instructions

Make sure you have Docker installed on your machine. If not, you can download it [here](https://www.docker.com/products/docker-desktop).
In the base directory of the project, add a file called `.env.docker` with the following content:

```env
MONGO_INITDB_ROOT_USERNAME=<your username>
MONGO_INITDB_ROOT_PASSWORD=<your password>
MONGO_INITDB_DATABASE=<your database name>
MONGODB_USER=<your username>
MONGODB_PASSWORD=<your password>
MONGO_PORT=27017
BACKEND_TOKEN_SECRET=<your secret>
BACKEND_ENCRYPTION_KEY=<your key with a length of 32>
BACKEND_ENCRYPTION_IV=<your iv with a length of 16>
```

Then run the following command in the base directory of the project:

```
docker-compose up
```
