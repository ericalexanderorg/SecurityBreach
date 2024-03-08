import { Component } from 'react';
import { Welcome } from './Welcome';
import { Chart } from './Chart';
import metrics from './metrics.json';


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class DashboardComponent extends Component {
    render() {
        return (
            <div>
                <div style={styles.flexColumn}>
                    <div style={{ marginBottom: '2em' }}>
                        <Welcome />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'BarChart'} value={metrics.yearsCount} title={'Years'} subject={'Breaches cataloged per year'} />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'BarChart'} value={metrics.monthCount} title={'Months'} subject={'Are there more breaches in certain months?'} />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'PieChart'} value={metrics.actorCount} title={'Bad Actors'} subject={'Who did it?'} />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'PieChart'} value={metrics.initialAccessCount} title={'Initial Access'} subject={'How did they get in?'} />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'PieChart'} value={metrics.motiveCount} title={'Motive'} subject={'What was their motive?'} />
                    </div>
                </div>
            </div>
        );
    }
}

export const Dashboard = DashboardComponent;