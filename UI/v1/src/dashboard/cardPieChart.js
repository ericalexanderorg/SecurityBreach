import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';
import {Chart} from 'react-google-charts';

const styles = {
    media: {
        height: '18em',
    },
    marginBottom: '2em',
};

const CardPieChart = ({ title, subject, value }) => (
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
                chartType="PieChart"
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

export default enhance(CardPieChart);