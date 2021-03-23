FROM node:12-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app/
#COPY package*.json ./
COPY . ./
USER node
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
