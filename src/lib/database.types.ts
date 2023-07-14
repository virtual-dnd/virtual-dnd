export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          avatar: string | null
          created_at: string | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'groups_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      players: {
        Row: {
          admin: boolean | null
          avatar: string | null
          created_at: string | null
          group_id: number | null
          id: number
          nickname: string | null
          pronouns: string | null
          user_id: string | null
        }
        Insert: {
          admin?: boolean | null
          avatar?: string | null
          created_at?: string | null
          group_id?: number | null
          id?: number
          nickname?: string | null
          pronouns?: string | null
          user_id?: string | null
        }
        Update: {
          admin?: boolean | null
          avatar?: string | null
          created_at?: string | null
          group_id?: number | null
          id?: number
          nickname?: string | null
          pronouns?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'players_group_id_fkey'
            columns: ['group_id']
            referencedRelation: 'groups'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'players_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          }
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string | null
          display_name: string | null
          id: string
          online: boolean | null
          profile_banner: string | null
          pronouns: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          display_name?: string | null
          id: string
          online?: boolean | null
          profile_banner?: string | null
          pronouns?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string
          online?: boolean | null
          profile_banner?: string | null
          pronouns?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
