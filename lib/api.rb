# frozen_string_literal: true

require 'sinatra'
require 'sinatra/namespace'
require 'rack/contrib'
require_relative 'manabi'

use Rack::JSONBodyParser

set :default_content_type, :json
set :show_exceptions, :after_handler

# TODO: Remove Duplication in parameter parsing
# TODO: Remove Duplication in route definitions
# TODO: Parameter Validation (required, in bounds etc)
# TODO: Refactor to modular api so each resource can be in a separate file

get '/decks/:id/topics' do |deck_id|
  cache_control :no_store

  deck = Manabi.create_deck(deck_id)
  deck.peek(params[:number].to_i).to_json
end

post '/decks/:id/topics' do |deck_id|
  deck = Manabi.create_deck(deck_id)
  topics = Manabi.create_topics(*params.fetch(:topics, []))
  deck.add(*topics).to_json
end

delete '/decks/:id/topics' do |deck_id|
  deck = Manabi.create_deck(deck_id)
  topics = Manabi.create_topics(*params.fetch(:topics, []))
  deck.take(*topics).to_json
end

error ArgumentError do
  status 400
  { message: env['sinatra.error'].message }.to_json
end
