FROM node

WORKDIR /EJS/node-first/

COPY . .
RUN npm install

EXPOSE 3000

CMD ["node", "src/index.js"]
