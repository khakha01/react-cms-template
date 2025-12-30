export type Book = {
  id: string;
  title: string;
  isbn: string;
  published_year: number;
  status: 'available' | 'loaned'
  created_at: string;
  updated_at: string;
  created_by?: {
    email: string;
  };
  updated_by?: {
    email: string;
  };
};