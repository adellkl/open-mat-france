import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://syohdolpoynluqizosmo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5b2hkb2xwb3lubHVxaXpvc21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NjUxMTQsImV4cCI6MjA1NjI0MTExNH0.TGdt-p04srzEndP9EUZqwCc4FSvL2SNhybfyYRSS73U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
}); 