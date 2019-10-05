import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';
import {PieChart, Pie, Tooltip} from 'recharts';

let renderLabel = function(entry) {
    return entry.name;
}

const styles = {
    media: {
        height: '18em',
    },
};

const CardActor = ({ value, classes, translate }) => (
    <Card>
        <CardContent>
            <Typography variant="headline" component="h2">
                Actor
            </Typography>
            <Typography component="p">
                What's the concensus on who the actor was?
            </Typography>
            <PieChart width={800} height={800}>
            <Pie dataKey="value" isAnimationActive={true} data={value} cx="50%" cy="50%" outerRadius={200} fill="#8884d8" label={renderLabel} />
            <Tooltip />
        </PieChart>
        </CardContent>
    </Card>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default CardActor;