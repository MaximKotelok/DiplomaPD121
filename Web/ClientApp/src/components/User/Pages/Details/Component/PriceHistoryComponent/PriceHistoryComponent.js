import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import "./PriceHistoryComponent.css"
const PriceHistoryComponent = ({history}) => {
    const [clickedBarIndex, setClickedBarIndex] = useState(null);
    const [data, setData] = useState(history)
    ;

    const handleBarClick = (index) => {
        setClickedBarIndex(index);
        data.forEach((item, index) => {
            if (item.fill) {
                delete data[index].fill
            }
        });
        data[index].fill = "#007AFF";
        setData(data)
    };

    const CloudLabel = ({ x, y, width, value }) => {
        const labelWidth = 50;
        const labelHeight = 30;
        const triangleHeight = 10;
        const triangleWidth = 20;      
        return (
          <g transform={`translate(${x + width / 2 - labelWidth / 2}, ${y - labelHeight - triangleHeight})`}>
            <rect x="0" y="1" width={labelWidth} height={labelHeight} rx="5" fill="#FF9500" />
            <polygon points={`${labelWidth / 2 - triangleWidth / 2}, ${labelHeight} ${labelWidth / 2 + triangleWidth / 2}, ${labelHeight} ${labelWidth / 2}, ${labelHeight + triangleHeight}`} fill="#FF9500" />
            <text x={labelWidth / 2} y={labelHeight / 2+3} fill="white" fontSize="12px" textAnchor="middle" dominantBaseline="middle" fontFamily='Mulish' fontWeight="bold">{value}</text>
          </g>
        );
      };
      const renderCustomBarLabel = ({ x, y, width, height, value, index, payload }) => {
        if (index === clickedBarIndex) {
          return <CloudLabel x={x} y={y} width={width} value={value} />;
        } else {
          return null;
        }
      };

    return (
        <div className='w-100'>
            <BarChart className='price-history' style={{ width: "100%" }} width={1400} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} >
                <CartesianGrid horizontal={true} vertical={false} strokeDasharray="9 9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Legend />
                <Bar dataKey="value" fill="#0E3E75" radius={[30, 30, 0, 0]} barSize={20}
                    onClick={(event, data) => {
                        console.log(event)
                        handleBarClick(data)
                    }
                    
                    } 
                    label={renderCustomBarLabel}
                    />
             
             
                

            </BarChart>
        </div>
    );
};

export default PriceHistoryComponent;
