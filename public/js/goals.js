window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/goals');
    const goal = await response.json();

    if (!goal || !goal.communitygoalName) {
      console.warn('No valid community goal data received.');
      return;
    }

    document.getElementById('goal-name').textContent = goal.communitygoalName || '';
    document.getElementById('goal-sector').textContent = goal.starsystemName || '';
    document.getElementById('goal-station').textContent = goal.stationName || '';
    document.getElementById('goal-tier').textContent = goal.tierReached ?? '-';
    document.getElementById('goal-expiry').textContent = goal.goalExpiry || '';

  } catch (error) {
    console.error('Error fetching community goals:', error);
  }
});
