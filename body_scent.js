document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
  initOrderPage();
  initAdminPage();
});

async function initProductPage() {
  const filterBar = document.getElementById('filter-bar');
  const productList = document.getElementById('product-list');

  if (!productList) return;

  try {
    const response = await fetch('products.json');
    const products = await response.json();

    // Mood list
    const moods = [
      { id: 'all', label: 'ทั้งหมด' },
      { id: 'fresh', label: 'Fresh (สดชื่น)' },
      { id: 'sweet', label: 'Sweet (หวานละมุน)' },
      { id: 'confident', label: 'Confident (มั่นใจ)' },
      { id: 'romance', label: 'Romance (โรแมนติก)' }
    ];

    // Read URL Query param
    const urlParams = new URLSearchParams(window.location.search);
    let activeMood = urlParams.get('mood') || 'all';

    // Render Filter Tabs
    if (filterBar) {
      filterBar.innerHTML = moods.map(m => `
        <button class="tab-btn ${m.id === activeMood ? 'active' : ''}" onclick="filterProducts('${m.id}')">
          ${m.label}
        </button>
      `).join('');
    }

    // Function to render products
    window.filterProducts = (moodId) => {
      activeMood = moodId;
      
      // Update Tab CSS
      if (filterBar) {
        const buttons = filterBar.querySelectorAll('.tab-btn');
        buttons.forEach((btn, idx) => {
          btn.classList.toggle('active', moods[idx].id === moodId);
        });
      }

      // Filter Data
      const filtered = moodId === 'all' 
        ? products 
        : products.filter(p => p.mood === moodId);

      // Render Grid
      if (filtered.length === 0) {
        productList.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-secondary);">ไม่พบสินค้าในหมวดหมู่นี้</p>`;
        return;
      }

      productList.innerHTML = filtered.map(p => `
        <div class="product-card">
          <div class="mood-header">
            <span class="mood-dot" style="background-color: var(--mood-${p.mood})"></span>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-text-secondary);">${p.mood}</span>
          </div>
          <h3 class="product-title font-heading">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-footer">
            <div class="product-price">฿${p.price}</div>
            <a href="order.html?item=${encodeURIComponent(p.name)}&price=${p.price}" class="btn btn-outline" style="padding: 0.5rem 1rem;">สั่งซื้อ</a>
          </div>
        </div>
      `).join('');
    };

    // Initial Filter Exec
    window.filterProducts(activeMood);

  } catch (error) {
    console.error('Error loading products:', error);
    if (productList) {
      productList.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">ไม่สามารถโหลดข้อมูลสินค้าได้</p>`;
    }
  }
}

function initOrderPage() {
  const orderForm = document.getElementById('orderForm');
  if (!orderForm) return;

  const urlParams = new URLSearchParams(window.location.search);
  const itemParam = urlParams.get('item') || 'สินค้า Body Scent';
  const priceParam = urlParams.get('price') || '0';

  const itemsInput = document.getElementById('items');
  const totalInput = document.getElementById('total');

  if (itemsInput) itemsInput.value = itemParam;
  if (totalInput) totalInput.value = priceParam;

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newOrder = {
      timestamp: new Date().toLocaleString('th-TH'),
      customerName: document.getElementById('customerName').value,
      contact: document.getElementById('contact').value,
      items: itemsInput.value,
      total: totalInput.value,
      note: document.getElementById('note').value || '-'
    };

    // Save order locally for admin view simulation
    const existingOrders = JSON.parse(localStorage.getItem('ordersList') || '[]');
    existingOrders.unshift(newOrder);
    localStorage.setItem('ordersList', JSON.stringify(existingOrders));

    // Redirect to Thank You page
    window.location.href = 'thankyou.html';
  });
}

function initAdminPage() {
  const ordersTable = document.getElementById('ordersTable');
  if (!ordersTable) return;

  const tbody = ordersTable.querySelector('tbody');
  if (!tbody) return;

  const orders = JSON.parse(localStorage.getItem('ordersList') || '[]');

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem;">ยังไม่มีรายการคำสั่งซื้อในระบบ</td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders.map(order => `
    <tr>
      <td style="white-space: nowrap;">${order.timestamp}</td>
      <td style="font-weight: 500; color: var(--color-text-primary);">${order.customerName}</td>
      <td>${order.contact}</td>
      <td>${order.items}</td>
      <td style="font-weight: 600;">฿${order.total}</td>
      <td>${order.note}</td>
    </tr>
  `).join('');
}