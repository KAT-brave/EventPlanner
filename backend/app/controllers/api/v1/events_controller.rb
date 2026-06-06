module Api
  module V1
    class EventsController < ApplicationController
      before_action :authenticate_user!, only: [:create, :update, :destroy]
      before_action :set_event, only: [:show, :update, :destroy]
      before_action :authorize_user!, only: [:update, :destroy]

      def index
        events = Event.includes(:user, :category)
                      .search(params[:keyword])
                      .by_category(params[:category_id])
                      .sorted(params[:sort])
        render json: events.map { |e| event_response(e) }
      end

      def show
        render json: event_response(@event)
      end

      def create
        event = current_user.events.build(event_params)
        if event.save
          render json: event_response(event), status: :created
        else
          render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @event.update(event_params)
          render json: event_response(@event)
        else
          render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @event.destroy
        head :no_content
      end

      private

      def set_event
        @event = Event.includes(:user, :category).find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "イベントが見つかりません" }, status: :not_found
      end

      def authorize_user!
        unless @event.user_id == current_user.id
          render json: { error: "権限がありません" }, status: :forbidden
        end
      end

      def event_params
        params.permit(:title, :description, :event_date, :start_time, :end_time, :location, :category_id)
      end

      def event_response(event)
        {
          id: event.id,
          title: event.title,
          description: event.description,
          event_date: event.event_date,
          start_time: event.start_time&.strftime("%H:%M"),
          end_time: event.end_time&.strftime("%H:%M"),
          location: event.location,
          category: { id: event.category.id, name: event.category.name },
          user: { id: event.user.id, name: event.user.name },
          created_at: event.created_at
        }
      end
    end
  end
end
