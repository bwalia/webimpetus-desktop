import React from 'react'
import { List as RaList, SimpleList, useStore } from 'react-admin';
import { isEmpty } from 'lodash';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = () => (
  <IconButton aria-label="delete" onClick={() => history.back()}>
    <ArrowBackIcon />
  </IconButton>
)
const List = (props: any) => {
  const [project] = useStore('project');

  return (
    <RaList
      queryOptions={{ meta: { projectId: project ? project.uuid : '' } }}
      {...props}
    >
      <BackButton />
      <SimpleList
        primaryText={record => record.name}
        secondaryText={record => `Added on ${new Date(record.created_at).toLocaleDateString()}`}
        tertiaryText={record => new Date(record.start_date * 1000).toLocaleDateString()}
        linkType={"show"}
        rowSx={record => ({ backgroundColor: record.nb_views >= 500 ? '#efe' : 'white' })}
      // onClick={handleProjects}
      />
    </RaList>
  )
}

export default List