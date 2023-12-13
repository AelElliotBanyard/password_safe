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

## Owsap Top 10 Risk Rating

### A01:2017-Injection:

Our application is not vulnerable to injection attacks, because we use prepared statements for all database queries.

### A02:2017-Broken Authentication:

Our application is not vulnerable to broken authentication, because we use JWTs for authentication and refresh tokens for refreshing the JWTs.

### A03:2017-Sensitive Data Exposure:

Our application is not vulnerable to sensitive data exposure, because we use encryption for all sensitive data.

### A04:2017-XML External Entities (XXE):

Our application is not vulnerable to XXE, because we do not use XML.

### A05:2017-Broken Access Control:

Our application is not vulnerable to broken access control, because we use JWTs for authentication and refresh tokens for refreshing the JWTs.

### A06:2017-Security Misconfiguration:

Our application is not vulnerable to security misconfiguration, because we use the default configuration of the used frameworks.

### A07:2017-Cross-Site Scripting (XSS):

Our application is not vulnerable to XSS, because we use the React framework, which automatically escapes all user input.

### A08:2017-Insecure Deserialization:

Our application is not vulnerable to insecure deserialization, because we do not use deserialization.

### A09:2017-Using Components with Known Vulnerabilities:

Our application is not vulnerable to using components with known vulnerabilities, because we use the default configuration of the used frameworks.

### A10:2017-Insufficient Logging & Monitoring:

Our application is not vulnerable to insufficient logging & monitoring, because we use the default configuration of the used frameworks.

### Summary

Our application is not vulnerable to any of the OWASP Top 10 Risks.
