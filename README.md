# Password Safe

## Setup Instructions

Make sure you have Docker installed on your machine. If not, you can download it [here](https://www.docker.com/products/docker-desktop).
In the base directory of the project, add a file called `docker.env` with the following content:

```
MONGO_INITDB_ROOT_USERNAME:<your username>
MONGO_INITDB_ROOT_PASSWORD:<your password>
MONGO_INITDB_DATABASE:<your database name>
MONGODB_USER:<your username>
MONGODB_PASSWORD:<your password>
MONGO_PORT:27017
```

Then run the following command in the base directory of the project:

```
docker-compose up
```
