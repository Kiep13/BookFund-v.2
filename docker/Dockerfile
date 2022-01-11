FROM postgres:12.2
LABEL maintainer="nina.smirnova.mailbox@gmail.com"
ENV POSTGRES_PASSWORD=root \
    POSTGRES_USER=root
EXPOSE 5432
ADD ./init.sql /docker-entrypoint-initdb.d
RUN chmod a+r /docker-entrypoint-initdb.d/*

