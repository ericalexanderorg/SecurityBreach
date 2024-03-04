import { Component } from 'react';
import { Welcome } from './Welcome';
import { HelpWanted } from './HelpWanted';
import { Chart } from './Chart';


const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

export const yearsData = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

class DashboardComponent extends Component {
    render() {
        return (
            <div>
                <div style={styles.flexColumn}>
                    <div style={{ marginBottom: '2em' }}>
                        <Welcome />
                    </div>
                    <div style={{ marginBottom: '2em' }}>
                        <HelpWanted />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'BarChart'} value={yearsData} title={'Years'} subject={'Breaches cataloged per year.'} />
                    </div>
                </div>
            </div>
        );
    }
}

export const Dashboard = DashboardComponent;