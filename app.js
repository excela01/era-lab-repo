// app.js - simple static ERA-Lab repository with local upload (localStorage)
const STORAGE_KEY = "era_lab_repo_v1";

// sample initial datasets
const initialDatasets = [
  {
    id: cryptoRandomId(),
    title: "Arsenic in Potable Water Sources in Nigeria",
    category: "Water Quality",
    authors: "Amaefule, E.O. et al.",
    year: 2025,
    summary: "Systematic review and geospatial analysis of arsenic contamination across Nigerian water sources.",
    fileName: null,
    fileDataUrl: null,
  },
  {
    id: cryptoRandomId(),
    title: "Energy Justice and Gender Dimensions in Nigeria’s Renewable Energy Transition",
    category: "Energy Justice",
    authors: "ERA-Lab Research Fellows",
    year: 2024,
    summary: "Examines the gendered and social dimensions of renewable energy policies and access in Ekiti State.",
    fileName: null,
    fileDataUrl: null,
  },
  {
    id: cryptoRandomId(),
    title: "Flood Risk Management and Socioeconomic Resilience in Lagos",
    category: "Climate Adaptation",
    authors: "ERA-Lab Urban Systems Team",
    year: 2025,
    summary: "Community-based mapping and framework development for flood risk and resilience in Lagos metropolis.",
    fileName: null,
    fileDataUrl: null,
  },
];

function cryptoRandomId(){
  return Math.random().toString(36).slice(2,10);
}

// load or init
function loadRepo(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDatasets));
    return initialDatasets.slice();
  }
  try{
    return JSON.parse(raw);
  }catch(e){
    console.error("Failed to parse stored repo", e);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDatasets));
    return initialDatasets.slice();
  }
}

function saveRepo(arr){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

let repo = loadRepo();

// render datasets
const datasetsEl = document.getElementById("datasets");
const searchInput = document.getElementById("searchInput");
const uploadForm = document.getElementById("uploadForm");
const btnExport = document.getElementById("btnExport");
const btnImport = document.getElementById("btnImport");
const importFile = document.getElementById("importFile");
const clearLocal = document.getElementById("clearLocal");

function render(){
  const q = searchInput.value.trim().toLowerCase();
  const filtered = repo.filter(d => !q || d.title.toLowerCase().includes(q) || (d.category||"").toLowerCase().includes(q) || (d.authors||"").toLowerCase().includes(q));
  datasetsEl.innerHTML = "";
  if(filtered.length === 0){
    datasetsEl.innerHTML = `<p class="small">No datasets found.</p>`;
    return;
  }
  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <div class="meta">${escapeHtml(item.authors)} • ${item.year || ""}</div>
      <div class="small" style="margin-bottom:8px">${escapeHtml(item.summary || "")}</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span class="tag">${escapeHtml(item.category || "")}</span>
        <div>
          ${item.fileDataUrl ? `<a class="btn-inline" href="${item.fileDataUrl}" download="${encodeURIComponent(item.fileName || 'download')}">Download</a>` : ""}
          <button class="btn-inline" onclick="viewMeta('${item.id}')">Details</button>
        </div>
      </div>
    `;
    datasetsEl.appendChild(card);
  });
}

function escapeHtml(str = ""){
  return String(str).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

window.viewMeta = function(id){
  const item = repo.find(r => r.id === id);
  if(!item) return alert("Not found");
  alert(`Title: ${item.title}\nAuthors: ${item.authors}\nYear: ${item.year}\nCategory: ${item.category}\n\nSummary:\n${item.summary || "(none)"}`);
}

// upload handler
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const title = data.get("title").trim();
  const category = data.get("category").trim();
  const authors = data.get("authors").trim();
  const year = data.get("year");
  const summary = data.get("summary").trim();
  const file = form.file.files[0];

  let fileDataUrl = null;
  let fileName = null;
  if(file){
    fileName = file.name;
    fileDataUrl = await readFileAsDataURL(file); // base64 data URL
  }

  const newItem = {
    id: cryptoRandomId(),
    title, category, authors, year: Number(year),
    summary, fileName, fileDataUrl
  };

  repo.unshift(newItem);
  saveRepo(repo);
  form.reset();
  render();
});

// helper read
function readFileAsDataURL(file){
  return new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => rej(fr.error);
    fr.readAsDataURL(file);
  });
}

// search
searchInput.addEventListener("input", render);

// clear local
clearLocal.addEventListener("click", () => {
  if(confirm("Clear local repository (this removes all locally saved entries)?")) {
    localStorage.removeItem(STORAGE_KEY);
    repo = loadRepo();
    render();
  }
});

// export JSON backup
btnExport.addEventListener("click", () => {
  const dataStr = JSON.stringify(repo, null, 2);
  const blob = new Blob([dataStr], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "era_lab_repository_backup.json";
  a.click();
  URL.revokeObjectURL(url);
});

// import JSON
btnImport.addEventListener("click", () => importFile.click());
importFile.addEventListener("change", (ev) => {
  const f = ev.target.files[0];
  if(!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const arr = JSON.parse(reader.result);
      if(!Array.isArray(arr)) throw new Error("Invalid format");
      repo = arr;
      saveRepo(repo);
      render();
      alert("Imported repository (remember this is stored locally)");
    }catch(err){
      alert("Failed to import: " + err.message);
    }
  };
  reader.readAsText(f);
});

// initial render
render();
