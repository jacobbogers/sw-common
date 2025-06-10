// @ts-nocheck
import {
  Chart,
  Colors,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend
} from 'chart.js'

Chart.register(
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend
);

import { getAquisitionsByYear } from './api'

(async function() {
  const data = await getAquisitionsByYear();

  // nonbody say you need to use an id aslong as it is 
  const canvasNodeWrapper = document.querySelector('[data-chart-name="i-have-canvas"]');
  const canvasNode = canvasNodeWrapper.querySelector('canvas');
  new Chart(
    canvasNode,
    {
      type: 'bar',
      options: {
        animation: false,
        plugins: {
          legend: {
            display: true
          },
          tooltip: {
            enabled: true
          }
        }
      },
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();