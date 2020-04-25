FROM node

WORKDIR node-first/

COPY . .
RUN npm install

EXPOSE 3000

CMD ["node", "src/index.js"]
