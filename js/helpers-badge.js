function extractPointDetailsFromDescription(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html || "";

  function getValue(label) {
    const text = temp.innerHTML;
    const re = new RegExp(`<b>\\s*${label}\\s*:\\s*<\\/b>\\s*([^<]*)`, "i");
    const m = text.match(re);
    return m ? m[1].trim() : "";
  }

  const fbLink = Array.from(temp.querySelectorAll("a"))
    .map(a => a.getAttribute("href") || "")
    .find(href => /facebook\.com/i.test(href)) || "";

  return {
    name: getValue("שם"),
    date: getValue("תאריך"),
    place: getValue("מקום") ||  getValue("אתר"),
	id: getValue("ID"),
    fbUrl: fbLink
  };
}
function extractImageHtml(descriptionHtml) {
  if (!descriptionHtml) return "";

  const match = String(descriptionHtml).match(/<img\b[^>]*>/i);

  return match ? match[0] : "";
}