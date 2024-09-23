import HighchartsReact from "highcharts-react-official";
import Highcharts, { SeriesClickCallbackFunction, SeriesAreaRangeDataLabelsOptionsObject, SeriesOptionsType, XAxisOptions } from 'highcharts'
import { useEffect, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import { TGraphData } from "~/types/schema/common.type";

const getDateFromX = (x: string) => {
  let datetime = x;
  const timeBegins = x.lastIndexOf("-");
  if (timeBegins > 10) {
    const date = x.substring(0, timeBegins);
    const timezone = x.substring(timeBegins, timeBegins + 6);
    datetime = `${date}${timezone}`;
  }
  return datetime;
}

/***
 * cs - chart series
 * cp - chart point
 */
const formatData = (seriesData: SeriesAreaRangeDataLabelsOptionsObject[]) => {
  if (Array.isArray(seriesData)) {
    seriesData = seriesData.map(cp => {
      if (Array.isArray(cp) && cp.length > 0) {
        let x = cp[0];
        if (typeof x === "string") x = Date.parse(getDateFromX(x));
        cp[0] = x;
      } else if (cp && cp.x) {
        let x = cp.x;
        if (typeof x === "string") x = Date.parse(getDateFromX(x));
        cp.x = x;
      };
      return cp;
    });
  };
  return seriesData;
};


const formatDatetimeValues = (graph: Highcharts.Options, newSeries: Array<SeriesOptionsType>) => {
  let series = cloneDeep(newSeries || graph.series)
  
  let xAxisType = (graph?.xAxis as XAxisOptions)?.type;
  if (xAxisType !== 'datetime' || !series) return series;
  
  if (Array.isArray(series)) {
    series = series.map((sd) => ({ 
      ...sd,
      data: formatData((sd as {data: any}).data),
    } as SeriesOptionsType));
  }
  return series;
}

type BaseChartProps = {
  conf: TGraphData,
  defaultOptions?: Highcharts.Options,
  onClick?: Function
  highCharts?: typeof Highcharts
}

export default function BaseChart({ conf, defaultOptions, onClick, highCharts }: BaseChartProps) {
  const container = useRef<HTMLDivElement>(null);
  const [options, setOptions] = useState<Highcharts.Options>();

  const updateOptions = () => {
    if(container && conf) {
      let options = Highcharts ? Highcharts.merge(defaultOptions, conf) : {} ;
      options.series = formatDatetimeValues(options, (conf as Highcharts.Options).series || [])
      if (!options.plotOptions) options.plotOptions = {}
      if (!options.plotOptions.series) options.plotOptions.series = {}
      if (!options.plotOptions.series.events) options.plotOptions.series.events = {}
      options.plotOptions.series.events = {
        "click": onClick as SeriesClickCallbackFunction
      }
      setOptions(options)
    }
  }

  useEffect(() => {
    updateOptions()
  }, [conf])

  const highChart = highCharts || Highcharts;
  return (
    <div ref={container}>
      {!isEmpty(options) && highChart ?
        <HighchartsReact
          highcharts={highChart}
          options={options}
          oneToOne={true}
        /> : null
      }
    </div>
  )
}