import { Card, CardContent, CardActions, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { AddCircle as AddCircleIcon, RateReview as RateReviewIcon } from '@mui/icons-material';

export const HelpWanted = () => (
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
            <Button hrefx="https://github.com/ericalexanderorg/SecurityBreach/issues/new" >
                <AddCircleIcon style={{ paddingRight: '0.5em' }} />
                Add a Breach
            </Button>
            <Button hrefx="https://github.com/ericalexanderorg/SecurityBreach/issues?q=is%3Aissue+is%3Aopen+label%3Aintake">
                <RateReviewIcon style={{ paddingRight: '0.5em' }} />
                Help Classify a Breach
            </Button>
        </CardActions>
    </Card>
);

