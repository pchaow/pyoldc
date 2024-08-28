import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'งบประมาณในการให้ความช่วยเหลือ',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], 
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                },
                markers: {
                    size: 5
                  },
            },
            series: [{
                name: "เงิน",
                data: [100000, 41000, 35000, 51000, 49000, 62000, 69000, 91000, 148000]
            }],
        };
    }

    render() {
        return (
            <div id="chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height="450"
                />
            </div>
        );
    }
}

export default LineChart;