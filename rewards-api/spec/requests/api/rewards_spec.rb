require 'rails_helper'

RSpec.describe "Rewards API", type: :request do
  before do
    create_list(:reward, 3)
  end

  it "returns a list of rewards" do
    get "/api/rewards"
    expect(response).to have_http_status(:ok)
    expect(JSON.parse(response.body).size).to eq(3)
  end
end
