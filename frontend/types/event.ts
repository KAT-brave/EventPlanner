export type Category = {
  id: number;
  name: string;
};

export type EventUser = {
  id: number;
  name: string;
};

export type Event = {
  id: number;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string;
  end_time: string | null;
  location: string | null;
  category: Category;
  user: EventUser;
  created_at: string;
};
