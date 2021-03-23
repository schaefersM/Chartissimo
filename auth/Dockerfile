FROM node:12-alpine
LABEL   maintainer="Maximilian Schaefers" \
        github="schaefersM" \
        description="Provides Nodemon Node.js Environment inside a Docker Container" \
        note="updates all files (.env included) automatically" \
        files_to_watch="Can be change in package.json" \
        files_watched="server.js and .env"
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app/
COPY package.json .
USER node
RUN npm update && npm install --save
EXPOSE 4000
CMD ["npm", "run", "start.absolute"]