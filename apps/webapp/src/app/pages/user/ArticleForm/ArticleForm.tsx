import { Box, Button, FormControl, FormControlLabel, InputLabel, Link, MenuItem, Select, Switch, Typography } from '@mui/material';
import { useEffect } from 'react';

import { Card } from '@components/cards/Card';
import { StatefulCard } from '@components/cards/StatefulCard';
import { Input } from '@components/formСomponents/Input';

import { STYLES, TITLE_ADD, TITLE_EDIT  } from './constants';
import { useArticleForm } from './useArticleForm';
import { IArticleFolder } from "@utils/interfaces";
import { DEFAULT_FOLDER_DISPLAYED_NAME, DEFAULT_FOLDER_NAME } from "@utils/constants";

export const ArticleForm = () => {
  const {
    pageState,
    formik,
    folderOptions,
    editMode,
    initForm,
    handleFolderSelect,
    navigateToPreviousPage
  } = useArticleForm();

  useEffect(() => {
    initForm();
  }, []);

  return (
    <Card>
      <Box sx={STYLES.page}>
        <StatefulCard state={pageState}>
          <Typography
            variant='h5'
            gutterBottom
            component='div'
            sx={STYLES.pageHeader}>
            {editMode ? TITLE_EDIT : TITLE_ADD}
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            {!editMode ? (
              <Input
                id='url'
                label='Url'
                fieldName='url'
                form={formik}
                styles={STYLES.urlInput}
              />
            ) : (
              <Box sx={STYLES.urlBox}>
                <Link href={formik.values.url}>Article url</Link>
              </Box>
            )}

            <FormControl fullWidth sx={STYLES.folderSelector}>
              <InputLabel id='folderLabel'>Folder</InputLabel>
              <Select
                labelId='folderLabel'
                id='folder'
                label='Folder'
                value={formik.values.folder}
                onChange={handleFolderSelect}
              >
                {folderOptions.map((folder: IArticleFolder) =>
                  <MenuItem key={folder.id} value={folder.id}>
                    {folder.name !== DEFAULT_FOLDER_NAME ? folder.name : DEFAULT_FOLDER_DISPLAYED_NAME}
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Switch id='isRedirecting' value={formik.values.isRedirecting}/>}
              label='Is redirecting'
              sx={STYLES.redirectingSwitch}
            />

            <Typography variant='body2' gutterBottom sx={STYLES.redirectingHint}>
              Sometimes we're unable to parse external source. In this case we can store link, and then redirect to this link whatever it's needed.
              This option also enabled for good parsed articles.
            </Typography>

            <Box sx={STYLES.formButtons}>
              <Button
                variant='outlined'
                sx={STYLES.cancelButton}
                onClick={navigateToPreviousPage}>
                Cancel
              </Button>

              <Button
                variant='contained'
                type='submit'
                disabled={formik.isSubmitting || (formik.touched && !formik.isValid)}
              >
                Save
              </Button>
            </Box>

          </form>
        </StatefulCard>
      </Box>
    </Card>
  )
}
