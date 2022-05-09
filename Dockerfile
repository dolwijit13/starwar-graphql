FROM node:17.5.0-alpine3.15
ENV PORT=3333
EXPOSE 3333
EXPOSE 9229
WORKDIR /usr/src/app
COPY ["package.json", "nx.json", "workspace.json", "./"]
RUN ["yarn", "install"]
COPY . .

RUN ["yarn", "global", "add", "@nrwl/cli", "nx"]
RUN ["nx", "build", "--prod"]
CMD ["nx", "serve"]
