FROM mhart/alpine-node:9.11

RUN mkdir /app
WORKDIR /app

RUN npm install -g  pm2@3.0.0 typescript@2.6 tslint mocha yarn

ADD ./package.json .
ADD ./yarn.lock .
RUN yarn

ADD ./entrypoint.sh .
RUN chmod +x /app/entrypoint.sh
