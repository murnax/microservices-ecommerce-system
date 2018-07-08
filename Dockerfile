FROM mhart/alpine-node:9.11

MAINTAINER murnax <suratin.elec@gmail.com>

RUN mkdir /app
WORKDIR /app

RUN npm install -g pm2@3.0.0 typescript@2.6 tslint mocha yarn

ADD ./package.json .
ADD ./yarn.lock .
RUN yarn

RUN ls

# ENTRYPOINT ["pm2", "start", "app.js"]

# CMD ["pm2", "start", "app.js"]