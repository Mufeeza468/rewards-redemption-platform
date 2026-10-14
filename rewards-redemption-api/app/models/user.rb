class User < ApplicationRecord
  has_many :redemptions
  has_many :rewards, through: :redemptions

  validates :name, presence: true
end
