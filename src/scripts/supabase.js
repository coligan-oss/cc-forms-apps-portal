import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create client if credentials are configured
export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

/**
 * Records a click for the given app name.
 * Fire-and-forget — doesn't block navigation.
 */
export function trackClick(appName) {
  if (!supabase) return;
  supabase
    .from('app_clicks')
    .insert({ app_name: appName })
    .then(({ error }) => {
      if (error) console.warn('Click tracking failed:', error.message);
    });
}

/**
 * Fetches app popularity (click counts) for the last 7 days.
 * Returns an array of { app_name, click_count } sorted by most clicks.
 */
export async function getPopularApps() {
  if (!supabase) return [];
  const { data, error } = await supabase.rpc('get_popular_apps', { days: 7 });
  if (error) {
    console.warn('Failed to fetch popularity:', error.message);
    return [];
  }
  return data || [];
}
