import React from 'react';
import { 
    Show, 
    SimpleShowLayout, 
    Filter, 
    TextInput,
    List, 
    Datagrid, 
    TextField,
    BooleanField,
    ChipField,
    ArrayField,
    SingleFieldList,
    UrlField,
    ReferenceArrayInput,
    BooleanInput,
    AutocompleteArrayInput,
    ReferenceArrayField, 
    DateField
} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const BreachList = props => (
    <List {...props} filters={<PostFilter />} bulkActions={false} sort={{ field: 'Start Date', order: 'DESC' }}>
        <Datagrid hasBulkActions={false} expand={<BreachShow />}>
            <TextField source="Start Date" />
            <TextField source="entity" />
            <TextField source="summary" />
            <TextField source="tags.actor" />
            <TextField source="tags.initial-access" />
            <TextField source="tags.motive" />
        </Datagrid>
    </List>
);


export const BreachShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <ArrayField source="links">
                <Datagrid>
                    <UrlField source="url" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);