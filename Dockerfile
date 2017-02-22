FROM jkilbride/node-npm-alpine:6

ENV SRC_DIR /tmp/src

COPY . $SRC_DIR

WORKDIR $SRC_DIR

RUN apk add --update tini bash && \
  addgroup -S node && \
  adduser -h /app -S -g -D node node && \
  npm i -g yarn && \
  yarn && \
  NODE_ENV=production yarn run build && \
  mv dist/* /app && \
  mv node_modules /app/ && \
  chown -R node:node /app && \
  apk del bash && \
  rm -rf /tmp/* /var/cache/apk/*

WORKDIR /app

USER node

RUN npm prune --production && \
  npm cache clean && \
  yarn cache clean

EXPOSE 3000

CMD ["yarn", "start"]

ENTRYPOINT ["/sbin/tini", "--"]
