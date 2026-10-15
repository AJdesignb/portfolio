// Header "clock" widget: shows the visitor's local time (ticking) + their city,
// derived from the browser timezone (no permission popup, no external service).

(function () {
  function cityFromTimeZone() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g. "America/Los_Angeles"
      if (!tz) return "";
      const parts = tz.split("/");
      const city = parts[parts.length - 1];        // "Los_Angeles"
      return city.replace(/_/g, " ");               // "Los Angeles"
    } catch (e) {
      return "";
    }
  }

  function formatTime() {
    // 12-hour clock with seconds, e.g. "11:42:08 PM"
    return new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  function start() {
    const timeEl = document.querySelector("[data-clock-time]");
    const cityEl = document.querySelector("[data-clock-city]");
    if (cityEl) cityEl.textContent = cityFromTimeZone();
    if (timeEl) {
      const tick = () => { timeEl.textContent = formatTime(); };
      tick();
      setInterval(tick, 1000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
