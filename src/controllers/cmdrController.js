export const getCommanderProfile = async (req, res) => {
  if (process.env.USE_MOCK_DATA === 'true') {
    console.log("Using mock data for cmdr search");

    const mockResponse = [
      {
            "eventStatus": 200,
            "eventData": {
                "userID": 1,
                "userName": "Artie",
                "commanderName": "Artie",
                "commanderRanksPilot": [
                    {
                        "rankName": "combat",
                        "rankValue": "8",
                        "rankProgress": 0
                    },
                    {
                        "rankName": "trade",
                        "rankValue": "13",
                        "rankProgress": 0
                    },
                    {
                        "rankName": "exploration",
                        "rankValue": "8",
                        "rankProgress": 0.01
                    },
                    {
                        "rankName": "cqc",
                        "rankValue": "3",
                        "rankProgress": 0.14
                    },
                    {
                        "rankName": "soldier",
                        "rankValue": "3",
                        "rankProgress": 0.77
                    },
                    {
                        "rankName": "exobiologist",
                        "rankValue": "8",
                        "rankProgress": 0
                    },
                    {
                        "rankName": "empire",
                        "rankValue": "12",
                        "rankProgress": 0.34
                    },
                    {
                        "rankName": "federation",
                        "rankValue": "12",
                        "rankProgress": 1
                    }
                ],
                "preferredAllegianceName": "Independent",
                "commanderMainShip": {
                    "shipType": "federation_corvette",
                    "shipName": "Spectre",
                    "shipIdent": "X-0QAR",
                    "shipRole": ""
                },
                "commanderSquadron": {
                    "squadronID": 5,
                    "squadronName": "Inara Dojo",
                    "squadronMembersCount": 10,
                    "squadronMemberRank": "Squadron commander",
                    "inaraURL": "https://inara.cz/elite/squadron/5/"
                },
                "commanderWing": {
                    "wingID": 5,
                    "wingName": "Inara Dojo",
                    "wingMembersCount": 10,
                    "wingMemberRank": "Squadron commander",
                    "inaraURL": "https://inara.cz/elite/squadron/5/"
                },
                "preferredGameRole": "Freelancer",
                "avatarImageURL": "https://inara.cz/data/users/0/1x3145.jpg",
                "inaraURL": "https://inara.cz/elite/cmdr/1/"
            }
        }
    ];

    const cmdrData = mockResponse?.[0]?.eventData;

    return res.json(cmdrData);
  }

  console.log("Using real data for cmdr");
  const { searchName } = req.body;

  const payload = {
    header: {
      appName: process.env.APP_NAME,
      appVersion: process.env.APP_VERSION,
      isBeingDeveloped: true,
      APIkey: process.env.API_KEY
    },
    events: [
      {
        eventName: 'getCommanderProfile',
        eventTimestamp: new Date().toISOString(),
        eventData: {
          searchName
        }
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
    const cmdrData = result.events?.[0]?.eventData;

    if (!cmdrData) {
      return res.status(404).json({ error: 'Commander not found (Might be locked out due to heavy usage)' });
    }

    res.json(cmdrData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get commander data' });
  }
};
