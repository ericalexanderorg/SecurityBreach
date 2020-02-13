import React, { Component, props } from 'react';
import { GET_LIST, Responsive } from 'react-admin';
import dataProvider from '../dataProvider';
import CardWelcome from './cardWelcome';
import CardChart from './cardChart';
import HelpWanted from './cardHelpWanted'

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

function transformChartData(header, data){
    var ar = []
    ar.push(header)
    Object.keys(data).forEach(function (key) {
        ar.push([ data[key][0], data[key][1] ])
    });
    return ar
}

function isInArray(array, search)
{
    return array.indexOf(search) >= 0;
}

function totalBarChartData(key, data, inMillions=false){
    var tempObj = {}
    // Loop through all breach data
    Object.keys(data).forEach(function (id) {
        // Create a variable for or array id. Makes the code cleaner. 
        var breachObj = data[id]
        // Check if we already have this year in our tempObj
        if (!tempObj.hasOwnProperty(breachObj['year'])) {
            // Not there, add it.
            tempObj[breachObj['year']] = 0
        }
        if(data[id][key] != ""){
            tempObj[breachObj['year']] = tempObj[breachObj['year']] + parseInt(data[id][key])
        }
    });
    
    // Create the object we'll return
    var returnObj = []
    // Loop through each year in tempObj
    Object.keys(tempObj).forEach(function (year) {
        if(tempObj[year] != 0){
            if(inMillions){
                var yearArray = [year, tempObj[year]/1000000000]
            }
            else {
                var yearArray = [year, tempObj[year]]
            }
            returnObj.push(yearArray)
        }
    });
    return returnObj
}

function attributeBarChartData(column, data, minYear, summarize){
    // Google doc on bar charts: https://developers.google.com/chart/interactive/docs/gallery/barchart
    // react-google-charts doc on bar charts: https://react-google-charts.com/bar-chart
    // uniques array holds our unique column values
    var uniques = [column]
    // tempObj is used to store data temporarily, as the name implies
    var tempObj = {}
    // Loop through all breach data
    Object.keys(data).forEach(function (id) {
        if(data[id]['year'] >= minYear){
            // Create a variable for or array id. Makes the code cleaner. 
            var breachObj = data[id]
            // Exclude ? and undefined values
            if(breachObj[column] === "?" || breachObj[column] === undefined){
                return
            }
            var val = breachObj[column]
            // Convert numbers to strings
            if(typeof val == 'number'){
                val = val.toString()
            }
            if(summarize){
                var components = breachObj[column].split(':')
                val = components[0]
            }
            // Add this column value if it's not already in our uniques array
            if(!isInArray(uniques, val)){
                uniques.push(val)
            }
            // Check if we already have this year in our tempObj
            if (!tempObj.hasOwnProperty(breachObj['year'])) {
                // Not there, add it.
                tempObj[breachObj['year']] = []
            }
            // Append this value to our year array in tempObj
            tempObj[breachObj['year']].push(val)
        }
    });
    // Create the object we'll return
    var returnObj = []
    uniques.push({ role: 'annotation' })
    // Add the uniques list first. It's our header value. 
    returnObj.push(uniques)
    // Loop through each year in tempObj
    Object.keys(tempObj).forEach(function (year) {
        // Create the array we'll append to returnObj
        var yearArray = [year]
        // Count each unique in the year
        for(var uniqueId in uniques){
            var uniqueCount = 0
            // Skip over first and last value - Google Chart specific data
            if(uniqueId > 0 && uniqueId < uniques.length-1){
                for(var item in tempObj[year]){
                    if(tempObj[year][item] === uniques[uniqueId]){
                        ++uniqueCount
                    }
                }
                yearArray.push(uniqueCount)
            }
        }
        // Last value has to be an empty string
        yearArray.push('')
        returnObj.push(yearArray)
    });
    return returnObj
}



class DashboardComponent extends Component {
    state = {};

