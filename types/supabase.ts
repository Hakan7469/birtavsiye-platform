export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      recommendations: {
        Row: {
          id: string;
          uuid: string | null;
          title: string | null;
          content: string | null;
          author: string | null;
          created_at: string | null;
          highlighted_text: Json;
          is_flagged: boolean | null;
          is_reviewed: boolean | null;
          review_notes: string | null;
        };
        Insert: {
          id?: string;
          uuid?: string | null;
          title?: string | null;
          content?: string | null;
          author?: string | null;
          created_at?: string | null;
          highlighted_text?: Json;
          is_flagged?: boolean | null;
          is_reviewed?: boolean | null;
          review_notes?: string | null;
        };
        Update: {
          id?: string;
          uuid?: string | null;
          title?: string | null;
          content?: string | null;
          author?: string | null;
          created_at?: string | null;
          highlighted_text?: Json;
          is_flagged?: boolean | null;
          is_reviewed?: boolean | null;
          review_notes?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
