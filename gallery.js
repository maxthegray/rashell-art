/* =====================================================================
   RaShell Art — Gallery
   =====================================================================
   The list of pictures now lives in  artworks.json  and is edited two ways:

     • Rachel (no code):  go to  yoursite.com/admin  and use the visual editor.
     • Max (code):        edit  artworks.json  directly and push to GitHub.

   Either way the grid and the pop-up viewer below rebuild themselves.
   You do not need to edit this file to add or remove pictures.
   ===================================================================== */

(async function () {
  const grid = document.getElementById("gallery");
  if (!grid) return;

  // Load the picture list (edited via /admin or directly in artworks.json)
  let ARTWORKS = [];
  try {
    const res = await fetch("artworks.json", { cache: "no-cache" });
    const data = await res.json();
    ARTWORKS = data.artworks || [];
  } catch (e) {
    grid.innerHTML =
      '<p style="grid-column:1/-1;padding:20px;text-align:center;">' +
      "Couldn't load the gallery list. If you're previewing locally, run a " +
      "local server (e.g. <code>python3 -m http.server</code>) instead of " +
      "opening the file directly.</p>";
    return;
  }

  // ---- Build the thumbnail grid ----
  ARTWORKS.forEach(function (art, i) {
    const item = document.createElement("div");
    item.className = "gallery__item";

    const btn = document.createElement("button");
    btn.className = "gallery__btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "View " + art.title + " larger");
    btn.addEventListener("click", function () { openLightbox(i); });

    const img = document.createElement("img");
    img.src = art.thumb || art.file;
    img.alt = art.title;
    img.loading = "lazy";
    img.addEventListener("error", function () { item.style.display = "none"; });

    btn.appendChild(img);
    item.appendChild(btn);

    const title = document.createElement("p");
    title.className = "gallery__title";
    title.textContent = art.title;
    item.appendChild(title);

    if (art.size) {
      const size = document.createElement("p");
      size.className = "gallery__size";
      size.textContent = art.size;
      item.appendChild(size);
    }

    grid.appendChild(item);
  });

  // ---- Lightbox (replaces the old Highslide plugin) ----
  let current = 0;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML =
    '<button class="lightbox__btn lightbox__close" aria-label="Close">\u00d7</button>' +
    '<button class="lightbox__btn lightbox__prev" aria-label="Previous">\u2039</button>' +
    '<img class="lightbox__img" alt="">' +
    '<button class="lightbox__btn lightbox__next" aria-label="Next">\u203a</button>' +
    '<div class="lightbox__caption"></div>';
  document.body.appendChild(box);

  const lbImg = box.querySelector(".lightbox__img");
  const lbCap = box.querySelector(".lightbox__caption");

  function show(i) {
    current = (i + ARTWORKS.length) % ARTWORKS.length;
    const art = ARTWORKS[current];
    lbImg.src = art.file;
    lbImg.alt = art.title;
    lbCap.innerHTML =
      art.title + (art.size ? " &nbsp;&middot;&nbsp; " + art.size : "") +
      '<span class="count">' + (current + 1) + " of " + ARTWORKS.length + "</span>";
  }
  function openLightbox(i) { show(i); box.classList.add("is-open"); document.body.style.overflow = "hidden"; }
  function closeLightbox() { box.classList.remove("is-open"); document.body.style.overflow = ""; }

  box.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  box.querySelector(".lightbox__prev").addEventListener("click", function () { show(current - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
})();
