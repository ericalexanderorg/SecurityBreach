import fakeDataProvider from 'ra-data-fakerest';
import data from './security-breach-v1';

function dataCounts(data, k, transformed) {
    // Get unique counts
    transformed[k]=[]
    var x = data.reduce((acc, val) => {
        acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
        return acc;
    }, {});
    // Add counts to our key
    Object.keys(x).forEach(function (key) {
        transformed[k].push([key, x[key]])
    });
    return(transformed)
}

function transformMissingInt(breach, key){
    // Handle missing keys gracefully
    console.log(breach)
    breach[key]=""
    if (breach['tags'].hasOwnProperty(key) && breach['tags'][key]!=0 && breach['tags'][key]!=null) {
            breach[key]=breach['tags'][key]
            console.log('hit')
            console.log(breach)
    }
    
    return breach
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
        var month = breach['month'];
        if (breach['month'] < 10){
            month = "0"+breach['month'].toString();
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

        // Copy imperitive tags to top level so it's easier to sort in both react-admin and in the export
        breach['actor']=breach['tags']['actor']
        breach['motive']=breach['tags']['motive']
        breach['initial-access']=breach['tags']['initial-access']
        // Gracefully handle some missing int tags
        breach=transformMissingInt(breach, 'cost-usd')
        breach=transformMissingInt(breach, 'impacted-user-count')

        // Add data we want to graph on the dashboard
        motives.push(breach['tags']['motive']);
        access.push(breach['tags']['initial-access']);
        // Break down actor to their actor type, makes for a better graph/insight
        var a = breach['tags']['actor']
        if (a.indexOf(":")){
            var fields = a.split(":")
            a = fields[0]
        }
        actor.push(a)
    });
    transformed=dataCounts(motives, 'motives', transformed)
    transformed=dataCounts(access, 'access', transformed)
    transformed=dataCounts(actor, 'actor', transformed)
    // Access data needs an additional transformation
    // ATT&CK:T1193 isn't apparent that it's attributed to "Spearphishing Attachment"
    console.log(transformed['access'])
    transformed['access'].forEach(function(item, index){
        //console.log(val[0])
        try {
            console.log(data['tag-taxonomy']['initial-access'][item[0]]['description'])
            transformed['access'][index][0] = data['tag-taxonomy']['initial-access'][item[0]]['description']
        }
        catch(error) {
            console.log(item[0])
            console.log(error)
            //transformed['access'][index][0] = "Unknown"
          }
    });

    console.log(transformed['access'])
    return(transformed);
}

const dataProvider = fakeDataProvider(transformData(data));
export default dataProvider;
