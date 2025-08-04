FROM ubuntu:22.04

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN mkdir /node-app

WORKDIR /node-app

COPY package.json .

ENV ACQUIRE_DEPENDENCIES="apt-transport-https ca-certificates curl gnupg git openssh-client build-essential iputils-ping tcpdump net-tools"

ENV SCRIPTING_DEPENDENCIES="jq"

RUN apt update \
  && apt install -y -q --no-install-recommends \
  ${ACQUIRE_DEPENDENCIES} \
  ${SCRIPTING_DEPENDENCIES}

RUN sed -i 's/#net.ipv6.conf.all.forwarding=1/net.ipv6.conf.all.forwarding=1/' /etc/sysctl.conf

RUN sed -i 's/#net.ipv4.ip_forward=1/net.ipv4.ip_forward=1/' /etc/sysctl.conf

RUN sysctl -p

RUN mkdir /usr/local/nvm

ENV NVM_DIR=/usr/local/nvm

ENV NODE_VERSION=23.4.0

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default


ENV NODE_PATH=$NVM_DIR/v$NODE_VERSION/lib/node_modules

ENV PATH=$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install nodemon -g --quiet

RUN rm -rf /etc/localtime

RUN ln -s /usr/share/zoneiinfo/America/Sao_Paulo /etc/localtime

RUN git config --global --add safe.directory /node-app

RUN npm install tsx -g --quiet

EXPOSE 3001

CMD ["tsx", "watch", "--tsconfig", "tsconfig.json", "app.ts"]




