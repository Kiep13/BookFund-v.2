import * as React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { IGenre } from '@core/interfaces';

export default function GenresTreeView(props: any) {
  const { genres, onSelectGenre } = props;

  const buildTreeNode = (genre: IGenre) => {
    return <TreeItem key={genre.id} nodeId={genre.id.toString()} label={genre.name} onClick={() => onSelectGenre(genre)}>
      { genre.subGenres && genre.subGenres.length > 0 && genre.subGenres.map(buildTreeNode) }
    </TreeItem>
  };

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon/>}
      defaultExpandIcon={<ChevronRightIcon/>}
      sx={{
        height: '100%',
        overflowY: 'auto'
      }}>
      {
          genres.map(buildTreeNode)
      }
    </TreeView>
  )
}
