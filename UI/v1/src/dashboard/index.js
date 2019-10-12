import React, { Component, props } from 'react';
import { GET_LIST, Responsive } from 'react-admin';
import dataProvider from '../dataProvider';
import CardWelcome from './cardWelcome';
import CardPieChart from './cardPieChart';
import HelpWanted from './cardHelpWanted'

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

function transformChartData(header, data){
    var ar = []
    ar.push(header)
    Object.keys(data).forEach(function (key) {
        ar.push([ data[key][0], data[key][1] ])
    });
    return ar
}



class DashboardComponent extends Component {
    state = {};

    componentDidMount() {
        dataProvider(GET_LIST, 'motives', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(motivesCount => {
                this.setState({ motiveData: transformChartData(['Motive', 'Count'], motivesCount) })
                }
            )
        dataProvider(GET_LIST, 'access', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(accessCount => {
                this.setState({ accessData: transformChartData(['Access', 'Count'], accessCount) })
                }
            )
        dataProvider(GET_LIST, 'actor', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(actorCount => {
                this.setState({ actorData: transformChartData(['Actor', 'Count'], actorCount) })
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
            <div>
                <div style={styles.flexColumn}>
                    <div style={{ marginBottom: '2em' }}>
                        <CardWelcome />
                    </div>
                    <div style={{ marginBottom: '2em' }}>
                        <HelpWanted />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardPieChart value={accessData} title={'Access'} subject={'How did the actor gain initial access?'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardPieChart value={motiveData} title={'Motive'} subject={'Why did the actor seek access?'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardPieChart value={actorData} title={'Actor'} subject={'Speculation and/or concensus on who the actor was?'} />
                    </div> 
                </div>
            </div>
        );
    }
}

export const Dashboard = DashboardComponent;