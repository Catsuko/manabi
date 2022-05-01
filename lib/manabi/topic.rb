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

    alias inspect to_s
  end
end
