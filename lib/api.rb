# frozen_string_literal: true

require 'sinatra'
require 'sinatra/namespace'
require 'rack/contrib'
require 'rack/cors'
require_relative 'manabi'

use Rack::JSONBodyParser
use Rack::Cors do
  allow do
    origins '*'
    resource '*', expose: %w[X-Total-Count], methods: %i[get post delete put patch options header]
  end
end

set :default_content_type, :json
set :show_exceptions, :after_handler

# TODO: Parameter Validation (required, in bounds etc)
# TODO: Improve redis config, see what sidekiq does!

configure do
  uri_str, password = ENV.values_at('REDIS_URI', 'REDIS_PASSWORD')
  Manabi.configure(uri: URI.parse(uri_str), password: password) unless uri_str.nil?
end

namespace '/decks/:id/topics' do
  helpers do
    def deck
      @deck ||= Manabi.create_deck(params.fetch(:id))
    end

    def topics
      Manabi.create_topics(*params.fetch(:topics, []))
    end
  end

  after do
    headers(
      'X-Total-Count' => deck.size
    )
  end

  get do
    cache_control :no_store

    deck.peek(params[:number].to_i).to_json
  end

  post do
    deck.add(*topics).to_json
  end

  delete do
    deck.take(*topics).to_json
  end
end

error ArgumentError do
  status 400
  { message: env['sinatra.error'].message }.to_json
end
