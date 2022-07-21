Gem::Specification.new do |s|
  s.name        = 'manabi'
  s.authors     = 'Lewis Reid'
  s.version     = '0.0.1'
  s.date        = '2022-07-21'
  s.summary     = 'Consumable bookmarks to aid learning'

  s.require_paths = 'lib'
  s.files         = Dir.glob("{bin,lib}/**/*")

  s.required_ruby_version = '>= 2.6'

  s.add_dependency "redis", "~> 4.6"

  s.add_development_dependency 'rspec'
  s.add_development_dependency 'byebug'
  s.add_development_dependency 'rubocop'
  s.add_development_dependency 'rubocop-rspec'
end
