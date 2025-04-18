Rails.application.routes.draw do
  namespace :api do
    resources :users, only: [] do
      member do
        get 'points'
        post 'redeem'
        get 'redemptions'
      end
    end

    resources :rewards, only: [:index]
  end
end
