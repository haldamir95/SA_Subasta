FROM node

WORKDIR /EJS/node-first/

COPY . .
RUN npm install

EXPOSE 5000

CMD ["node", "src/index.js"]
