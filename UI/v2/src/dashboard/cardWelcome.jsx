import React from 'react';
import Button from '@mui/material/Button';
import { Explore as ExploreIcon } from "@mui/icons-material";
import { Card, CardContent, CardActions, Typography } from '@mui/material';

const styles = {
    media: {
        height: '18em',
    },
};

export const CardWelcome = () => (
    <Card>
        <CardContent>
            <Typography variant="headline" component="h1">
                SecurityBreach
            </Typography>
            <Typography component="p">
                This is a catalog of crowd sourced security breach data. Anyone can edit this data through GitHub or use this data in any way they'd like.
            </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-start' }}>
            <Button href="#/breaches">
                <ExploreIcon style={{ paddingRight: '0.5em' }} />
                Explore This Data
            </Button>
            <Button href="https://github.com/ericalexanderorg/SecurityBreach">
                <CodeIcon style={{ paddingRight: '0.5em' }} />
                Edit This Data
            </Button>
            <Button href="https://github.com/ericalexanderorg/SecurityBreach">
                <HelpIcon style={{ paddingRight: '0.5em' }} />
                More Information
            </Button>
            <Button href="https://github.com/ericalexanderorg/SecurityBreach/tree/master/DATA/BREACHES/V1">
                <DescriptionIcon style={{ paddingRight: '0.5em' }} />
                Raw Data
            </Button>
        </CardActions>
    </Card>
);
