function extractPointDetailsFromDescription(html) {
  const temp = document.createElement("div");
  temp.innerHTML = html || "";

  function getValue(label) {
    const bolds = Array.from(temp.querySelectorAll("b"));

    for (const b of bolds) {
      const labelText = (b.textContent || "").trim();

      if (labelText === `${label}:`) {
        let value = "";

        let node = b.nextSibling;

        while (node) {
          if (node.nodeName === "BR") break;

          value += node.textContent || "";

          node = node.nextSibling;
        }

        return value.trim();
      }
    }

    return "";
  }

  const fbLink = Array.from(temp.querySelectorAll("a"))
    .map(a => a.getAttribute("href") || "")
    .find(href => /facebook\.com/i.test(href)) || "";

  return {
    name: getValue("שם"),
    date: getValue("תאריך"),
    place: getValue("אתר") || getValue("מקום"),
    id: getValue("ID"),
    fbUrl: fbLink
  };
}