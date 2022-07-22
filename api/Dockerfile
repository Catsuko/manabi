FROM ruby:2.7.6-slim

WORKDIR /api

COPY . /api

RUN apt-get -y update
RUN apt-get install -y build-essential
RUN apt-get -y install git
RUN apt-get -y install make
RUN gem install bundler:2.2.28
RUN bundle config --global without development test
RUN bundle install

EXPOSE 4567

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "4567"]
