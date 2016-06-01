class Character < ActiveRecord::Base
  validates :level, presence: true, numericality: {only_integer: true}
  validates :race, presence: true
  validates :charclass, presence: true
  validates :zone, presence: true
  validates :guild, presence: true
end
