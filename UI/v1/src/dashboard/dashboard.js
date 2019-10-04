import React, { Component, props } from 'react';
import { GET_LIST, Responsive } from 'react-admin';
import dataProvider from '../dataProvider';
import Welcome from './welcome';
import Graphs from './graphs';


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
        dataProvider(GET_LIST, 'motives', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(motivesCount => {
                this.setState({ mc: motivesCount })
                }
            )
    }

    render() {
        const {
            mc
        } = this.state; 

        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <Welcome />
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
                                <Graphs value={mc} />
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
                                <Graphs value={mc} />
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

export default Dashboard;