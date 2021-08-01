import Component from '@/src/core/Component';
import { LineChart, LineChartData } from '@/src/utils/charts/LineChart';
import PieChart, { PieChartData } from '@/src/utils/charts/PieChart';

import './index.scss';

// TODO: Mocking Data
const mockDataByCategory: PieChartData[] = [
  { name: '카드', value: 10, color: 'Coral' },
  { name: '현금', value: 50, color: '#00ab6b' },
  { name: '적금', value: 30, color: '#00ab6b' },
  { name: '적금', value: 30, color: '#00ab6b' },
  { name: '적금', value: 30, color: '#00ab6b' },
];

const mockDataByDate: LineChartData[] = [
  {
    name: 'A',
    datetime: new Date('2021-07-21'),
    value: 10,
  },
  {
    name: 'B',
    datetime: new Date('2021-07-22'),

    value: 30,
  },
  {
    name: 'C',
    datetime: new Date('2021-07-23'),

    value: 50,
  },
  {
    name: 'D',
    datetime: new Date('2021-07-24'),
    value: 40,
  },
  {
    name: 'D',
    datetime: new Date('2021-07-25'),
    value: 50,
  },
  {
    name: 'D',
    datetime: new Date('2021-07-26'),
    value: 5,
  },
];

interface IState {
  dataByCategory?: PieChartData[];
  dataByDate?: LineChartData[];
}
interface IProps {}

export default class StatisticPage extends Component<IState, IProps> {
  template() {
    return /* html */ `
            <div class='statistic-container'>
              <div class="chart-container">
                <svg id="pie-chart"></svg>
                <div class="category-container">
                  <h1 class="category-container--title">이번 달 지출 금액 843,000 </h1>
                </div>
              </div>
              <div class="sub-chart-container">
                <svg id="line-chart"></svg>
              </div>
            </div>
          `;
  }

  setup() {
    this.$state = { dataByCategory: [], dataByDate: [] };
    setTimeout(() => {
      this.setState({
        dataByCategory: mockDataByCategory,
        dataByDate: mockDataByDate,
      });
    }, 300);
  }

  mounted() {
    const $pieChart = document.querySelector('#pie-chart') as SVGElement;
    const { dataByCategory, dataByDate } = this.$state;

    PieChart.init($pieChart, dataByCategory, {
      onClick: (d: string) => {
        console.log('click: ' + d);
      },
    });

    if (this.$state.dataByDate && this.$state.dataByDate.length > 0) {
      const $lineChart = document.querySelector('#line-chart') as SVGElement;
      LineChart.init($lineChart, dataByDate);
    }
  }
}
