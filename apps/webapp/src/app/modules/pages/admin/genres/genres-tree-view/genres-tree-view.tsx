import * as React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { IGenre } from '@core/interfaces';
import { GENRES_MOCK } from '@mocks/genres.mock';

export default function GenresTreeView() {
  const genres = GENRES_MOCK;

  const buildTreeNode = (genre: IGenre) => {
    return <TreeItem key={genre.id} nodeId={genre.id.toString()} label={genre.name}>
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
