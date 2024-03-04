import { Component } from 'react';
import { Welcome } from './Welcome';
import { HelpWanted } from './HelpWanted';
import { Chart } from './Chart';
import metrics from './metrics.json';


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

export const temp = [
    [
        "Year", "Breaches"
    ],
    [
        "2020",
        268
    ],
    [
        "2014",
        11
    ],
    [
        "2017",
        19
    ],
    [
        "2018",
        82
    ],
    [
        "2019",
        188
    ],
    [
        "2016",
        26
    ],
    [
        "2021",
        48
    ],
    [
        "2015",
        9
    ],
    [
        "2023",
        2
    ],
    [
        "2013",
        10
    ],
    [
        "2011",
        1
    ],
    [
        "2012",
        2
    ]
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
                        <Chart type={'BarChart'} value={metrics.yearsCount} title={'Years'} subject={'Breaches cataloged per year'} />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'PieChart'} value={metrics.actorCount} title={'Bad Actors'} subject={'Breaches per bad actor'} />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'PieChart'} value={metrics.initialAccessCount} title={'Initial Access'} subject={'Access'} />
                    </div>
                    <div style={{marginBottom: '2em' }}>
                        <Chart type={'PieChart'} value={metrics.motiveCount} title={'Motive'} subject={'Motive'} />
                    </div>
                </div>
            </div>
        );
    }
}

export const Dashboard = DashboardComponent;