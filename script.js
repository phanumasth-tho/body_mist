document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. หน้า product.html
  // ==========================================
  const productList = document.getElementById('product-list');
  const filterBar = document.getElementById('filter-bar');

  if (productList) {
    let allProducts = [];

    // ดึงค่า URL Parameter ?mood=xxx
    const urlParams = new URLSearchParams(window.location.search);
    let activeMood = urlParams.get('mood') || 'ทั้งหมด';

    // โหลดข้อมูลสินค้า
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        allProducts = data;
        setupFilterButtons();
        filterAndRender(activeMood);
      })
      .catch(error => console.error('Error loading products:', error));

    // ฟังก์ชันสร้างปุ่มกรองสินค้า
    function setupFilterButtons() {
      if (!filterBar) return;
      const categories = ['ทั้งหมด', 'Fresh', 'Sweet', 'Confident', 'Romance'];
      
      filterBar.innerHTML = categories.map(mood => `
        <button type="button" class="filter-btn ${mood === activeMood ? 'active' : ''}" data-mood="${mood}">
          ${mood}
        </button>
      `).join('');

      filterBar.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
          const selectedMood = e.target.getAttribute('data-mood');
          filterBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
          e.target.classList.add('active');
          filterAndRender(selectedMood);
        }
      });
    }

    // ฟังก์ชันกรองและแสดงผลการ์ดสินค้า
    function filterAndRender(mood) {
      const filtered = (mood === 'ทั้งหมด') 
        ? allProducts 
        : allProducts.filter(item => item.mood === mood);

      productList.innerHTML = filtered.map(item => {
        // รวมชื่อสินค้าและไซส์เพื่อส่งไปยังหน้า order
        const fullItemName = `${item.name} ${item.size || ''}`.trim();
        const orderUrl = `order.html?item=${encodeURIComponent(fullItemName)}&price=${encodeURIComponent(item.price)}`;

        return `
          <div class="product-card">
            <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" class="product-image">
            <h3 class="product-title">${item.name}</h3>
            <p class="product-size">${item.size || ''}</p>
            <p class="product-price">฿${item.price}</p>
            <a href="${orderUrl}" class="buy-button">สั่งซื้อ</a>
          </div>
        `;
      }).join('');
    }
  }

  // ==========================================
  // 2. หน้า order.html
  // ==========================================
  const orderForm = document.getElementById('orderForm');

  if (orderForm) {
    // อ่านค่า URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const itemParam = urlParams.get('item') || '';
    const priceParam = urlParams.get('price') || '';

    // เติมข้อมูลลงช่อง input อัตโนมัติทันที
    const itemsInput = document.getElementById('items');
    const totalInput = document.getElementById('total');

    if (itemsInput) itemsInput.value = itemParam;
    if (totalInput) totalInput.value = priceParam;

    // จัดการการส่งฟอร์ม
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const payload = {
        customerName: document.getElementById('customerName')?.value || '',
        contact: document.getElementById('contact')?.value || '',
        items: document.getElementById('items')?.value || '',
        total: document.getElementById('total')?.value || '',
        note: document.getElementById('note')?.value || ''
      };

      fetch('https://script.google.com/a/macros/spu.ac.th/s/AKfycbwP9lr-8zv5YovzXOCeFTFnSdXYvxOZLl6l7zZkC2rqWEjg9D4jvzJ9TsBq-uy2OtiW/exec', {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      .then(() => { 
        window.location.href = 'thankyou.html'; 
      })
      .catch(error => {
        console.error(error);
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      });
    });
  }

  // ==========================================
  // 3. หน้า admin.html
  // ==========================================
  const ordersTableBody = document.querySelector('#ordersTable tbody');

  if (ordersTableBody) {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTrF8wKEjnHPmV3VdyOB5JWipmf_ueInB8bPRA4j8MblqCAUVwZlAtDrI6NYFWkZRZfH9l0OVdk5BZI/pub?gid=0&single=true&output=csv';

    fetch(csvUrl)
      .then(response => response.text())
      .then(csvText => {
        const rows = parseCSV(csvText);
        if (rows.length <= 1) {
          ordersTableBody.innerHTML = '<tr><td colspan="6">ไม่พบข้อมูลคำสั่งซื้อ</td></tr>';
          return;
        }

        // ตัด Header (แถวแรก) ออก แล้วกลับลำดับรายการล่าสุดขึ้นก่อน
        const dataRows = rows.slice(1).reverse();

        ordersTableBody.innerHTML = dataRows.map(row => {
          // ป้องกัน Index Out of Bounds
          const date = row[0] || '';
          const name = row[1] || '';
          const contact = row[2] || '';
          const items = row[3] || '';
          const total = row[4] || '';
          const note = row[5] || '';

          return `
            <tr>
              <td>${escapeHTML(date)}</td>
              <td>${escapeHTML(name)}</td>
              <td>${escapeHTML(contact)}</td>
              <td>${escapeHTML(items)}</td>
              <td>${escapeHTML(total)}</td>
              <td>${escapeHTML(note)}</td>
            </tr>
          `;
        }).join('');
      })
      .catch(error => {
        console.error('Error loading CSV:', error);
        ordersTableBody.innerHTML = '<tr><td colspan="6">เกิดข้อผิดพลาดในการโหลดข้อมูล</td></tr>';
      });
  }

  // Helper Function: แปลง CSV ข้อความให้เป็น Array โดยไม่ใช้ Library
  function parseCSV(text) {
    const lines = [];
    let row = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++; // ข้าม อักขระ quote ซ้ำ
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(current.trim());
        current = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') i++;
        row.push(current.trim());
        if (row.length > 1 || row[0] !== '') {
          lines.push(row);
        }
        row = [];
        current = '';
      } else {
        current += char;
      }
    }

    if (current || row.length > 0) {
      row.push(current.trim());
      if (row.length > 1 || row[0] !== '') {
        lines.push(row);
      }
    }

    return lines;
  }

  // Helper Function: ป้องกัน XSS เมื่อนำข้อความมาแสดงผล
  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
