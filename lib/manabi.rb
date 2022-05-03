# frozen_string_literal: true

require 'redis'
require_relative 'manabi/topic'
require_relative 'manabi/deck/redis_set'

# Service for collecting and choosing topics to learn about.
module Manabi
  def self.create_deck(deck_id)
    raise ArgumentError, "'#{deck_id}' is not a valid id" unless /\A\w*\z/.match?(deck_id)

    Deck::RedisSet.new(Redis.new, key: deck_id)
  end

  def self.create_topics(*arr)
    arr.map { |str| Topic.new(str) }
  end
end
