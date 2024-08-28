import React, { Component } from "react";
import Chart from "react-apexcharts";

class PieChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                title: {
                    text: 'เรื่องที่ขอใช้งบประมาณ เดือนพฤศจิกายน 2566',
                    align: 'left'
                },
                labels: ['ค่ารักษาพยาบาล', 'อุปกรณ์ช่วยเหลือ', 'ซ่อมที่อยู่อาศัย', ],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
            series: [44000, 55000, 13000, ],
        };
    }

    render() {
        return (
            <div id="chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="pie"
                    height="462"
                />
            </div>
        );
    }
}

export default PieChart;