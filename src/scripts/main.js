import bookmarks from '../data/bookmarks.json';
import { getIconForApp } from './icons.js';
import { trackClick, getPopularApps } from './supabase.js';

/**
 * Renders all bookmark sections into the #portal container.
 * The "Most Popular" section is sorted by real-time 7-day click data.
 */
async function renderPortal() {
  const portal = document.getElementById('portal');
  if (!portal) return;

  // Fetch popularity data before rendering
  const popularity = await getPopularApps();

  bookmarks.sections.forEach((section) => {
    const sectionEl = document.createElement('section');
    sectionEl.className = `section section--${section.id}`;
    sectionEl.setAttribute('aria-label', section.title);

    // Section heading with green accent bar
    const headingWrap = document.createElement('div');
    headingWrap.className = 'section__heading';

    const heading = document.createElement('h2');
    heading.className = 'section__title';
    heading.textContent = section.title;
    headingWrap.appendChild(heading);

    sectionEl.appendChild(headingWrap);

    const grid = document.createElement('div');
    grid.className = 'section__grid';

    // Sort "Most Popular" by real click data if available
    let items = [...section.items];
    if (section.id === 'most-popular' && popularity.length > 0) {
      items = sortByPopularity(items, popularity);
    }

    items.forEach((item) => {
      grid.appendChild(createAppCard(item, section.id === 'whats-new'));
    });

    sectionEl.appendChild(grid);
    portal.appendChild(sectionEl);
  });
}

/**
 * Sorts items by their click count from the popularity data.
 * Items not in the popularity data go to the end (preserving original order).
 */
function sortByPopularity(items, popularity) {
  // Build a map: app_name (lowercase) -> rank (lower = more popular)
  const rankMap = new Map();
  popularity.forEach((entry, index) => {
    rankMap.set(entry.app_name.toLowerCase(), index);
  });

  return items.sort((a, b) => {
    const rankA = rankMap.has(a.name.toLowerCase())
      ? rankMap.get(a.name.toLowerCase())
      : 9999;
    const rankB = rankMap.has(b.name.toLowerCase())
      ? rankMap.get(b.name.toLowerCase())
      : 9999;
    return rankA - rankB;
  });
}

/**
 * Creates a single app card element with click tracking.
 */
function createAppCard(item, isNew = false) {
  const link = document.createElement('a');
  link.className = 'app-card';
  link.href = item.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Open ${item.name}`);

  // Track click (fire-and-forget, doesn't delay navigation)
  link.addEventListener('click', () => {
    trackClick(item.name);
  });

  const card = document.createElement('div');
  card.className = 'app-card__surface';

  // Icon
  const iconWrap = document.createElement('div');
  iconWrap.className = 'app-card__icon';
  iconWrap.innerHTML = getIconForApp(item.name);
  card.appendChild(iconWrap);

  // Name
  const nameEl = document.createElement('span');
  nameEl.className = 'app-card__name';
  nameEl.textContent = item.name;
  card.appendChild(nameEl);

  // NEW badge
  if (isNew) {
    const badge = document.createElement('span');
    badge.className = 'app-card__badge';
    badge.textContent = 'NEW';
    badge.setAttribute('aria-label', 'New application');
    card.appendChild(badge);
  }

  link.appendChild(card);
  return link;
}

// Initialize
renderPortal();
