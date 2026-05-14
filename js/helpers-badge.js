function extractPointDetailsFromDescription(html) {
  const text = String(html || "");

  function getValue(label) {
    const re = new RegExp("<b>\\s*" + label + "\\s*:\\s*<\\/b>\\s*([^<]*)", "i");
    const m = text.match(re);
    return m ? m[1].trim() : "";
  }

  const fbMatch = text.match(/<a[^>]+href=['"]([^'"]*facebook\.com[^'"]*)['"]/i);

  return {
    name: getValue("שם"),
    date: getValue("תאריך"),
    place: getValue("אתר") || getValue("מקום"),
    id: getValue("ID"),
    fbUrl: fbMatch ? fbMatch[1] : ""
  };
}