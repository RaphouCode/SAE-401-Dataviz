import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TendanceSocialeChart({ data }) {
  if (!data || data.length === 0) return null;

  const labels = data.map(d => d.annee);
  const chomage = data.map(d => d.chomage);
  const pauvrete = data.map(d => d.pauvrete);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Taux de chômage (%)',
        data: chomage,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Taux de pauvreté (%)',
        data: pauvrete,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        title: {
          display: true,
          text: '%'
        }
      }
    }
  };

  return (
    <div style={{ height: '250px', width: '100%' }}>
      <Line options={options} data={chartData} />
    </div>
  );
}
