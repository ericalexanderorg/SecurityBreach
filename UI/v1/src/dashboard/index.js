import React, { Component, props } from 'react';
import { GET_LIST, Responsive } from 'react-admin';
import dataProvider from '../dataProvider';
import CardWelcome from './cardWelcome';
import CardMotives from './cardMotives';
import CardActor from './cardActor';
import CardAccess from './cardAccess';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class DashboardComponent extends Component {
    state = {};

    componentDidMount() {
        dataProvider(GET_LIST, 'motives', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(motivesCount => {
                this.setState({ motiveData: motivesCount })
                }
            )
        dataProvider(GET_LIST, 'access', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(accessCount => {
                this.setState({ accessData: accessCount })
                }
            )
        dataProvider(GET_LIST, 'actor', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(actorCount => {
                this.setState({ actorData: actorCount })
                }
            )
    }

    render() {
        const {
            motiveData,
            accessData,
            actorData
        } = this.state; 

        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <CardWelcome />
                            </div>
                        </div>
                    </div>
                }
                small={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <CardWelcome />
                            </div>
                            <div style={styles.flex, { marginBottom: '2em' }}>
                                <CardMotives value={motiveData} />
                            </div>
                            <div style={styles.flex, { marginBottom: '2em' }}>
                                <CardAccess value={accessData} />
                            </div>
                            <div style={styles.flex, { marginBottom: '2em' }}>
                                <CardActor value={actorData} />
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

export const Dashboard = DashboardComponent;