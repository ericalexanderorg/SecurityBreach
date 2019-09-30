import React, { Component } from 'react';
import { GET_LIST, Responsive } from 'react-admin';
import { dataProvider } from '../dataprovider';

import Welcome from './welcome';
import SystemCount from './systemcount';
import PetCount from './petcount';
import OwnerCount from './ownercount';


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class Dashboard extends Component {
    state = {};

    componentDidMount() {
        dataProvider(GET_LIST, 'systems', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(systems => {
                this.setState({ sc: systems.length })
                }
            )
        dataProvider(GET_LIST, 'systems', {
                sort: { field: 'name', order: 'DESC' },
                pagination: { page: 1, perPage: 1000 },
                })
               .then(response => response.data
                        .filter(systems => systems.pet === true)
                )
                .then(systems => {
                    this.setState({ pc: systems.length })
                    }
                ) 
        dataProvider(GET_LIST, 'owners', {
            sort: { field: 'owner', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(owners => {
                this.setState({ oc: owners.length })
                }
            )   
    }

    render() {
        const {
            sc,
            pc,
            oc,
        } = this.state; 
        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <Welcome />
                            </div>
                            <div style={styles.flex}>
                                <SystemCount value={sc} />
                                <PetCount value={pc} />
                                <OwnerCount value={oc} />
                            </div>
                        </div>
                    </div>
                }
                small={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <Welcome />
                            </div>
                            <div style={styles.flex}>
                                <SystemCount value={sc} />
                                <PetCount value={pc} />
                                <OwnerCount value={oc} />
                            </div>
                        </div>
                    </div>
                }
                medium={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <Welcome />
                            </div>
                            <div style={styles.flex}>
                                <SystemCount value={sc} />
                                <PetCount value={pc} />
                                <OwnerCount value={oc} />
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

export default Dashboard;