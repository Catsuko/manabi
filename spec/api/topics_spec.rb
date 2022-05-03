# frozen_string_literal: true

require 'sinatra'
require 'api'

RSpec.describe 'Deck Topics Resource', :using_redis, type: :api do
  let(:app) { Sinatra::Application }
  let(:deck_id) { 'test' }
  let(:deck) { Manabi.create_deck(deck_id) }
  let(:resource_path) { "/decks/#{deck_id}/topics" }
  let(:parsed_body) { JSON.parse(subject.body) }

  describe 'GET' do
    let(:number) { 2 }
    let(:topics) { Manabi.create_topics(*%w[cats dogs]) }

    subject { get(resource_path, number: number) }

    before { deck.add(*topics) }

    it { expect(subject.status).to eq 200 }
    it { expect(parsed_body).to match_array(topics) }
  end

  describe 'POST' do
    let(:topics_input) { 'RAT' }

    subject { post(resource_path, topics: topics_input) }

    it { expect(subject.status).to eq 200 }
    it { expect(parsed_body).to contain_exactly(topics_input) }

    it 'topic is added to the deck' do
      expect { subject }.to change { deck.peek(1) }.from([]).to Manabi.create_topics(topics_input)
    end
  end

  describe 'DELETE' do
    let(:topics) { Manabi.create_topics('snake') }

    before { deck.add(*topics) }

    shared_examples 'topic is deleted' do
      it { expect(subject.status).to eq 200 }
      it { expect(parsed_body).to match_array(topics) }

      it 'topic is removed from the deck' do
        expect { subject }.to change { deck.peek(topics.size) }.to([])
      end
    end

    context 'off the top of the deck' do
      subject { delete(resource_path) }

      it_behaves_like 'topic is deleted'
    end

    context 'specific topics' do
      subject { delete(resource_path, topics: topics.map(&:to_s)) }

      it_behaves_like 'topic is deleted'
    end
  end
end
