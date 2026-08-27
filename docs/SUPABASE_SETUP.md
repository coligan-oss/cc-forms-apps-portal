# Supabase Setup — Click Tracking

## 1. Create the table

Run this SQL in your Supabase dashboard (SQL Editor):

```sql
CREATE TABLE app_clicks (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  app_name text NOT NULL,
  clicked_at timestamptz NOT NULL DEFAULT now()
);

-- Index for the rolling 7-day popularity query
CREATE INDEX idx_app_clicks_recent ON app_clicks (clicked_at DESC);
CREATE INDEX idx_app_clicks_name_time ON app_clicks (app_name, clicked_at DESC);
```

## 2. Create a database function for the popularity query

```sql
CREATE OR REPLACE FUNCTION get_popular_apps(days integer DEFAULT 7)
RETURNS TABLE(app_name text, click_count bigint) AS $$
  SELECT app_name, COUNT(*) AS click_count
  FROM app_clicks
  WHERE clicked_at >= now() - (days || ' days')::interval
  GROUP BY app_name
  ORDER BY click_count DESC;
$$ LANGUAGE sql STABLE;
```

## 3. Row Level Security (RLS)

Enable RLS but allow anonymous inserts and reads (this is an internal portal):

```sql
ALTER TABLE app_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (track clicks)
CREATE POLICY "Allow anonymous inserts"
  ON app_clicks FOR INSERT
  WITH CHECK (true);

-- Allow anyone to read (for popularity query)
CREATE POLICY "Allow anonymous reads"
  ON app_clicks FOR SELECT
  USING (true);
```

## 4. Optional: Cleanup old data (run monthly or via cron)

```sql
DELETE FROM app_clicks WHERE clicked_at < now() - interval '30 days';
```

You can set this up as a Supabase cron job (pg_cron extension) or just let data accumulate — the indexed query only looks at 7 days anyway.

## 5. Environment Variables

After setup, add these to your Vercel project environment variables:

- `VITE_SUPABASE_URL` — your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
- `VITE_SUPABASE_ANON_KEY` — your Supabase anon/public key

These are safe to expose client-side since RLS restricts what can be done.
