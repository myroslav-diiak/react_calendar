export interface Event {
  id: number,
  title: string,
  description: string,
  time: string,
  date: string,
  year: number,
  month: number,
  day: number,
  createdAt: Date,
  updatedAt?: Date,
};