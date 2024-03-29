export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alb_album: {
        Row: {
          alb_created_at: string
          alb_description: string | null
          alb_id: string
          alb_image_ref: string | null
          alb_name: string
          alb_updated_at: string
        }
        Insert: {
          alb_created_at?: string
          alb_description?: string | null
          alb_id?: string
          alb_image_ref?: string | null
          alb_name: string
          alb_updated_at?: string
        }
        Update: {
          alb_created_at?: string
          alb_description?: string | null
          alb_id?: string
          alb_image_ref?: string | null
          alb_name?: string
          alb_updated_at?: string
        }
        Relationships: []
      }
      anl_analytics: {
        Row: {
          anl_created_at: string
          anl_id: string
          anl_key: string
          anl_updated_at: string
          anl_value: string
        }
        Insert: {
          anl_created_at?: string
          anl_id?: string
          anl_key: string
          anl_updated_at?: string
          anl_value: string
        }
        Update: {
          anl_created_at?: string
          anl_id?: string
          anl_key?: string
          anl_updated_at?: string
          anl_value?: string
        }
        Relationships: []
      }
      mct_music_category: {
        Row: {
          mct_descricao: string | null
          mct_id: string
          mct_name: string
        }
        Insert: {
          mct_descricao?: string | null
          mct_id?: string
          mct_name: string
        }
        Update: {
          mct_descricao?: string | null
          mct_id?: string
          mct_name?: string
        }
        Relationships: []
      }
      msc_music: {
        Row: {
          msc_album: string | null
          msc_category: string | null
          msc_created_at: string
          msc_description: string | null
          msc_files_ref: string | null
          msc_id: string
          msc_main_ref: string | null
          msc_meta: Json
          msc_name: string
          msc_updated_at: string
          msc_user_id: string
        }
        Insert: {
          msc_album?: string | null
          msc_category?: string | null
          msc_created_at: string
          msc_description?: string | null
          msc_files_ref?: string | null
          msc_id?: string
          msc_main_ref?: string | null
          msc_meta: Json
          msc_name: string
          msc_updated_at?: string
          msc_user_id: string
        }
        Update: {
          msc_album?: string | null
          msc_category?: string | null
          msc_created_at?: string
          msc_description?: string | null
          msc_files_ref?: string | null
          msc_id?: string
          msc_main_ref?: string | null
          msc_meta?: Json
          msc_name?: string
          msc_updated_at?: string
          msc_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "msc_music_mct_music_category_mct_id_fk"
            columns: ["msc_category"]
            isOneToOne: false
            referencedRelation: "mct_music_category"
            referencedColumns: ["mct_id"]
          },
          {
            foreignKeyName: "msc_music_msc_album_fkey"
            columns: ["msc_album"]
            isOneToOne: false
            referencedRelation: "alb_album"
            referencedColumns: ["alb_id"]
          },
          {
            foreignKeyName: "msc_music_msc_main_ref_fkey"
            columns: ["msc_main_ref"]
            isOneToOne: false
            referencedRelation: "msc_music"
            referencedColumns: ["msc_id"]
          }
        ]
      }
      tct_tool_category: {
        Row: {
          tct_descricao: string | null
          tct_id: string
          tct_name: string
          tct_order: number
        }
        Insert: {
          tct_descricao?: string | null
          tct_id?: string
          tct_name: string
          tct_order: number
        }
        Update: {
          tct_descricao?: string | null
          tct_id?: string
          tct_name?: string
          tct_order?: number
        }
        Relationships: []
      }
      too_tools: {
        Row: {
          too_category: string
          too_descricao: string | null
          too_id: string
          too_image_ref: string | null
          too_name: string
          too_order: number
          too_url: string
        }
        Insert: {
          too_category: string
          too_descricao?: string | null
          too_id?: string
          too_image_ref?: string | null
          too_name: string
          too_order: number
          too_url: string
        }
        Update: {
          too_category?: string
          too_descricao?: string | null
          too_id?: string
          too_image_ref?: string | null
          too_name?: string
          too_order?: number
          too_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "too_tools_tct_tool_category_tct_id_fk"
            columns: ["too_category"]
            isOneToOne: false
            referencedRelation: "tct_tool_category"
            referencedColumns: ["tct_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Category:
        | "diversos"
        | "cd-jovem"
        | "hinario"
        | "infantil"
        | "semana-santa"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
