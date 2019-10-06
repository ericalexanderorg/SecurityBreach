import React from 'react';
import { 
    Show, 
    SimpleShowLayout, 
    Filter, 
    TextInput,
    List, 
    Datagrid, 
    TextField,
    ArrayField,
    UrlField,
    SimpleForm,
    Create,
    ReferenceInput, 
    SelectInput,
    LongTextInput,
    DateInput,
    TabbedForm,
    FormTab,
    NumberInput,
    ShowButton
} from 'react-admin';
import { Button, Card, CardActions, CardContent, withStyles, Typography } from '@material-ui/core';
import QueueIcon from '@material-ui/icons/Queue';
import HelpIcon from '@material-ui/icons/Help';
//import FlatButton from 'material-ui/FlatButton';

const BreachFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const BreachList = props => (
    <List {...props} filters={<BreachFilter />} bulkActions={false} sort={{ field: 'Start Date', order: 'DESC' }}>
        <Datagrid hasBulkActions={false} expand={<BreachShow />}>
            <TextField source="Start Date" />
            <TextField source="entity" />
            <TextField source="summary" />
            <TextField source="tags.actor" />
            <TextField source="tags.initial-access" />
            <TextField source="tags.motive" />
            <TextField source="tags.impacted-user-count" />
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

var Aside = () => (
    <div style={{ width: "50%", 'margin-left': '1em' }}>
        <Card>
            <CardContent>
                <Typography variant="headline" component="h2">
                    Adding new breach data, the simple way
                </Typography>
                <Typography component="p" style={{ 'margin-top': '1em' }}>
                    Submit a Github Issue in our project with a link to more information and a project contributor will review, classify, and add to our data set.
                </Typography>
            </CardContent>
        </Card>
        <Card style={{ 'margin-top': '1em' }}>
            <CardContent>
                <Typography variant="headline" component="h2">
                    Adding new breach data, with more information.
                </Typography>
                <Typography component="p" style={{ 'margin-top': '1em' }}>
                    Use this form to generate breach data in json format and either submit an issue or a pr to add it to the data set.
                </Typography>
            </CardContent>
        </Card>
        <Card style={{ 'margin-top': '1em' }}>
            <CardContent>
                <Typography variant="headline" component="h2">
                    Form JSON Output
                </Typography>
                <Typography key={this.state.formJSON} component="pre" style={{ 'margin-top': '1em' }}>
                    {JSON.stringify(this.state.formJSON, null, 4)}
                </Typography>
            </CardContent>
        </Card>
    </div>
)

var formJson = {};

const validateBreachCreation = (values) => {
    console.log(values)
    formJson = values
    //this.setState({ state: this.state });
    const errors = {};
    if (!values.firstName) {
        errors.firstName = ['The firstName is required'];
    }
    if (!values.age) {
        errors.age = ['The age is required'];
    } else if (values.age < 18) {
        errors.age = ['Must be over 18'];
    }
    errors.entity = ['Must be over 18'];
    return errors
};

export const BreachCreate = (props) => (
    <Create title={'Add new breach data'} aside={<Aside />} {...props}>
            <SimpleForm saving={true} validate={validateBreachCreation}>
                <NumberInput source="Year" label="Start Year" defaultValue={2019} />
                <NumberInput source="Month" label="Start Month"  defaultValue={10} />
                <TextInput source="entity" defaultValue={"Who was breached?"} />
                <LongTextInput source="summary" defaultValue={"Short summary of what happened"} />
                <TextInput source="Tags.actor" defaultValue={"?"} />
                <TextInput source="Tags.initial-access" defaultValue={"?"} />
                <TextInput source="Tags.motive" defaultValue={"?"} />
                <NumberInput source="Tags.impacted-user-count" defaultValue={0}/>
                <Typography component="pre" style={{ 'margin-top': '1em' }}>
                    {JSON.stringify(formJson, null, 4)}
                </Typography>
            </SimpleForm>
    </Create>
);
