FROM node:17.9-alpine3.15 AS development
ENV PORT=3333

WORKDIR /usr/src/app

EXPOSE 3333
EXPOSE 9229

COPY ["package.json", "nx.json", "workspace.json", "./"]

RUN ["yarn", "global", "add", "@nrwl/cli"]
RUN ["yarn", "global", "add", "nx"]
RUN ["yarn", "install"]

COPY . .


RUN ["nx", "build", "--prod"]
ENTRYPOINT ["nx","serve"]
