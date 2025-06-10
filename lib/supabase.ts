import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sbnstjnqagcthbnynhum.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNibnN0am5xYWdjdGhibnluaHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzOTkwMzYsImV4cCI6MjA2MDk3NTAzNn0.UOAF64yqb_UU4Eciv68vNX0K9UkRTfr6B-Hs87ZTuYQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
