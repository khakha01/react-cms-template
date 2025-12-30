export type Category = {
  id: string;
  parent_id: string | null;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  created_by?: {
    email: string;
  };
  updated_by?: {
    email: string;
  };
};