import { useRef, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';
import Resizer from "./Resizer";

const stacker = {
  stack: 'total',
  area: true,
  stackOffset: 'none',
  showMark: false,
  connectNulls: true,
} as const;

interface DataDict {
  dates: string[];
  active: number[];
  recovered: number[];
  dead: number[];
}

const LineData = ({ data }: { data: DataDict }) => {
  const [size, setSize] = useState<Object>({width: 500, height: 250});
  const graphRef = useRef<HTMLDivElement | null>(null);

  const sizer = (x:number, y:number) => {
    if (x && y) {
      if (x < 500)
        x = 500;
      if (y < 250)
        y = 250;
      setSize({width: x, height: y});
    }
  };

  return (
    <div ref={graphRef} className="w-full h-full py-[30px] px-[10px]">
      <LineChart
        {...size}
        series={[
          { ...stacker, color:"#000", label: 'Deaths', data: [1, 1, 1, 1, 1, 1, 5, 1, 1, 1, null, 1] },
          { ...stacker, color:"#0e2", label: 'Recovered', data: [3, 4, 5, 6, 7, 8, 3, 4, 5, 6, null, 8] },
          { ...stacker, color:"#e10", label: 'Infected', data: [4, 5, 6, 7, 8, 5, 4, 5, 6, 7, 8, 50] },
        ]}
         xAxis={[{ scaleType: 'point', data: ["2020-01-01", "2020-01-02", "2020-01-03", "2020-01-04", "2020-01-05", "2020-01-06","2020-01-07", "2020-01-08", "2020-01-09", "2020-01-10", "2020-01-11", "2020-01-12"] }]}
      />
      <Resizer extRef={graphRef} func={sizer}/>
    </div>
  );
};

export default LineData;
