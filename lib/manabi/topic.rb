# frozen_string_literal: true

module Manabi
  # Represents a short description of something that the user wishes to learn.
  class Topic
    def initialize(topic)
      unless topic.is_a?(String) && topic.size.positive? && topic.size < 256
        raise ArgumentError, "'#{topic}' is not a valid topic."
      end

      @topic = topic
    end

    def to_s
      @topic.upcase
    end

    def ==(other)
      to_s == other.to_s.upcase
    end

    def eql?(other)
      other.is_a?(self.class) && to_s == other.to_s
    end

    def hash
      to_s.hash
    end

    alias inspect to_s
    alias equal? eql?
  end
end
