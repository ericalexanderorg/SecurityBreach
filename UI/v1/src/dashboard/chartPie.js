import React from 'react';
import {PieChart, Pie, Tooltip} from 'recharts';

let renderLabel = function(entry) {
    return entry.name;
}

const GraphPieChart = (data) => {
    return (
        <PieChart width="50%" height="50%">
            <Pie dataKey="value" isAnimationActive={true} data={data.value} cx="50%" cy="50%" outerRadius={250} fill="#8884d8" label={renderLabel} />
            <Tooltip />
        </PieChart>
  );
}

export default(GraphPieChart);