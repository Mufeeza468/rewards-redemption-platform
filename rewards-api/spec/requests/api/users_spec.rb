require 'rails_helper'

RSpec.describe "Users API", type: :request do
  let!(:user) { create(:user, points: 150) }
  let!(:reward) { create(:reward, cost: 100) }

  describe "GET /api/users/:id/points" do
    it "returns the user's point balance" do
      get "/api/users/#{user.id}/points"
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to include("points" => 150)
    end
  end

  describe "POST /api/users/:id/redeem" do
    context "with enough points" do
      it "redeems the reward and deducts points" do
        expect {
          post "/api/users/#{user.id}/redeem", params: { reward_id: reward.id }
        }.to change { Redemption.count }.by(1)
        expect(response).to have_http_status(:ok)
        expect(user.reload.points).to eq(50)
      end
    end

    context "with insufficient points" do
      before { user.update(points: 50) }

      it "does not redeem and returns error" do
        post "/api/users/#{user.id}/redeem", params: { reward_id: reward.id }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)).to include("success" => false)
        expect(user.reload.points).to eq(50)
      end
    end
  end

  describe "GET /api/users/:id/redemptions" do
    before do
      Redemption.create!(user: user, reward: reward)
    end

    it "returns redemption history" do
      get "/api/users/#{user.id}/redemptions"
      expect(response).to have_http_status(:ok)
      data = JSON.parse(response.body)
      expect(data.first["reward"]).to eq(reward.title)
    end
  end
end
