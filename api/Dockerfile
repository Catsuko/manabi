FROM ruby:2.7.6-slim

WORKDIR /api

COPY . .

RUN bundle install

EXPOSE 80

CMD ["bundle exec rackup --host 0.0.0.0 -p 4567"]
