# ub-cloud-computing-docker

A very simple web application (to-do list) to presenting the use of docker containers

## Run production build

To build and start an application, run the following command:

```bash
docker compose -f docker-compose.yml up --build
```

or following deprecated command:

```bash
docker-compose -f docker-compose.yml up --build
```

The application is available at [localhost:3000](http://localhost:3000)

## Run development build

To run an application with watch mode, run the following command:

```bash
docker compose -f docker-compose.dev.yml up --build
```

or following deprecated command:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

The application is available at [localhost:3003](http://localhost:3003)

## Other commands

To initialize an empty project, you can run the following commands:

```bash
mkdir -p ~/CodeGit/ub-cloud-computing-docker/frontend ~/CodeGit/ub-cloud-computing-docker/database
docker run -it --name ub-cloud-computing-docker-init --mount type=bind,source=/home/pablo/CodeGit/ub-cloud-computing-docker/frontend,target=/app node bash -c "git init --initial-branch=main /app && npx create-next-app@latest /app"
```