    componentDidMount() {
        dataProvider(GET_LIST, 'years', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(yearsCount => {
                this.setState({ yearsData: transformChartData(['Years', 'Count'], yearsCount) })
                }
            )
        dataProvider(GET_LIST, 'motives', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(motivesCount => {
                this.setState({ motiveData: transformChartData(['Motive', 'Count'], motivesCount) })
                }
            )
        dataProvider(GET_LIST, 'access', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(accessCount => {
                this.setState({ accessData: transformChartData(['Access', 'Count'], accessCount) })
                }
            )
        dataProvider(GET_LIST, 'actor', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(actorCount => {
                this.setState({ actorData: transformChartData(['Actor', 'Count'], actorCount) })
                }
            )
        
        // Get access by year data
        dataProvider(GET_LIST, 'breaches', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(accessByYearCount => {
                this.setState({ accessByYearData: attributeBarChartData('initial-access-description', accessByYearCount, 2018, false) })
                }
            )

        // Get motive by year data
        dataProvider(GET_LIST, 'breaches', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(motiveByYearCount => {
                this.setState({ motiveByYearData: attributeBarChartData('motive', motiveByYearCount, 2018, false) })
                }
            ) 

        // Get actor by year data
        dataProvider(GET_LIST, 'breaches', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(actorByYearCount => {
                this.setState({ actorByYearData: attributeBarChartData('actor', actorByYearCount, 2018, true) })
                }
            ) 

        // Get month by year data
        dataProvider(GET_LIST, 'breaches', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(monthByYearCount => {
                this.setState({ monthByYearData: attributeBarChartData('month', monthByYearCount, 1900, false) })
                }
            ) 

        // Get cost by year data
        dataProvider(GET_LIST, 'breaches', {
            sort: { field: 'name', order: 'DESC' },
            pagination: { page: 1, perPage: 1000 },
            })
            .then(response => response.data)
            .then(costByYearData => {
                this.setState({ costByYearChartData: transformChartData(['Years', 'Cost in USD (Millions)'], totalBarChartData('cost-usd', costByYearData, true)) })
                }
            ) 

            // Get impacted uers per year
            dataProvider(GET_LIST, 'breaches', {
                sort: { field: 'name', order: 'DESC' },
                pagination: { page: 1, perPage: 1000 },
                })
                .then(response => response.data)
                .then(usersByYearData => {
                    this.setState({ usersByYearChartData: transformChartData(['Years', 'User Count (Millions)'], totalBarChartData('impacted-user-count', usersByYearData, true)) })
                    }
                ) 
    }

    render() {
        const {
            motiveData,
            motiveByYearData,
            accessData,
            accessByYearData,
            actorData,
            actorByYearData,
            yearsData,
            monthByYearData, 
            costByYearChartData,
            usersByYearChartData
        } = this.state; 


        return (
            <div>
                <div style={styles.flexColumn}>
                    <div style={{ marginBottom: '2em' }}>
                        <CardWelcome />
                    </div>
                    <div style={{ marginBottom: '2em' }}>
                        <HelpWanted />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'BarChart'} value={yearsData} title={'Years'} subject={'Breaches cataloged per year.'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'Bar'} value={monthByYearData} title={'Month by Year'} subject={'Trends in activity per month.'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'AreaChart'} value={costByYearChartData} title={'Cost by Year (in Millions)'} subject={'Total cost of breaches per year in USD.'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'AreaChart'} value={usersByYearChartData} title={'Impacted Users by Year (in Millions)'} subject={'Total number of impacted users per year.'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'PieChart'} value={accessData} title={'Access'} subject={'How did the actor gain initial access?'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'Bar'} value={accessByYearData} title={'Access by Year (Last 3 Years)'} subject={'Access trends per year.'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'PieChart'} value={motiveData} title={'Motive'} subject={'Why did the actor seek access?'} />
                    </div> 
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'Bar'} value={motiveByYearData} title={'Motive by Year (Last 3 Years)'} subject={'Motive trends per year.'} />
                    </div>
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'PieChart'} value={actorData} title={'Actor'} subject={'Speculation and/or concensus on who the actor was?'} />
                    </div> 
                    <div style={styles.flex, { marginBottom: '2em' }}>
                        <CardChart type={'Bar'} value={actorByYearData} title={'Actor by Year (Last 3 Years)'} subject={'Actor trends per year.'} />
                    </div>
                </div>
            </div>
        );
    }
}

export const Dashboard = DashboardComponent;