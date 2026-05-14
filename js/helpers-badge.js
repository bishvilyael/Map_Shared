function extractPointDetailsFromDescription(html) {

  const fbMatch = String(html || "").match(
    /<a[^>]+href=['"]([^'"]*facebook\.com[^'"]*)['"]/i
  );

  const fbLink = fbMatch ? fbMatch[1] : "";

  return {
    name: extractHtmlField(html, "שם"),
    date: extractHtmlField(html, "תאריך"),
    place:
      extractHtmlField(html, "אתר") ||
      extractHtmlField(html, "מקום"),
    id: extractHtmlField(html, "ID"),
    fbUrl: fbLink
  };
}