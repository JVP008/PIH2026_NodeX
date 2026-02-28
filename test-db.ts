import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
    console.log('Testing Supabase Connection...')
    console.log('URL:', supabaseUrl)

    try {
        const { data, error } = await supabase
            .from('contractors')
            .select('count')
            .limit(1)

        if (error) {
            console.error('Connection Failed:', error.message)
            process.exit(1)
        }

        console.log('Connection Successful! Contractor count query works.')
        console.log('Data:', data)
    } catch (err) {
        if (err instanceof Error) {
            console.error('Unexpected Error:', err.message)
        } else {
            console.error('Unexpected Error:', String(err))
        }
        process.exit(1)
    }
}

testConnection()
