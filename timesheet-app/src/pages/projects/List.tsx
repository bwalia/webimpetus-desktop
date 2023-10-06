import React from 'react';
import { List as RaList, SimpleList } from 'react-admin';

const List = (props: any) => {
  return (
    <RaList {...props}>
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