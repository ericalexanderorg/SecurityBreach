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
    ReferenceArrayField
} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const BreachList = props => (
    <List {...props} filters={<PostFilter />} bulkActions={false} sort={{ field: 'year', order: 'DESC' }}>
        <Datagrid hasBulkActions={false} expand={<BreachShow />}>
            <TextField source="month" />
            <TextField source="year" />
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
        <TextField source="month" />
            <TextField source="year" />
            <TextField source="entity" />
            <TextField source="summary" />
            <ReferenceArrayField label="Tags">
                <SingleFieldList>
                    <ChipField source="tags" />
                </SingleFieldList>
            </ReferenceArrayField>
            <ArrayField source="links">
                <Datagrid>
                    <UrlField source="url" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);