FROM node:20.11.1

WORKDIR /src

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npm run build

COPY dist/ ./dist/

CMD [ "npm", "run" ]  