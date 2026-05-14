function extractPointDetailsFromDescription(html) {
  const text = String(html || "");

  function getValue(label) {
    const re = new RegExp("<b>\\s*" + label + "\\s*:\\s*<\\/b>\\s*([^<]*)", "i");
    const m = text.match(re);
    return m ? m[1].trim() : "";
  }

  const fbMatch = text.match(/<a[^>]+href=['"]([^'"]*facebook\.com[^'"]*)['"]/i);

return {
  name: extractHtmlField(html, "שם"),
  date: extractHtmlField(html, "תאריך"),
  place: extractHtmlField(html, "אתר") || extractHtmlField(html, "מקום"),
  id: extractHtmlField(html, "ID"),
  fbUrl: fbLink
};
}