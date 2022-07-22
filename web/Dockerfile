FROM node:18.6-alpine

WORKDIR /web

ENV PATH /web/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

EXPOSE 4568

CMD ["npm", "start"]
