export default function decorate(block) {
  const links = [...block.querySelectorAll('.button-container a')];
  const ul = document.createElement('ul');
  ul.className = 'social-links';

  links.forEach((a) => {
    const href = a.href;

    let platform = 'generic';
    if (href.includes('instagram.com')) platform = 'instagram';
    if (href.includes('x.com')) platform = 'twitter';
    if (href.includes('facebook.com')) platform = 'facebook';

    const li = document.createElement('li');
    li.className = `social-link ${platform}`;

    // reuse existing anchor
    a.textContent = '';
    a.setAttribute('aria-label', platform);

    li.appendChild(a);
    ul.appendChild(li);
  });

  block.innerHTML = '';
  block.appendChild(ul);
}
