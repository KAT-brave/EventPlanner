class Event < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :title, presence: true, length: { maximum: 100 }
  validates :event_date, presence: true
  validates :start_time, presence: true
  validate :end_time_after_start_time

  scope :search, ->(keyword) {
    where("title LIKE ? OR description LIKE ?", "%#{keyword}%", "%#{keyword}%") if keyword.present?
  }
  scope :by_category, ->(category_id) {
    where(category_id: category_id) if category_id.present?
  }
  scope :sorted, ->(order) {
    order(event_date: order == "desc" ? :desc : :asc)
  }

  private

  def end_time_after_start_time
    return unless start_time && end_time
    errors.add(:end_time, "は開始時間より後に設定してください") if end_time <= start_time
  end
end
