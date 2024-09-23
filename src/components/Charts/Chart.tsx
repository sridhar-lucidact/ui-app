import { TGraphData } from "~/types/schema/common.type"
import BaseChart from "./BaseChart"
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import borderRadius from "highcharts-border-radius";
import stock from 'highcharts/modules/stock';
import dragPanes from 'highcharts/modules/drag-panes';
import noData from 'highcharts/modules/no-data-to-display';
import heatmap from 'highcharts/modules/heatmap';
import drilldown from 'highcharts/modules/drilldown';
import highchartsDumbbell from "highcharts/modules/dumbbell";
import solidGauge from "highcharts/modules/solid-gauge"
import { useMemo } from "react";
import { RowSize } from "la-ui-schema/lib/EnumModule";


borderRadius(Highcharts);
HighchartsMore(Highcharts);
dragPanes(Highcharts);
stock(Highcharts);
noData(Highcharts);
heatmap(Highcharts);
drilldown(Highcharts);
highchartsDumbbell(Highcharts);
solidGauge(Highcharts);

type TooltipProtoType = {
  pin: () => void
  unpin: () => void
  move: () => void
  _hide: (delay?: number) => void
  _move: () => void
  _refresh: (pointOrPoints: (Highcharts.Point|Array<Highcharts.Point>), mouseEvent?: Highcharts.PointerEventObject) => void
}

type ExtendedTooltip = typeof Highcharts.Tooltip & {
  prototype: TooltipProtoType,
}

type DateFormats = typeof Highcharts.dateFormats & {
  W: (timestamp: number) => number
}

type ExtendedHighChart = typeof Highcharts & {
  Tooltip: ExtendedTooltip
  dateFormats: DateFormats 
}


(function (H: ExtendedHighChart) {
    
  H.Tooltip.prototype.pin = function () {
    this._hide = this.hide;
    this._move = this.move;
    this._refresh = this.refresh;
    this.hide = function () {};
    this.move = function () {};
    this.refresh = function () {};
  };
  H.Tooltip.prototype.unpin = function () {
    this.hide = this._hide;
    this.move = this._move;
    this.refresh = this._refresh;
  };
  
  H.dateFormats.W = function (timestamp) {
    let date = new Date(timestamp),
      day = date.getUTCDay() === 0 ? 7 : date.getUTCDay(),
      dayNumber: number;

    date.setDate(date.getUTCDate() + 4 - day);
    dayNumber = Math.floor((date.getTime() - new Date(date.getUTCFullYear(), 0, 1, -6).getTime()) / 86400000);

    return 1 + Math.floor(dayNumber / 7);
  };


  Highcharts.theme = {
    colors: ["#0D6EFD", "#FF7A00", "#FFC107", "#2DBF33", "#9EC5FE", "#084298", "##BF0DFD", "#FF70E8", "FEC2C8", "#E35D6A"]
  }

  Highcharts.setOptions(Highcharts.theme);
}(Highcharts as ExtendedHighChart));

const titleHeight = 48;

const rowHeight: { [key: string]: number } = {
  "row-1": 96 - titleHeight,
  "row-2": 192 - titleHeight,
  "row-3": 288 - titleHeight,
  "row-4": 384 - titleHeight,
  "row-5": 480 - titleHeight,
  "row-100": window.innerHeight - 176 - titleHeight,
}

const getRowHeight = (rowSize?: RowSize) => {
  if (rowSize && rowHeight[`row-${rowSize}`]) {
    return rowHeight[`row-${rowSize}`];
  }
  return rowHeight["row-3"]
}


const getDefaultOptions = (conf?: Highcharts.Options, rowSize?: RowSize): Highcharts.Options => ({
  chart: {
    backgroundColor: "transparent",
    borderWidth: 0,
    // margin: [2, 0, 2, 0],
    style: {
      overflow: 'visible'
    },
    "spacingBottom": conf?.legend?.enabled !== false ? 40 : 8,
    "height": getRowHeight(rowSize)
  },
  credits: {
    enabled: false
  },
  legend: {
    "align": "left",
    "verticalAlign": "bottom",
    "alignColumns": false,
    "margin": 0,
    "padding": 0,
    "y": 25
  },
  yAxis: {
    labels: {
      style: {
        color: "#6C757D"
      }
    },
    gridLineColor: "#CED4DA",
    lineColor: "#CED4DA",
    lineWidth: 1
  },
  xAxis: {
    labels: {
      style: {
        color: "#6C757D"
      }
    },
    gridLineColor: "#CED4DA",
    lineColor: "#CED4DA",
    tickLength: 0,
    tickWidth: 0
  },
  series: []
});

const getDefaultLegends = () => ({
  legend: {
    verticalAlign: "bottom"
  }
})

export default function Chart({ conf, onClick, rowSize }: { conf: TGraphData, onClick?: Function, rowSize?: RowSize }) {
  const defaultOptions = useMemo(() => {
    return getDefaultOptions(conf, rowSize)
  }, []);

  return <BaseChart
    defaultOptions={defaultOptions}
    conf={conf}
    onClick={onClick}
  />
}