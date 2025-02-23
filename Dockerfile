FROM nginx:1.27-alpine3.21

RUN apk add openssl
RUN mkdir -p /etc/nginx/ssl/
RUN openssl req -x509 -days 100 -nodes -newkey rsa:2048 -keyout /etc/nginx/ssl/self.key -out /etc/nginx/ssl/self.crt -subj "/C=IN/ST=AP/L=HYD/O=KAR/OU=MINE/CN=hostecode.com"
COPY ./nginx-conf/dhparam.pem /etc/nginx/ssl/dhparam.pem
COPY ./nginx-conf/default.conf /etc/nginx/conf.d/default.conf
RUN ls -l /etc/nginx/ssl/

COPY dist/ /usr/share/nginx/html
RUN ls -l /usr/share/nginx/html
