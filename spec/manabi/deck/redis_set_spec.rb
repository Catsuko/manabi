# frozen_string_literal: true

require 'manabi'

RSpec.describe Manabi::Deck::RedisSet, :using_redis do
  let(:deck) { described_class.new(Redis.new, key: 'deck') }
  let(:initial_topics) { %w[snakes ladders].map { |topic| Manabi::Topic.new(topic) } }

  before { deck.add(*initial_topics) unless initial_topics.empty? }

  describe 'adding topics' do
    let(:initial_topics) { [] }
    subject { deck.add(*topics) }

    shared_examples 'topics are added to the deck' do
      it 'adds the topic to the deck' do
        expect { subject }.to change { deck.peek(999) }.to contain_exactly(
          *topics
        )
      end
    end

    context 'single topic' do
      let(:topics) { Manabi::Topic.new('Cats') }

      it_behaves_like 'topics are added to the deck'
    end

    context 'multiple topics' do
      let(:topics) { %w[cats bats rats].map { |topic| Manabi::Topic.new(topic) } }

      it_behaves_like 'topics are added to the deck'
    end
  end

  describe 'taking random topic' do
    subject { deck.take }

    context 'empty deck' do
      let(:initial_topics) { [] }

      it 'returns an empty array' do
        is_expected.to be_empty
      end
    end

    context 'non-empty deck' do
      it 'returns a topic that was added to the deck' do
        expect(initial_topics & subject).not_to be_empty
      end
    end
  end

  describe 'taking topics' do
    subject { deck.take(topic) }

    context 'deck does not include topic' do
      let(:topic) { Manabi::Topic.new('Lobsters') }

      it 'does not change the deck' do
        expect { subject }.not_to(change { deck.peek(999) })
      end
    end

    context 'deck includes the topic' do
      let(:topic) { initial_topics.first }

      it 'removes the topic from the deck' do
        expect { subject }.to change { deck.peek(999) }.to match_array(
          initial_topics.drop(1)
        )
      end
    end
  end

  describe 'peeking at topics' do
    let(:number_to_see) { 5 }

    subject { deck.peek(number_to_see) }

    context 'empty deck' do
      let(:initial_topics) { [] }

      it 'returns an empty array' do
        is_expected.to be_empty
      end
    end

    context 'non-empty deck' do
      it 'returns topics that were added to the deck' do
        is_expected.to match_array(initial_topics)
      end
    end

    context 'only one result' do
      let(:number_to_see) { 1 }

      it 'returns Array' do
        is_expected.to be_kind_of(Array)
      end

      it 'returns only one topic' do
        expect(subject.size).to eq 1
      end
    end
  end

  describe 'size' do
    subject { deck.size }

    context 'empty deck' do
      let(:initial_topics) { [] }

      it { is_expected.to be_zero }
    end

    context 'non-empty deck' do
      it { is_expected.to eq initial_topics.size }
    end
  end
end
