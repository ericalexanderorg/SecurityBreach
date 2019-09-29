import fakeDataProvider from 'ra-data-fakerest';
import data from './security-breach-v1';

function transformData(data) {
    // react-admin is finicky about it's data, need to massage it a little
    var transformed = {};
    transformed['breaches']=[];
    data.breaches.forEach(function(breach){
        transformed['breaches'].push(breach);
    });
    return(transformed);
}

const dataProvider = fakeDataProvider(transformData(data));
export default dataProvider;
