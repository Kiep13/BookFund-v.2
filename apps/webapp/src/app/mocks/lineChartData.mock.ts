const LINE_CHART_LABELS_MOCK = ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8', 'Jan 9', 'Jan 10', 'Jan 11',
  'Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21',
  'Jan 22', 'Jan 23', 'Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28', 'Jan 29', 'Jan 30'];

export const LINE_CHART_DATA_MOCK = {
  labels: LINE_CHART_LABELS_MOCK,
  datasets: [
    {
      label: 'Users',
      data: [296, 759, 1086, 1425, 1630, 516, 1423, 896, 1104, 1160, 1399, 1007, 862, 1995, 1681, 499, 815, 1699, 189, 1960, 323, 966, 1705, 703, 1165, 1443, 2000, 143,1648, 600],
      borderColor: '#ffe263',
      backgroundColor: '#fff6ad',
      lineTension: 0.7
    },
    {
      label: 'Favorites',
      data: [1899, 616, 1286, 917, 1670, 1593, 1851, 718, 1709, 863, 1095, 497, 2021, 1659, 193, 409, 190, 1577, 1814, 229, 1942, 449, 1941, 1181, 196, 546, 2013, 930, 1823, 1920],
      borderColor: '#ff5c5c',
      backgroundColor: '#ffcbcb',
      lineTension: 0.7
    },
    {
      label: 'Comments',
      data: [483, 147, 387, 99, 220, 314, 633, 363, 583, 271, 122, 307, 246, 665, 65, 150, 334, 636, 29, 773, 118, 98, 134, 304, 279, 761, 179, 797, 78, 450],
      borderColor: '#52acff',
      backgroundColor: '#bbdcff',
      lineTension: 0.7
    },
    {
      label: 'Saved articles',
      data: [24, 151, 244, 441, 273, 82, 418, 195, 453, 30, 56, 230, 216, 495, 99, 455, 175, 185, 438, 231, 192, 368, 488, 96, 424, 494, 167, 403, 307, 181],
      borderColor: '#32CD32',
      backgroundColor: '#b4ffb4',
      lineTension: 0.7
    },
  ],
};
