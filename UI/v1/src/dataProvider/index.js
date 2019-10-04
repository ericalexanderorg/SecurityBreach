import fakeDataProvider from 'ra-data-fakerest';
import data from './security-breach-v1';

function transformData(data) {
    // react-admin is finicky about it's data, need to massage it a little
    var transformed = {};
    transformed['breaches']=[];
    transformed['motives']=[];
    var motives = [];
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
        //console.log(breach);

        // Add motive to motives list, 1st step to graphing
        motives.push(breach.tags.motive);
    });
    // Our motives graph needs an array, let's create it
    var x = motives.reduce((acc, val) => {
        acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
        return acc;
    }, {});
    Object.keys(x).forEach(function (key) {
        transformed['motives'].push({ name: key, value: x[key] })
    });
    return(transformed);
}

const dataProvider = fakeDataProvider(transformData(data));
export default dataProvider;
