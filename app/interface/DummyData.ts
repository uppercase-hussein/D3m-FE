interface TableRowItem {
  id: number;
  year: number;
  userGain: number;
  userLost: number;
  outletName: string;
}

export const dummyData: TableRowItem[] = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
    outletName: "Wimpey Branch",
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
    outletName: "Food Court Branch",
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
    outletName: "Rumuokwurushi Branch",
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
    outletName: "Choba Branch",
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
    outletName: "Trans-Amadi Branch",
  },
];
