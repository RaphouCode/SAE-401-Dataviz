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
          '#0039a2', // Primary pour 'Mis en location'
          '#173672', // Secondary pour 'Démolis'
          '#e9a2ef', // Accent pour 'Vendus'
        ],
        borderRadius: 6,
        barThickness: 36,
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
      x: {
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        grid: { borderDash: [4, 4] }
      }
    }
  };

  return (
    <div style={{ height: '220px', width: '100%' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
