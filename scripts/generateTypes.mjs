import { exec } from 'child_process'

function generateTypes() {
  exec(
    `npx supabase gen types typescript --project-id ${
      import.meta.env.VITE_SUPABASE_PROJECT_ID
    } --schema "public" > "../src/lib/database.types.ts"`
  )
}

generateTypes()
