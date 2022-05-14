import { PageSizes, SortDirections, TableActions } from '@utils/enums';
import { ISortOptions, ITableItemAction } from '@utils/interfaces';

import { IProps } from './propsInterface';

export const useDataTable = (props: IProps) => {
  const { columns, sortOptions, page, rowsPerPage, data, count, loading } = props;

  const rowsPerPageOptions = Object.values(PageSizes).map(value => +value).filter((value) => value);

  const handleRequestSort = (event: any, property: any): void => {
    const isAsc = sortOptions.orderBy === property && sortOptions.order === SortDirections.Asc;

    const newSortOptions: ISortOptions = {
      order: isAsc ? SortDirections.Desc : SortDirections.Asc,
      orderBy: property
    }

    props.onHandleSortRequest(newSortOptions);
  };

  const handleClick = (actionType: TableActions, id: number): void => {
    const tableItemAction: ITableItemAction = { id, actionType };
    props.onHandleClick(tableItemAction);
  };

  const handleChangePage = (event: any, newPage: number): void => {
    props.onHandlePageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: any): void => {
    props.onHandleRowsPerPageChanged(parseInt(event.target.value, 10));
  };

  return {
    data,
    page,
    columns,
    sortOptions,
    loading,
    rowsPerPage,
    rowsPerPageOptions,
    count,
    handleRequestSort,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage
  }
}
