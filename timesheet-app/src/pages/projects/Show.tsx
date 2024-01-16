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
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF0051',
            // light: will be calculated from palette.primary.main,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            main: '#E0C2FF',
            light: '#F5EBFF',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#47008F',
        },
    },
});

const PageTitle = () => {
    const record = useRecordContext();
    return record ? record.name : ""
}

const SearchTasks = () => {
    const record = useRecordContext();
    const redirect = useRedirect();
    const [project, setProject] = useStore('project', {});
    const handleSearchTasks = () => {
        record.isProjects = true;
        record.isAllBtasks = false;
        setProject(record);
        redirect('list', 'tasks');
    }
    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" color='primary' onClick={handleSearchTasks}>Search Tasks</Button>
        </ThemeProvider>
    )
}

const BackButton = () => (
    <IconButton aria-label="delete" onClick={() => history.back()}>
        <ArrowBackIcon />
    </IconButton>
)

const Show = (props: any) => {
    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    )
}

export default Show