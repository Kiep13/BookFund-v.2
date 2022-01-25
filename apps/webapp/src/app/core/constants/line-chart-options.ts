export const LINE_CHART_OPTIONS = {
  responsive: true,
  scales: {
    y: {
      suggestedMin: 0
    }
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false
    },
  },
};
