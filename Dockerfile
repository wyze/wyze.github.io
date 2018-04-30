FROM node:8 as base

ARG GITHUB_TOKEN

WORKDIR /usr/src

COPY . .
RUN yarn && yarn build

FROM scratch
COPY --from=base /usr/src/public /public
