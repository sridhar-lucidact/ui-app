import Highcharts, { SeriesAreaRangeDataLabelsOptionsObject, SeriesOptionsType, XAxisOptions } from 'highcharts'
import cloneDeep from "lodash/cloneDeep";
import BaseChart from "./BaseChart";
import { TGraphData } from '~/types/schema/common.type';
import dottie from 'dottie';

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


const defaultOptions: Highcharts.Options = {
  chart: {
    backgroundColor: "transparent",
    borderWidth: 0,
    type: 'area',
    margin: [2, 0, 2, 0],
    width: 105,
    height: 20,
    style: {
      overflow: 'visible'
    }
  },
  title: {
    text: '',
    style: {
      visibility: "hidden"
    }
  },
  credits: {
    enabled: false
  },
  xAxis: {
    labels: {
      enabled: false
    },
    title: {
      text: null
    },
    startOnTick: false,
    endOnTick: false,
    tickPositions: [],
    lineWidth: 0
  },
  yAxis: {
    endOnTick: false,
    startOnTick: false,
    labels: {
      enabled: false
    },
    title: {
      text: null
    },
    tickPositions: [0]
  },
  legend: {
    enabled: false
  },
  tooltip: {
    backgroundColor: 'white',
    borderWidth: 1,
    hideDelay: 0,
    shared: true,
    padding: 8,
    borderColor: 'silver',
    borderRadius: 3,
    positioner: function (w: number, h: number, point: any) {
      return { x: point.plotX - w / 2, y: point.plotY - h };
    },
    outside: true
  },
  plotOptions: {
    series: {
      animation: false,
      lineWidth: 1,
      shadow: false,
      states: {
        hover: {
          lineWidth: 1
        }
      },
      marker: {
        radius: 1,
        states: {
          hover: {
            radius: 2
          }
        }
      },
    },
    column: {
      negativeColor: '#910000',
      borderColor: 'silver'
    }
  },

  series: []
};

export default function Sparkline({ conf }: { conf: TGraphData}) {

  return (
    <BaseChart defaultOptions={defaultOptions} conf={conf} />
  )
}