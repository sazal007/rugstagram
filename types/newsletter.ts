export type Subscriber = {
  id: number;
  email: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
};

export type SubscriberResponse = Subscriber[];
