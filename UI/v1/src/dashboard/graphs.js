import React from 'react';
import {PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

let renderLabel = function(entry) {
    return entry.name;
}

const Graphs = (value) => {
    return (
        <PieChart width={800} height={800}>
            <Pie dataKey="value" isAnimationActive={true} data={value.value} cx="50%" cy="50%" outerRadius={250} fill="#8884d8" label={renderLabel} />
            <Tooltip />
        </PieChart>
  );
}

export default(Graphs);