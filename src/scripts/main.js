import bookmarks from '../data/bookmarks.json';

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

    const heading = document.createElement('h2');
    heading.className = 'section__title';
    heading.textContent = section.title;
    sectionEl.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'section__grid';

    section.items.forEach((item) => {
      grid.appendChild(createAppIcon(item, section.id === 'whats-new'));
    });

    sectionEl.appendChild(grid);
    portal.appendChild(sectionEl);
  });
}

/**
 * Creates a single app icon bookmark element.
 */
function createAppIcon(item, showBadge = false) {
  const link = document.createElement('a');
  link.className = 'app-icon';
  link.href = item.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `Open ${item.name}`);

  const tile = document.createElement('div');
  tile.className = 'app-icon__tile';

  // Show the app name inside the tile
  const nameEl = document.createElement('span');
  nameEl.className = 'app-icon__name';
  nameEl.textContent = item.name;
  tile.appendChild(nameEl);

  if (showBadge) {
    const badge = document.createElement('span');
    badge.className = 'app-icon__badge';
    badge.setAttribute('aria-hidden', 'true');
    tile.appendChild(badge);
  }

  link.appendChild(tile);

  return link;
}

// Initialize
renderPortal();
