import React from 'react'
import { List as RaList, SimpleList, useStore } from 'react-admin';
import { isEmpty } from 'lodash';

const List = (props: any) => {
  console.log({ props });
  const [project] = useStore('project');
  console.log({project});
  
  return (
    <RaList {...props} queryOptions={{ meta: { projectId: project ? project.uuid : '' } }}>
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