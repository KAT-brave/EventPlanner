Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      get "health", to: "health#show"

      post "auth/signup", to: "auth#signup"
      post "auth/login", to: "auth#login"
      post "auth/guest_login", to: "auth#guest_login"
    end
  end
end
