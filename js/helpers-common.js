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

  const lowerMap = {};
  Object.keys(props).forEach(k => {
    lowerMap[k.toLowerCase()] = k;
  });

  for (const key of candidates) {
    const actual = lowerMap[String(key).toLowerCase()];
    if (actual && props[actual] != null) return props[actual];
  }

  return "";
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

  const lon = parseFloat(g.coordinates[0]);
  const lat = parseFloat(g.coordinates[1]);

  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;

  return L.latLng(lat, lon);
}
function formatPopupDate(dateText) {
  if (!dateText) return "";

  const m = String(dateText).match(/^(\d{2})-(\d{2})-(\d{4})$/);

  if (!m) return dateText;

  return `${parseInt(m[1], 10)}/${parseInt(m[2], 10)}/${m[3].slice(-2)}`;
}