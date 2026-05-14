function parseBadgeDate(dateText) {
  const m = String(dateText || "").match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (!m) return 0;
  return new Date(`${m[3]}-${m[2]}-${m[1]}`).getTime();
}

function renderPlacesTable() {
  let panel = document.getElementById("placesTablePanel");

  if (!panel) {
    panel = document.createElement("div");
    panel.id = "placesTablePanel";
    panel.innerHTML = `
      <div class="places-table-header">
        <span>מקומות בהם טיילתי עם יעל</span>
        <button id="placesTableToggle" type="button">הסתר</button>
      </div>
      <div id="placesTableBodyWrap">
        <table class="places-table">
          <thead>
            <tr>
              <th>תאריך</th>
              <th>יעל</th>
              <th>שם</th>
              <th>אתר</th>
              <th>פוסט</th>
            </tr>
          </thead>
          <tbody id="placesTableBody"></tbody>
        </table>
      </div>
    `;
    document.body.appendChild(panel);

	document.getElementById("placesTableToggle").onclick = function () {
	  const wrap = document.getElementById("placesTableBodyWrap");
	  const hidden = wrap.style.display === "none";

	  wrap.style.display = hidden ? "block" : "none";
	  this.textContent = hidden ? "הסתר" : "הצג";

	  panel.classList.toggle("collapsed", !hidden);
	  panel.style.top = "";
	  panel.style.left = "";
	  panel.style.right = "10px";
	  panel.style.bottom = "25px";
	};
	makePlacesTableDraggable(panel);
  }

  const tbody = document.getElementById("placesTableBody");
  tbody.innerHTML = "";

  const rows = [...badgePointRows].sort((a, b) => {
    return parseBadgeDate(b.date) - parseBadgeDate(a.date);
  });

  rows.forEach(row => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${escapeHtml(row.date || "")}</td>
      <td>${escapeHtml(row.badgeNo || "")}</td>
      <td>${escapeHtml(row.name || "")}</td>
      <td>${escapeHtml(row.place || "—")}</td>
      <td>${
        row.fbUrl
          ? `<a href="${escapeHtml(row.fbUrl)}" target="_blank" rel="noopener noreferrer">פייסבוק</a>`
          : ""
      }</td>
    `;

    tr.onclick = function (e) {
      if (e.target.tagName.toLowerCase() === "a") return;

      if (row.latlng && row.marker) {
        map.setView(row.latlng, 15);
        //row.marker.openPopup();
      }
    };

    tbody.appendChild(tr);
  });
}
function makePlacesTableDraggable(panel) {
  const header = panel.querySelector(".places-table-header");
  if (!header) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  header.style.cursor = "move";

  header.addEventListener("mousedown", function (e) {
    if (e.target.tagName.toLowerCase() === "button") return;

    isDragging = true;

    const rect = panel.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    startLeft = rect.left;
    startTop = rect.top;

    panel.style.left = `${startLeft}px`;
    panel.style.top = `${startTop}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";

    e.preventDefault();
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    panel.style.left = `${startLeft + dx}px`;
    panel.style.top = `${startTop + dy}px`;
  });

  document.addEventListener("mouseup", function () {
    isDragging = false;
  });
}