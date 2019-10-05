import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import HelpIcon from '@material-ui/icons/Help';
import DescriptionIcon from '@material-ui/icons/Description';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';

const styles = {
    media: {
        height: '18em',
    },
};


const CardWelcome = ({ classes, translate }) => (
    <Card>
        <CardContent>
            <Typography variant="headline" component="h2">
                SecurityBreach
            </Typography>
            <Typography component="p">
                This is a catalog of crowd sourced security breach data.Anyone can edit this data through GitHub or use this data  in any way they'd like.
            </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-start' }}>
            <Button href="https://github.com/ericalexanderorg/SecurityBreach">
                <CodeIcon style={{ paddingRight: '0.5em' }} />
                Edit This Data
            </Button>
            <Button href="https://github.com/ericalexanderorg/SecurityBreach">
                <HelpIcon style={{ paddingRight: '0.5em' }} />
                More Information
            </Button>
            <Button href="https://raw.githubusercontent.com/ericalexanderorg/SecurityBreach/master/UI/v1/src/dataProvider/security-breach-v1.json">
                <DescriptionIcon style={{ paddingRight: '0.5em' }} />
                Data
            </Button>
        </CardActions>
    </Card>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(CardWelcome);