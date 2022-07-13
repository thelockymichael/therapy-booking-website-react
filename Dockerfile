# 1. build the front-end
FROM node:12-alpine AS build-react
RUN mkdir /temp-build
WORKDIR /temp-build
COPY client/package*.json ./
RUN npm install --silent
COPY client/. ./
RUN npm run build


# 2. prepare the back-end
FROM node:12-alpine
RUN mkdir /myApp
WORKDIR /myApp
COPY package*.json /myApp/


RUN npm install --silent


COPY . .

RUN ls -al prisma

RUN npm run generate

RUN npm run build

COPY --from=build-react /temp-build/build/ /myApp/public/

# 3. run this web-application
EXPOSE 3001
ENV NODE_ENV production

CMD ["npm", "run", "start"]