class Reward < ApplicationRecord
  has_many :redemptions
  has_many :users, through: :redemptions

  validates :title, :cost, presence: true
end
