# frozen_string_literal: true

require 'manabi'

RSpec.describe Manabi::Topic do
  let(:source_val) { 'Graph Databases' }
  let(:topic) { described_class.new(source_val) }

  describe 'creating a topic' do
    subject { topic }

    context 'from nil' do
      let(:source_val) { nil }

      it { expect { subject }.to raise_error(ArgumentError) }
    end

    context 'from an empty string' do
      let(:source_val) { '' }

      it { expect { subject }.to raise_error(ArgumentError) }
    end

    context 'from a large string' do
      let(:source_val) { 'A' * 256 }

      it { expect { subject }.to raise_error(ArgumentError) }
    end

    context 'from a short string' do
      it { is_expected.to be_kind_of(described_class) }
    end

    context 'from a non string value' do
      let(:source_val) { 1 }

      it { expect { subject }.to raise_error(ArgumentError) }
    end
  end

  describe 'converting to a string' do
    %w[to_s inspect].each do |str_method|
      it 'matches capitlized version of source string' do
        expect(topic.send(str_method)).to eq source_val.upcase
      end
    end
  end
end
