import {
    Filter,
    TextInput,
    List,
    Datagrid,
    TextField,
    FunctionField,
} from 'react-admin';
import { Link } from 'react-router-dom';
import { OpenInNew as OpenInNewIcon } from '@mui/icons-material';

const BreachFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const BreachList = props => (
    <List {...props} filters={<BreachFilter />} sort={{ field: 'year', order: 'DESC' }}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="year" />
            <TextField source="month" />
            <TextField source="entity" />
            <TextField source="summary" />
            <TextField source="tags.actor" label="Actor"/>
            <TextField source="tags.initial-access" label="Initial Access"/>
            <TextField source="tags.motive" label="Motive"/>
            <TextField source="tags.impacted-user-count" label="Impacted User Count"/>
            <TextField source="tags.cost-usd" label="USD Cost"/>
            <FunctionField
                label="More Info"
                render={record => (
                    <Link to={record.links.length > 0 ? record.links[0] : '/'} target="_blank" rel="noopener noreferrer">
                        <OpenInNewIcon />
                    </Link>
                )}
            />
        </Datagrid>
    </List>
);


