class Api::RewardsController < ApplicationController
  def index
    rewards = Reward.all
    render json: rewards
  end
end
