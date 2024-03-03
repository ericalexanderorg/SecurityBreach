import { Card, CardContent, CardActions, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { AddCircleIcon, RateReviewIcon } from '@mui/icons-material/AddCircle';

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
                <AddCircleIcon style={{ paddingRight: '0.5em' }} />
                Add a Breach
            </Button>
            <Button href="https://github.com/ericalexanderorg/SecurityBreach/issues?q=is%3Aissue+is%3Aopen+label%3Aintake">
                <RateReviewIcon style={{ paddingRight: '0.5em' }} />
                Help Classify a Breach
            </Button>
        </CardActions>
    </Card>
);


export default CardWelcome;