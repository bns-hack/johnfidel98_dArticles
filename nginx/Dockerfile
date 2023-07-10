FROM nginx:1.15.12-alpine

ARG DA_HOST

RUN echo -e '''\
server {\n\
    listen 80;\n\
    \n\
    access_log /var/log/nginx/access.log;\n\
    error_log /var/log/nginx/error.log;\n\
    location / {\n\
        proxy_pass http://DA_HOST:3000;\n\
    }\n\
}\n\
''' > /etc/nginx/conf.d/default.conf;

RUN sed -i s/DA_HOST/${DA_HOST}/g /etc/nginx/conf.d/default.conf
