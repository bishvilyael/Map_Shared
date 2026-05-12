function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}
function extractDriveFileId(url) {
  if (!url) return null;

  let m = url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/i);
  if (m) return m[1];

  m = url.match(/drive\.google\.com\/uc\?[^"' ]*id=([A-Za-z0-9_-]+)/i);
  if (m) return m[1];

  m = url.match(/drive\.google\.com\/thumbnail\?[^"' ]*id=([A-Za-z0-9_-]+)/i);
  if (m) return m[1];

  m = url.match(/lh3\.googleusercontent\.com\/d\/([A-Za-z0-9_-]+)/i);
  if (m) return m[1];

  return null;
}
function convertDriveUrl(url) {
  const fileId = extractDriveFileId(url);
  return fileId ? `https://lh3.googleusercontent.com/d/${fileId}=w1000` : url;
}
function getPropCaseInsensitive(props, candidates) {
  if (!props) return "";

  for (const key of candidates) {
    if (Object.prototype.hasOwnProperty.call(props, key) && props[key] != null) {
      return props[key];
    }
  }
  function getFeatureName(props) {
  return String(
    getPropCaseInsensitive(props, ["name", "Name", "NAME", "title", "Title"]) || "ללא שם"
  ).trim();
}
function getFeatureDescription(props) {
  return String(
    getPropCaseInsensitive(props, ["description", "Description", "DESCRIPTION", "desc", "Desc"]) || ""
  );
}
function getFeatureLatLng(feature) {
  const g = feature && feature.geometry;

  if (!g || g.type !== "Point" || !Array.isArray(g.coordinates) || g.coordinates.length < 2) {
    return null;
  }