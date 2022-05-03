# frozen_string_literal: true

require 'byebug'
require 'manabi'
require 'redis'
require 'rack/test'

RSpec.configure do |config|
  config.include Rack::Test::Methods, type: :api

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.example_status_persistence_file_path = 'spec/examples.txt'
  config.warnings = true

  config.before(:each, :using_redis) do
    Redis.new.flushdb
  end
end
