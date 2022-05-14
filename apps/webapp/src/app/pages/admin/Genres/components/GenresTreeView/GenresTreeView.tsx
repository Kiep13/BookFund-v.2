import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { IGenre } from '@utils/interfaces';

import { STYLES } from './constants';
import { IProps } from './propsInterface';

export const GenresTreeView = ({ genres, onSelectGenre }: IProps) => {
  const buildTreeNode = (genre: IGenre) => {
    return <TreeItem key={genre.id} nodeId={genre.id.toString()} label={genre.name} onClick={() => onSelectGenre(genre)}>
      { genre.subGenres && genre.subGenres.length > 0 && genre.subGenres.map(buildTreeNode) }
    </TreeItem>
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
      sx={STYLES.treeView}>
      {genres.map(buildTreeNode)}
    </TreeView>
  )
}
