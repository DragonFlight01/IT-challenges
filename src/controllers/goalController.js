export const getCommunityGoalsRecent = async (req, res) => {
  if (process.env.USE_MOCK_DATA === 'true') {
    console.log("Using mock data for community goals");

    const mockGoals = [
      {
        communitygoalName: "Operation Andronicus",
        starsystemName: "Pleiades Sector IR-W d1-55",
        stationName: "The Oracle",
        goalExpiry: "2017-11-09T16:00:00+01:00",
        tierReached: 4,
        tierMax: 0,
        contributorsNum: 408,
        contributionsTotal: 2838230000,
        isCompleted: false,
        lastUpdate: "2017-11-08T14:10:05+01:00",
        goalObjectiveText: "Hand in Pilots Federation Combat Bonds",
        goalRewardText: "",
        goalDescriptionText:
          "With Thargoid attacks becoming a regular occurrence in the Pleiades Nebula, Aegis has leveraged its considerable reserves to fund a military operation in the Pleiades Sector IR-W d1-55. The initiative, dubbed ‘Operation Andronicus’, has been expressly conceived to counter Thargoid aggression in the region.\n\nAdmiral Aden Tanner, Aegis’s chief military liaison, elaborated on the nature of the initiative:\nPersonal-scale craft are particularly effective against Thargoid vessels, not least because of the comparative vulnerability of capital-class ships. I therefore believe the most effective way to address the Thargoid threat – in the short term at least – is a militia of seasoned combat pilots. Aegis has agreed to finance this initiative, which will aim to deliver a strategic blow to the Thargoids in the Pleiades Sector IR-W d1-55.\n\nAegis Research has confirmed that it will reward pilots who hand in Pilots Federation Combat Bonds at The Oracle in the Pleiades Sector IR-W d1-55.",
        inaraURL: "https://inara.cz/galaxy-communitygoals/"
      }
    ];

    const firstGoal = mockGoals?.[0];

    return res.json(firstGoal);
  }

  console.log("Using real data for community goals");

  const payload = {
    header: {
      appName: process.env.APP_NAME,
      appVersion: process.env.APP_VERSION,
      isBeingDeveloped: true,
      APIkey: process.env.API_KEY
    },
    events: [
      {
        eventName: 'getCommunityGoalsRecent',
        eventTimestamp: new Date().toISOString(),
        eventData: {}
      }
    ]
  };

  try {
    const response = await fetch('https://inara.cz/inapi/v1/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    const firstGoal = result.events?.[0]?.eventData?.[0];

    if (!firstGoal) {
      return res.status(404).json({ error: 'No community goals found. (Might be locked out due to heavy usage)' });
    }

    return res.json(firstGoal);

  } catch (error) {
    console.error('Error fetching community goals:', error);
    return res.status(500).json({ error: 'Failed get goals data.' });
  }
};
