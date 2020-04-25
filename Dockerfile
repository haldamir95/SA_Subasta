FROM node
COPY node-first node-first/ 
WORKDIR /node-first
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
