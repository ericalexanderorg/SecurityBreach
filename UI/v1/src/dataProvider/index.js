import fakeDataProvider from 'ra-data-fakerest';
import data from './security-breach-v1';

function transformData(data) {
    // react-admin is finicky about it's data, need to massage it a little
    var transformed = {};
    transformed['breaches']=[];
    data.breaches.forEach(function(breach){
        // Add a Start Date key so it's easier to display/sort in react-admin
        if (breach['month'] < 10){
            var month = "0"+breach['month'].toString();
        }
        else {
            var month = breach['month'];
        }
        breach['Start Date'] = breach['year'].toString()+month
        // Convert links to a format react-admin likes
        var links = [];
        breach.links.forEach(function(link){
            console.log(link);
            links.push({url:link})
        });
        breach['links']=links;
        transformed['breaches'].push(breach);
        console.log(breach);
    });
    return(transformed);
}

const dataProvider = fakeDataProvider(transformData(data));
export default dataProvider;
