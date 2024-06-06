export const FindIndexByName = (name: string) => {
  return refs.findIndex((ref) => ref.name === name);
};

export const refs = [
  {
    name: "invite 1 friends",
    reward: 25000,
    threshold: 1,
  },
  {
    name: "invite 3 friends",
    reward: 50000,
    threshold: 3,
  },
  {
    name: "invite 10 friends",
    reward: 200000,
    threshold: 10,
  },
  {
    name: "invite 25 friends",
    reward: 250000,
    threshold: 25,
  },
  {
    name: "invite 50 friends",
    reward: 300000,
    threshold: 50,
  },
  {
    name: "invite 100 friends",
    reward: 500000,
    threshold: 100,
  },
  {
    name: "invite 500 friends",
    reward: 2000000,
    threshold: 500,
  },
  {
    name: "invite 1000 friends",
    reward: 2500000,
    threshold: 1000,
  },
  {
    name: "invite 10000 friends",
    reward: 10000000,
    threshold: 10000,
  },
  {
    name: "invite 100000 friends",
    reward: 100000000,
    threshold: 100000,
  },
];
