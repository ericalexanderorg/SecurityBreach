import { Component } from 'react';
import { CardWelcome } from './cardWelcome';
import HelpWanted from './cardHelpWanted'

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
                        <CardWelcome />
                    </div>
                    <div style={{ marginBottom: '2em' }}>
                        <HelpWanted />
                    </div>
                </div>
            </div>
        );
    }
}

export const Dashboard = DashboardComponent;