import { useRef, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import Resizer from "./Resizer";

const stackStrategy = {
  stack: 'total',
  area: true,
  stackOffset: 'none', // To stack 0 on top of others
} as const;

const customize = {
  legend: { hidden: false }, // Changed to show the legend
  margin: { top: 5 },
};

interface DataDict {
  dates: string[];
  active: number[];
  recovered: number[];
  dead: number[];
}

const transformDataset = (data: DataDict) => {
  return data.dates.map((date, index) => ({
    date,
    active: data.active[index],
    recovered: data.recovered[index],
    dead: data.dead[index],
  }));
};

const LineData = ({ data }: { data: DataDict }) => {
  const dataset = transformDataset(data);
  const [size, setSize] = useState<Object>({width: 500, height: 250});
  const graphRef = useRef<HTMLDivElement | null>(null);

  const sizer = (x:number, y:number) => {
    if (x && y) {
      if (x < 500)
        x = 500;
      if (y < 250)
        y = 250;
      console.log(x, y);
      setSize({width: x, height: y});
    }
  };

  return (
    <div ref={graphRef} className="w-full h-full py-[30px] px-[10px]">
      <LineChart
        xAxis={[
          {
            dataKey: 'date',
            valueFormatter: (value) => value.toString(),
            labelStyle: {fill: "#fff"}
          },
        ]}
        series={[
          { dataKey: 'active', label: 'Active Cases', color: '#1976d2', ...stackStrategy },
          { dataKey: 'recovered', label: 'Recoveries', color: '#388e3c', ...stackStrategy },
          { dataKey: 'dead', label: 'Deaths', color: '#d32f2f', ...stackStrategy },
        ]}
        dataset={dataset}
        {...size}
        {...customize}
      >
        <Resizer extRef={graphRef} func={sizer}/>
      </LineChart>
    </div>
  );
};

export default LineData;
