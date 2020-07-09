from node:14.5.0

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000/tcp

ENTRYPOINT [ "npm", "start" ]

