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

export default function RenouvellementParcSocialChart({ data }) {
  if (!data || data.length === 0) return null;

  const labels = data.map(d => d.action);
  const values = data.map(d => d.valeur);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Mouvements (unités)',
        data: values,
        backgroundColor: [
          '#10b981', // Vert pour 'Mis en location'
          '#ef4444', // Rouge pour 'Démolis'
          '#f59e0b', // Orange pour 'Vendus'
        ],
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div style={{ height: '220px', width: '100%' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
