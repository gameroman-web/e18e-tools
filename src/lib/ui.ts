const elements = {
  pkgInput: document.getElementById("pkgInput") as HTMLInputElement,
  limitInput: document.getElementById("limitInput") as HTMLInputElement,
  devCheckbox: document.getElementById("devCheckbox") as HTMLInputElement,
  searchBtn: document.getElementById("searchBtn") as HTMLButtonElement,
  searchIcon: document.getElementById("searchIcon") as SVGSVGElement &
    HTMLElement,
  loadingIcon: document.getElementById("loadingIcon") as SVGSVGElement &
    HTMLElement,
  errorBox: document.getElementById("errorBox") as HTMLDivElement,
  resultsArea: document.getElementById("resultsArea") as HTMLDivElement,
  resultsTableBody: document.getElementById(
    "resultsTableBody",
  ) as HTMLTableElement,
  emptyState: document.getElementById("emptyState") as HTMLDivElement,
  trafficHeader: document.getElementById(
    "trafficHeader",
  ) as HTMLTableCellElement,
  versionHeader: document.getElementById(
    "versionHeader",
  ) as HTMLTableCellElement,
  progressBar: document.getElementById("progressBar") as HTMLDivElement,
  percentLabel: document.getElementById("percentLabel") as HTMLSpanElement,
  statusLabel: document.getElementById("statusLabel") as HTMLSpanElement,
  progressIndicator: document.getElementById(
    "progressIndicator",
  ) as HTMLDivElement,
  totalStats: document.getElementById("totalStats") as HTMLDivElement,
  copyMarkdownBtn: document.getElementById(
    "copyMarkdownBtn",
  ) as HTMLButtonElement,
  copyBuffer: document.getElementById("copyBuffer") as HTMLTextAreaElement,
};

function setLoading(val: boolean) {
  elements.searchBtn.disabled = val;
  elements.searchIcon.classList.toggle("hidden", val);
  elements.loadingIcon.classList.toggle("hidden", !val);
  elements.progressIndicator.classList.toggle("hidden", !val);
  if (val) {
    elements.errorBox.classList.add("hidden");
  }
}

function updateProgress(percent: number, status: string) {
  elements.progressBar.style.width = `${percent}%`;
  elements.percentLabel.textContent = `${percent}%`;
  elements.statusLabel.textContent = status;
}

function showError(msg: string) {
  elements.errorBox.textContent = msg;
  elements.errorBox.classList.remove("hidden");
  elements.resultsArea.classList.add("hidden");
  elements.emptyState.classList.remove("hidden");
}

export { elements, setLoading, showError, updateProgress };
