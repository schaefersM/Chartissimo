FROM node:12-alpine
LABEL   maintainer="Maximilian Schaefers" \
        github="schaefersM"
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app/
COPY . ./
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]