# frozen_string_literal: true

module Manabi
  module Deck
    # Deck implementation using a redis set, topics are unordered and unique.
    class RedisSet
      def initialize(redis, key:)
        @redis = redis
        @key = key
      end

      def add(*topics)
        raise ArgumentError, 'Only topics can be added' unless all_topics?(topics)

        topics.tap { @redis.sadd(@key, topics) unless topics.empty? }
      end

      def take(*topics)
        if topics.empty?
          @redis.spop(@key, 1).map { |topic_str| Topic.new(topic_str) }
        else
          raise ArgumentError, 'Only topics can be taken' unless all_topics?(topics)

          topics.tap { @redis.srem(@key, topics) }
        end
      end

      def peek(number)
        raise ArgumentError, 'n must be positive' unless number.positive?

        @redis.srandmember(@key, number).map { |topic_str| Topic.new(topic_str) }
      end

      def size
        @redis.scard(@key)
      end

      private

      def all_topics?(topics)
        topics.all? { |topic| topic.is_a?(Topic) }
      end
    end
  end
end
