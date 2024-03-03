import { Card, CardContent} from '@mui/material';
import withStyles from '@mui/material';
import { translate } from 'react-admin';
import {Chart} from 'react-google-charts';

const styles = {
    media: {
        height: '18em',
    },
    marginBottom: '2em',
};

const CardChart = ({ type, title, subject, value }) => (
    <Card>
        <CardContent>
            <Typography variant="headline" component="h2">
                {title}
            </Typography>
            <Typography component="p">
                {subject}
            </Typography>
            <Chart
                width={'100%'}
                height={'400px'}
                chartType={type}
                loader={<div>Loading Chart</div>}
                data={value}
                rootProps={{ 'data-testid': '1' }}
            />
        </CardContent>
    </Card>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(CardChart);