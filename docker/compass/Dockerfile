FROM ruby:2.3.1
RUN gem install compass -v 1.0.3
RUN apt-get update && apt-get install -y inotify-tools
RUN mkdir /uidev
WORKDIR /uidev
COPY ./compile-css.sh /usr/local/bin/compile-css
RUN chmod +x /usr/local/bin/compile-css
CMD compile-css
