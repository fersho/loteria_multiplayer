FROM node:15.4.0-alpine3.10

RUN apk update && \
    apk upgrade && \
    apk add bash

COPY ./boot.sh /srv/

WORKDIR /srv/

CMD ["/bin/bash", "boot.sh"]
