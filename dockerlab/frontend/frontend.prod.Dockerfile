FROM node

WORKDIR /app

COPY package.json package-lock.json ./
RUN ["npm", "ci"]

ARG DATABASE_URI
ARG DATABASE_PASSWORD
ARG DATABASE_USERNAME
ARG PORT

COPY app ./app
COPY public ./public
COPY next.config.js ./
COPY tsconfig.json ./
COPY component ./component
COPY layout ./layout
COPY lib ./lib

RUN ["npm", "run", "build"]

CMD ["npm", "run", "start"]
