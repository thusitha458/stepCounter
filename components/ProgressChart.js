import React, {Component} from "react";
import {View} from "react-native";
import {Svg, Text, G, Rect, Path, LinearGradient, Defs, Stop} from "react-native-svg";

const Pie = require("paths-js/pie");

class ProgressChart extends Component {
    constructor(props) {
        super(props);
        this.backgroundCircleColor = this.props.backgroundCircleColor || 'rgba(45,46,44,0.47)';
    }

    getStrokeColorForFilledCircle = () => {
        return '#00c5ff';
    };

    getFontColor = () => {
        return '#FFFFFF';
    };

    getStrokeWidth = () => this.props.storkeWidth || this.props.height / 15;

    getRadius = () => this.props.height / 2 - this.getStrokeWidth() / 2;

    getRatio = () => this.props.score / this.props.target;

    getFilledRatio = () => Math.min(this.getRatio(), 1);

    getFontSize = () => this.props.height * 50 / 300;

    render() {
        let borderRadius = (this.props.style && this.props.style.borderRadius) || 0;
        let strokeWidth = this.getStrokeWidth();
        let radius = this.getRadius();

        let ratio = this.getFilledRatio();

        const pie = Pie({
            r: radius,
            R: radius,
            center: [0, 0],
            data: [ratio, 1 - ratio],
            accessor(x) {
                return x;
            }
        });

        const pieBackground = Pie({
            r: radius,
            R: radius,
            center: [0, 0],
            data: [1, 0],
            accessor(x) {
                return x;
            }
        });

        let percentage = Math.floor(this.getRatio() * 100);
        if (percentage > 100 && !this.props.showExactPercentageAfterHittingTarget) {
            percentage = 100;
        }

        return (
            <View style={{width: this.props.width, height: this.props.height, padding: 0, ...this.props.style}}>
                <Svg width={this.props.width} height={this.props.height}>
                    <G x={this.props.width / 2} y={this.props.height / 2}>
                        <G>
                            <Path
                                key={Math.random()}
                                d={pieBackground.curves[0].sector.path.print()}
                                strokeWidth={strokeWidth / 2}
                                stroke={this.backgroundCircleColor}
                            />
                        </G>
                        <G>
                            <Path
                                key={Math.random()}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={pie.curves[0].sector.path.print()}
                                strokeWidth={strokeWidth}
                                stroke={this.getStrokeColorForFilledCircle()}
                            />
                        </G>
                    </G>
                    {
                        !this.props.hidePercentage &&
                        <G>
                            <Text
                                key={Math.random()}
                                x={this.props.width / 2}
                                y={this.props.height / 2}
                                textAnchor="middle"
                                alignmentBaseline="central"
                                fontSize={this.getFontSize()}
                                fill={this.getFontColor()}
                                fontWeight={"bold"}
                            >{`${percentage}%`}</Text>
                        </G>
                    }
                </Svg>
            </View>
        );
    }
}

export default ProgressChart;
