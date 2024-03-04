import { Card, CardContent, Typography } from '@mui/material';
import { Chart as GoogleChart } from 'react-google-charts';

export const Chart = ({ type, title, subject, value }) => (
    <Card>
        <CardContent>
            <Typography variant="headline" component="h2">
                {title}
            </Typography>
            <Typography component="p">
                {subject}
            </Typography>
            <GoogleChart
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
