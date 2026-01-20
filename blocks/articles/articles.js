export default async function decorate(block) {
  const baseUrl = block.dataset.url || '/articles.json';
  const pageSize = 20;
 
  function render(data) {
 
    const ul = document.createElement('ul');
    ul.className = 'articles';
 
    data.forEach((article) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href = "${article['link']}">
            <img src="${article['image']}" alt="${article['title']}" />
        </a>
        <h3>${article['title']}</h3>
        <p>${article['description']}</p>
      `;
      ul.appendChild(li);
    });
 
    block.replaceChildren(ul);
  }
 
  async function loadData(page = 0) {
    const url = `${baseUrl}?limit=${pageSize}&offset=${page * pageSize}`;
 
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error();
      const json = await response.json();
 
      render(json.data, page, loadData);
    } catch {
      block.innerHTML = '<p>Error loading articles data.</p>';
    }
  }
 
  loadData();
}