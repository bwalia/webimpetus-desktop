import React from 'react'
import { List as RaList, SimpleList, useStore, useRecordContext } from 'react-admin';
import { isEmpty } from 'lodash';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => (
  <IconButton aria-label="delete" onClick={() => history.back()}>
    <ArrowBackIcon />
  </IconButton>
);

const TertiaryText = () => {
  const record = useRecordContext();
  return (
    <div className="tertiary-text">
      <span>{new Date(record.start_date * 1000).toLocaleDateString()}</span>
      <span>{record.status}</span>
    </div>
  )
}

const List = (props: any) => {
  const [project] = useStore('project');

  return (
    <RaList
      queryOptions={
        {
          meta: {
            projectId: (project && project?.isProjects) ? project.uuid
            : (project && project?.isAllBtasks) ? 'allTasks'
            : '0'
          }
        }}
      {...props}
    >
      <BackButton />
      <SimpleList
        primaryText={record => record.name}
        secondaryText={record => `Added on ${new Date(record.created_at).toLocaleDateString()}`}
        tertiaryText={<TertiaryText />}
        linkType={project?.isAllBtasks ? false : "show"}
        rowSx={record => ({ backgroundColor: record.nb_views >= 500 ? '#efe' : 'white' })}
      // onClick={handleProjects}
      />
    </RaList>
  )
}

export default List