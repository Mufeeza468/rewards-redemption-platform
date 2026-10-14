class Api::UsersController < ApplicationController
  def points
    user = User.find(params[:id])
    render json: { points: user.points }
  end

  def redeem
    user = User.find(params[:id])
    reward = Reward.find(params[:reward_id])

    if user.points >= reward.cost
      user.points -= reward.cost
      user.save!
      Redemption.create!(user: user, reward: reward)
      render json: { success: true, message: "Reward redeemed!" }
    else
      render json: { success: false, message: "Not enough points." }, status: :unprocessable_entity
    end
  end

  def redemptions
    user = User.find(params[:id])
    history = user.redemptions.includes(:reward).order(created_at: :desc).map do |r|
      {
        reward: r.reward.title,
        redeemed_at: r.created_at
      }
    end
    render json: history
  end
end
