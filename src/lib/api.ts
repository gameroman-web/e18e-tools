import { registryUrl } from "./constants";
import { updateProgress } from "./ui";
import { hash } from "./util";

async function cachedFetch<T>(url: string, options: RequestInit = {}) {
  const hashKey = `fetch:${hash(url + (options.body || ""))}`;
  const cached = localStorage.getItem(hashKey);

  if (cached) {
    const { data, expiry }: { data: T; expiry: number } = JSON.parse(cached);
    if (Date.now() < expiry) return { data, isCached: true as const };
    localStorage.removeItem(hashKey);
  }

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
  const rawData: T = await response.json();

  return {
    data: rawData,
    isCached: false as const,
    commit(processedData: T, ttlMinutes = 10) {
      try {
        const entry = {
          data: processedData,
          expiry: Date.now() + ttlMinutes * 60 * 1000,
        };
        localStorage.setItem(hashKey, JSON.stringify(entry));
      } catch (err) {
        console.error(err);
        Object.keys(localStorage)
          .filter((k) => k.startsWith("fetch:"))
          .forEach((k) => void localStorage.removeItem(k));
      }
    },
  };
}

async function fetchAllStats(names) {
  const combinedStats = {};

  updateProgress(40, `Fetching stats for ${names.length} packages...`);

  const { data } = await cachedFetch(
    `${registryUrl}/_design/downloads/_view/downloads`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keys: names }),
    },
  );

  data.rows.forEach((r) => {
    combinedStats[r.key] = r.value;
  });

  updateProgress(90, "Stats fetch complete.");
  return combinedStats;
}

export { cachedFetch, fetchAllStats };
