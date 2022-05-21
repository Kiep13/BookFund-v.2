export interface IProps {
  title: string;
  handleBackClick: () => void;
  handleEditClick?: () => void;
  handleDeleteClick?: () => void;
  isActionsHidden?: boolean;
}
