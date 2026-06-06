module Api
  module V1
    class CategoriesController < ApplicationController
      def index
        categories = Category.order(:id)
        render json: categories.map { |c| { id: c.id, name: c.name } }
      end
    end
  end
end
