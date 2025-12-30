export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive'
  created_at: string;
  updated_at: string;
  created_by?: {
    email: string;
  };
  updated_by?: {
    email: string;
  };
};