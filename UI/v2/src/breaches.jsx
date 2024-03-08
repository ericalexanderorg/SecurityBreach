import {
    Show,
    Filter,
    TextInput,
    List,
    Datagrid,
    TextField,
    ArrayField,
    UrlField,
} from 'react-admin';


const inlineInputStyle = {
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
};

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
            <UrlField source="links" label="Links"/>
        </Datagrid>
    </List>
);


