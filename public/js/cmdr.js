document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("searchCMDR-button");
  const input = document.getElementById("searchCMDR-input");

  async function fetchCommander(name) {
    try {
      const response = await fetch("/api/cmdr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchName: name }),
      });

      const data = await response.json();
      const cmdr = data;

      if (!cmdr || !cmdr.commanderName) {
        throw new Error("Commander not found.");
      }

      const ranksArray = cmdr.commanderRanksPilot || [];
    const ranks = Object.fromEntries(ranksArray.map(rank => [rank.rankName, rank.rankValue]));

    document.getElementById("cmdr-name").textContent = cmdr.commanderName || "-";
    document.getElementById("cmdr-combat").textContent = ranks.combat ?? "-";
    document.getElementById("cmdr-trade").textContent = ranks.trade ?? "-";
    document.getElementById("cmdr-exploration").textContent = ranks.exploration ?? "-";
    document.getElementById("cmdr-empire").textContent = ranks.empire ?? "-";
    document.getElementById("cmdr-federation").textContent = ranks.federation ?? "-";

    document.getElementById("cmdr-role").textContent = cmdr.preferredGameRole || "-";
    document.getElementById("cmdr-url").textContent = cmdr.inaraURL || "#";
    document.getElementById("cmdr-url").href = cmdr.inaraURL || "#";

    } catch (error) {
      console.error("Error fetching commander:", error);
      alert("Commander not found or error occurred.");
    }
  }

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (name) fetchCommander(name);
  });
});