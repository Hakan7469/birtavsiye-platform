export interface Tavsiye {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  highlighted_text: any;
  is_flagged?: boolean;
  is_reviewed?: boolean;
  review_notes?: string;
}
