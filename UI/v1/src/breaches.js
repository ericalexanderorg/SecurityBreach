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
    SelectInput,
    LongTextInput,
    NumberInput,
    FormDataConsumer,
    maxValue,
} from 'react-admin';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import HelpIcon from '@material-ui/icons/Help';
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
            <TextField source="tags.cost-usd" />
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

const Aside = () => (
    <div style={{ width: "50%", 'margin-left': '1em' }}>
        <Card>
            <CardContent>
                <Typography variant="headline" component="h2">
                    Adding new breach data, the simple way
                </Typography>
                <Typography component="p" style={{ 'margin-top': '1em' }}>
                    Submit a Github Issue in our project with a link to more information and a project contributor will review, classify, and add to our data set.
                </Typography>
                <Button href="https://github.com/ericalexanderorg/SecurityBreach/issues/new" style={{ 'margin-top': '1em' }}>
                    <NoteAddIcon style={{ paddingRight: '0.5em' }} />
                    Github Issue
                </Button>
            </CardContent>
        </Card>
        <Card style={{ 'margin-top': '1em' }}>
            <CardContent>
                <Typography variant="headline" component="h2">
                    Adding new breach data, with more information.
                </Typography>
                <Typography component="p" style={{ 'margin-top': '1em' }}>
                    Use this form to generate breach data in json format and add it to the dataset by either submiting an issue or a pr.
                </Typography>
                <CardActions style={{ justifyContent: 'flex-start' }}>
                    <Button href="https://github.com/ericalexanderorg/SecurityBreach/issues/new" style={{ 'margin-top': '1em' }}>
                        <NoteAddIcon style={{ paddingRight: '0.5em' }} />
                        Github Issue
                    </Button>
                    <Button href="https://github.com/PointCloudLibrary/pcl/wiki/A-step-by-step-guide-on-preparing-and-submitting-a-pull-request">
                        <HelpIcon style={{ paddingRight: '0.5em' }} />
                        How to submit a pull request (PR)
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    </div>
)

var d = new Date();

// TODO:
// * Need to figure out how to dynamically pull the motive tags from the dataset. This is a hack till then. 
export const BreachCreate = (props) => (
    <Create title={'Add new breach data'} aside={<Aside />} {...props}>
            <SimpleForm saving={true}>
                <NumberInput source="year" label="Start Year" defaultValue={d.getFullYear()} />
                <NumberInput source="month" label="Start Month"  defaultValue={d.getMonth()} validate={maxValue(12)} />
                <TextInput source="entity" defaultValue={"Who was breached?"} />
                <LongTextInput source="summary" defaultValue={"Short summary of what happened"} />
                <SelectInput source="tags.actor" choices={[
                    { id: 'Nation State:China', name: 'Speculation that it was the Chinese government' },
                    { id: 'Nation State', name: 'Misc Nation State entity' },
                    { id: 'Criminal:MageCart', name: 'Speculation the entity was one or more MageCart teams' },
                    { id: 'Criminal:SamSam', name: 'SamSam' },
                    { id: 'Criminal:BEC', name: 'Speculation the entity is one or more BEC teams. Commonly operating out of an African country' },
                    { id: 'Criminal', name: 'Misc criminal entity' },
                    { id: 'Hacktivist', name: 'Misc hacktivist entity' },
                    { id: '?', name: 'Unknown' }
                ]} />
                <SelectInput source="tags.initial-access" choices={[
                    { id: 'ATT&CK:T1078', name: 'ATT&CK:T1078: Valid Accounts' },
                    { id: 'ATT&CK:T1192', name: 'ATT&CK:T1192: Spearphishing Link' },
                    { id: 'ATT&CK:T1193', name: 'ATT&CK:T1193: Spearphishing Attachment' },
                    { id: 'ATT&CK:T1200', name: 'ATT&CK:T1200: Hardware Additions' },
                    { id: 'ATT&CK:T1326', name: 'ATT&CK:T1326: Domain Registration Hijacking is the act of changing the registration of a domain name without the permission of the original registrant.' },
                    { id: 'ATT&CK:T1451', name: 'ATT&CK:T1451: SIM Card Swap' },
                    { id: 'OWASP:A1', name: 'OWASP:A1: Injection' },
                    { id: 'OWASP:A5', name: 'OWASP:A5: Broken Access Control' },
                    { id: 'OWASP:A6', name: 'OWASP:A6: Broken Authentication and Session Management' },
                    { id: 'OWASP:A9', name: 'OWASP:A9: Using Components with Known Vulerabilities' },
                    { id: 'OWASP:A10', name: 'OWASP:A10: Insufficient Logging & Monitoring' },
                    { id: 'BEC:Impersonation', name: 'BEC:Impersonation: Attacker poses as a trusted entity and requests an action to be taken that leads to monetary loss' },
                    { id: 'BGP Hijack', name: 'BGP Hijack: Trafic re-routed through unauthorized BGP advertisements' },
                    { id: '?', name: 'Unknown' }
                ]} />
                <SelectInput source="tags.motive" choices={[
                    { id: 'Espionage', name: 'Espionage: Nation state or business stealing information for espionage purposes' },
                    { id: 'Hacktivism:Press', name: 'Hacktivism:Press: Associated press benefited the whistleblower'},
                    { id: 'Hacktivism:Schadenfreude', name: 'Hacktivism:Schadenfreude: Associated press did not benefit the whistleblower but shamed the exploited entity'},
                    { id: 'Hacktivism:?', name: 'Hacktivism:?: Motivation unknown. The event neither clearly benefited the exploiter nor shamed the exploited entity' },
                    { id: 'Money:Bank Transfer', name: 'Money:Bank Transfer: Money was stolen through a bank transer'},
                    { id: 'Money:Credit Card', name: 'Money:Credit Card: Money was stolen through credit card transactions'},
                    { id: 'Money:Cryptocurrency', name: 'Money:Cryptocurrency: Money was stolen through Cryptocurrency transactions' },
                    { id: 'Money:Ransom', name: 'Money:Ransom: Money was stolen through ransom'},
                    { id: 'Money:Sale on dark web', name: 'Money:Sale on dark web: The data was put on sale on the dark web'},
                    { id: 'PII:?', name: 'PII:?: PII was stolen for unknown reasons' },
                    { id: '?', name: 'Unknown' }
                ]} />
                <NumberInput source="tags.impacted-user-count" defaultValue={0}/>
                <NumberInput source="tags.cost-usd" defaultValue={0}/>
                <LongTextInput source="links.0" defaultValue={"Link to reference"} />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                    (
                        <Typography component="pre" style={{ 'margin-top': '1em' }}>
                            {JSON.stringify(formData, null, 4)}
                        </Typography>
                    )
                    }
                </FormDataConsumer>
            </SimpleForm>
    </Create>
);
