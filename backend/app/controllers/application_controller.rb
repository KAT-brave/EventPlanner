class ApplicationController < ActionController::API
  private

  def authenticate_user!
    token = request.headers["Authorization"]&.split(" ")&.last
    decoded = ::JsonWebToken.decode(token)
    if decoded
      @current_user = User.find_by(id: decoded[:user_id])
    end
    render json: { error: "認証が必要です" }, status: :unauthorized unless @current_user
  end

  def current_user
    @current_user
  end
end
