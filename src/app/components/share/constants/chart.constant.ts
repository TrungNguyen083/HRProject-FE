import { Chart, ChartOptions, LinearScale } from 'chart.js';
import { colorObj } from '../hrms-chart/hrms-chart.component';
import { ApexChartOptions, DonutChartOptions } from '../models/chart.model';

export const nineGridboxOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  aspectRatio: 1.8,
  scales: {
    x: {
      min: 0,
      max: 5,
      afterTickToLabelConversion: (ctx: LinearScale) => {
        ctx.ticks = [];
        ctx.ticks.push({ value: 1.66, label: '' });
        ctx.ticks.push({ value: 3.33, label: '' });
      },

      grid: {
        drawTicks: false,
      },
      border: {
        width: 3,
        dash: [6, 6],
      },
      title: {
        display: true,
        text: 'Performance',
        color: '#0D78C9FF',
        font: {
          weight: 'bold',
          size: '16px',
        },
        padding: { top: 20, bottom: 20 },
      },
    },
    y: {
      min: 0,
      max: 4,
      afterTickToLabelConversion: (ctx: LinearScale) => {
        ctx.ticks = [];
        ctx.ticks.push({ value: 1.33, label: '' });
        ctx.ticks.push({ value: 2.66, label: '' });
      },
      grid: {
        drawTicks: false,
      },
      border: {
        width: 3,
        dash: [6, 6],
      },
      title: {
        display: true,
        text: 'Potential',
        color: '#0D78C9FF',
        font: {
          weight: 'bold',
          size: '16px',
        },
        padding: { top: 0, bottom: 40 },
      },
    },
  },
};

export const nineGridLabels = {
  id: 'nineGridLabels',
  beforeDatasetsDraw: (chart: Chart) => {
    const {
      ctx,
      scales: { x, y },
    } = chart;

    // const nineLabels = {
    //   labels: [
    //     { name: 'D', x: 0.83125, y: 0.83125 },
    //     { name: 'C', x: 0.83125, y: 2.4975 },
    //     { name: 'B', x: 0.83125, y: 4.1625 },
    //     { name: 'C', x: 2.4975, y: 0.83125 },
    //     { name: 'B', x: 2.4975, y: 2.4975 },
    //     { name: 'A', x: 2.4975, y: 4.1625 },
    //     { name: 'B', x: 4.1625, y: 0.83125 },
    //     { name: 'A', x: 4.1625, y: 2.4975 },
    //     { name: 'A', x: 4.1625, y: 4.1625 },
    //   ],
    // };

    ctx.save();
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#0D78C9FF';
    ctx.textAlign = 'center';

    // nineLabels.labels.forEach(label => {
    //   ctx.fillText(
    //     label.name,
    //     x.getPixelForValue(label.x),
    //     y.getPixelForValue(label.y),
    //   );
    // });

    ctx.restore();

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px sans-serif';

    ctx.fillText('Low', x.getPixelForValue(0.83125), y.getPixelForValue(-0.2));
    ctx.fillText(
      'Moderate',
      x.getPixelForValue(2.4975),
      y.getPixelForValue(-0.2),
    );
    ctx.fillText('High', x.getPixelForValue(4.1625), y.getPixelForValue(-0.2));

    ctx.save();
    ctx.translate(x.getPixelForValue(-0.05), y.getPixelForValue(0.66));
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Low', 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(x.getPixelForValue(-0.05), y.getPixelForValue(1.99));
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Moderate', 0, 0);
    ctx.restore();

    ctx.save();
    ctx.translate(x.getPixelForValue(-0.05), y.getPixelForValue(3.32));
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('High', 0, 0);
    ctx.restore();
  },
};

export const heatmapChartOptions: ApexChartOptions = {
  series: [],
  chart: {
    height: 350,
    width: '90%',
    type: 'heatmap',
    toolbar: { show: false },
    offsetX: 20,
  },
  plotOptions: {
    heatmap: {
      enableShades: false,
      shadeIntensity: 0,
      radius: 10,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 1.5,
            name: 'Basic',
            color: colorObj.primaryLight,
          },
          {
            from: 1.6,
            to: 2.5,
            name: 'Proficient',
            color: colorObj.primary,
          },
          {
            from: 2.6,
            to: 3.5,
            name: 'Advanced',
            color: colorObj.primaryLight2,
          },
          {
            from: 3.6,
            to: 4,
            name: 'Expert',
            color: colorObj.primaryLight3,
          },
        ],
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  title: {
    text: 'HeatMap Chart with Color Range',
  },
  colors: [colorObj.primaryLight3],
  grid: {
    show: false,
  }
};

export const horizontalStackedBarOptions: ChartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
    datalabels: {
      display: true,
      align: 'center',
      anchor: 'center',
      color: 'black',
      font: {
        weight: 'bold',
      },
      formatter: function (value: number) {
        return `${value}%`;
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      position: 'left',
      grid: {
        display: false,
      },
      border: {
        width: 0,
      },
    },
  },
};

export const verticalStackedBarOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      display: false,
      align: 'top',
      anchor: 'end',
      color: 'black',
      font: {
        weight: 'bold',
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
      },
      border: {
        width: 0,
      },
    },
    y: {
      stacked: true,
      display: false,
      position: 'left',
      grid: {
        display: false,
      },
    },
  },
};

export const radarChartOptions: ChartOptions = {
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
      position: 'bottom',
    },
  },
  scales: {
    r: {
      angleLines: {
        display: true,
      },
      suggestedMin: 0,
      suggestedMax: 4,
      ticks: {
        // suggestedMin: 0,
        // suggestedMax: 4,
        stepSize: 1,
      },
    },
  },
};

export const donutChartOptions: DonutChartOptions = {
  responsive: true,
  cutout: '60%',
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
};

export const pieChartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export const barChartWithLineOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 0.6,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        // color: textColorSecondary,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        // color: textColorSecondary,
      },
      grid: {
        display: false,
      },
    },
  },
};

export const multipleHorizontalBarOptions: ChartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
    datalabels: {
      display: true,
      align: 'center',
      anchor: 'center',
      color: 'black',
      font: {
        weight: 'bold',
      },
      formatter: function (value: number) {
        if (Number.isInteger(value)) {
          return `${value}%`;
        } else {
          return `${value.toFixed(1)}%`;
        }
      },
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      position: 'left',
      grid: {
        display: false,
      },
      border: {
        width: 0,
      },
    },
  },
};

export const stackedHBarWithNoGridOptions: ChartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      stacked: true,
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      stacked: true,
      display: false,
      position: 'left',
      grid: {
        display: false,
      },
    },
  },
};

export const barChartNoGridOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};
