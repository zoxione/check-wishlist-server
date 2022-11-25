import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://cserfwfqoxxsyqezqezy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZXJmd2Zxb3h4c3lxZXpxZXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcwNjkwNzEsImV4cCI6MTk4MjY0NTA3MX0.xjpsIOyZx5FtFLxZheXdSX3_AbEM0t5orMlAT1I_nk0'

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)