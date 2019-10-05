import fakeDataProvider from 'ra-data-fakerest';
import data from './security-breach-v1';

function dataCounts(data, k, transformed) {
    // Get unique counts
    transformed[k]=[]
    console.log(transformed)
    var x = data.reduce((acc, val) => {
        acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
        return acc;
    }, {});
    // Add counts to our key
    Object.keys(x).forEach(function (key) {
        transformed[k].push({ name: key, value: x[key] })
    });
    return(transformed)
}

function transformData(data) {
    // react-admin is finicky about it's data, need to massage it a little
    var transformed = {};
    // add our top level keys
    transformed['breaches']=[];
    // create some temporary variables
    var motives = [];
    var access = [];
    var actor = [];
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
            //console.log(link);
            links.push({url:link})
        });
        breach['links']=links;
        transformed['breaches'].push(breach);

        // Add data we want to graph on the dashboard
        motives.push(breach['tags']['motive']);
        access.push(breach['tags']['initial-access']);
        actor.push(breach['tags']['actor']);
    });
    transformed=dataCounts(motives, 'motives', transformed)
    transformed=dataCounts(access, 'access', transformed)
    transformed=dataCounts(actor, 'actor', transformed)
    return(transformed);
}

const dataProvider = fakeDataProvider(transformData(data));
export default dataProvider;
