module Api
  module V1
    class AuthController < ApplicationController
      def signup
        user = User.new(signup_params)
        if user.save
          token = ::JsonWebToken.encode(user_id: user.id)
          render json: { token: token, user: user_response(user) }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def login
        user = User.find_by(email: params[:email].to_s.downcase)
        if user&.authenticate(params[:password])
          token = ::JsonWebToken.encode(user_id: user.id)
          render json: { token: token, user: user_response(user) }
        else
          render json: { error: "メールアドレスまたはパスワードが正しくありません" }, status: :unauthorized
        end
      end

      def guest_login
        guest = User.find_or_create_by(email: "guest@example.com") do |u|
          u.name = "ゲストユーザー"
          u.password = SecureRandom.urlsafe_base64
          u.guest = true
        end
        token = ::JsonWebToken.encode(user_id: guest.id)
        render json: { token: token, user: user_response(guest) }
      end

      private

      def signup_params
        params.permit(:name, :email, :password, :password_confirmation)
      end

      def user_response(user)
        { id: user.id, name: user.name, email: user.email, guest: user.guest }
      end
    end
  end
end
