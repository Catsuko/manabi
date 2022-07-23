FROM ruby:2.7.6-alpine

WORKDIR /api

COPY . /api

RUN apk update
RUN apk add build-base
RUN apk add git
RUN apk add make
RUN gem install bundler:2.2.28
RUN bundle config --global without development test
RUN bundle install

EXPOSE 4567

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "4567"]
