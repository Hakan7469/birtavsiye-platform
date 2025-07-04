export interface Tavsiye {
  id: string;
  uuid?: string | null;
  title?: string | null;
  content?: string | null;
  author?: string | null;
  created_at?: string | null;
  highlighted_text?: any;
  is_flagged?: boolean | null;
  is_reviewed?: boolean | null;
  review_notes?: string | null;
  like: number;
  dislike: number;
}
