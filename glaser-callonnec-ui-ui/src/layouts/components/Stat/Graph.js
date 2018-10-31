import React from 'react';
import { connect } from 'react-redux';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';


class Graph extends React.Component {

componentDidMount() {
    const { stats } = this.props;
    console.log(stats[0].date > stats[1].date)
}
    render = () => {
        const { stats } = this.props;
        return (
            <ResponsiveContainer width="99%" height={320}>
                <LineChart data={stats.map(s => (
                        {
                            Date: s.date,
                            Visiteurs: s.numberVisitor,
                            Income: s.income
                        }
                    )
                )}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Visiteurs" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Income" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

export default connect(
    state => ({
        stats: state.stats,
    }),
)(Graph);