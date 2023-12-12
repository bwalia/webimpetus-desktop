import React from 'react';
import {
    Show as RaShow,
    SimpleShowLayout,
    TextField,
    NumberField,
    DateField,
    useRecordContext,
    useRedirect,
    useStore
} from 'react-admin';
import { IconButton, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MoneyField = (props: any) => {
    const record = useRecordContext();
    return (
        <NumberField
            source={props.source}
            options={{
                style: 'currency',
                currency: record.currency,
                minimumFractionDigits: 2
            }}
        />
    );
};

const PageTitle = () => {
    const record = useRecordContext();
    return record ? record.name : ""
}

const SearchTasks = () => {
    const record = useRecordContext();
    const redirect = useRedirect();
    const [project, setProject] = useStore('project', {});
    const handleSearchTasks = () => {
        setProject(record);
        redirect('list', 'tasks');
    }
    return (
        <Button variant="contained" onClick={handleSearchTasks}>Search Tasks</Button>
    )
}

const BackButton = () => (
    <IconButton aria-label="delete" onClick={() => history.back()}>
      <ArrowBackIcon />
    </IconButton>
  )

const Show = (props: any) => {
    return (
        <RaShow title={<PageTitle />}>
            <BackButton />
            <SimpleShowLayout>
                <TextField source="name" />
                <DateField label="Publication date" source="created_at" />
                <DateField source='start_date' transform={(value: any) => new Date(value * 1000)} />
                <DateField source='deadline_date' transform={(value: any) => new Date(value * 1000)} />
                <MoneyField source="budget" />
                <MoneyField source="rate" />
                <SearchTasks />
            </SimpleShowLayout>
        </RaShow>
    )
}

export default Show