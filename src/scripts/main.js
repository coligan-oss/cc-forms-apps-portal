import bookmarks from '../data/bookmarks.json';
import { getIconForApp } from './icons.js';

/**
 * Renders all bookmark sections into the #portal container.
 */
function renderPortal() {
  const portal = document.getElementById('portal');
  if (!portal) return;

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

    section.items.forEach((item) => {
      grid.appendChild(createAppCard(item, section.id === 'whats-new'));
    });

    sectionEl.appendChild(grid);
    portal.appendChild(sectionEl);
  });
}

/**
 * Creates a single app card element.
 */
function createAppCard(item, isNew = false) {
  const link = document.createElement('a');
  link.className = 'app-card';
  link.href = item.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Open ${item.name}`);

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
