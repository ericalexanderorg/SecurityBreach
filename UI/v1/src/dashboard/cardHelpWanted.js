import React from 'react';
import compose from 'recompose/compose';
import { translate } from 'react-admin';
import { Button, Card, CardActions, CardContent, withStyles, Typography } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import RateReview from '@material-ui/icons/RateReview';

const styles = {
    media: {
        height: '18em',
    },
};


const CardWelcome = ({ classes, translate }) => (
    <Card>
        <CardContent>
            <Typography variant="headline" component="h3">
                Help Wanted
            </Typography>
            <Typography component="p">
                Submit a breach or help categorize a breach we've collected in our intake queue.
            </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-start' }}>
            <Button href="https://github.com/ericalexanderorg/SecurityBreach/issues/new" >
                <AddCircle style={{ paddingRight: '0.5em' }} />
                Add a Breach
            </Button>
            <Button href="https://github.com/ericalexanderorg/SecurityBreach/issues?q=is%3Aissue+is%3Aopen+label%3Aintake">
                <RateReview style={{ paddingRight: '0.5em' }} />
                Help Classify a Breach
            </Button>
        </CardActions>
    </Card>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(CardWelcome);