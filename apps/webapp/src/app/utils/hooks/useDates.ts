import moment from 'moment';

export const useDates = () => {
  const buildMonthDates = (selectedDate: Date): string[] => {
    const dateLabels: string[] = [];

    const startDate = moment(selectedDate).startOf('month').startOf('date').toDate();
    const endDate = moment(selectedDate).endOf('month').startOf('date').toDate();

    for(let i = startDate.getDate(); i <= endDate.getDate(); i++) {
      const dateLabel = moment(selectedDate).date(i).startOf('date').format('MMM D');
      dateLabels.push(dateLabel);
    }

    return dateLabels;
  }

  return {
    buildMonthDates
  }
}
