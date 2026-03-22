import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MoteursDemographiquesChart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: ['Moteurs'],
    datasets: data.map(d => ({
      label: d.type,
      data: [d.valeur],
      backgroundColor: d.type === 'Naturel' ? '#10b981' : '#f59e0b',
    }))
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Variation pour 10 000 hab'
        }
      },
      y: {
        stacked: true,
        display: false
      }
    }
  };

  return (
    <div style={{ height: '120px', width: '100%' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
