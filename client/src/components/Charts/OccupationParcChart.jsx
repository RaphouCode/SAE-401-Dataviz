import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OccupationParcChart({ data }) {
  if (!data || data.length === 0) return null;

  const labels = data.map(d => d.nom);
  const values = data.map(d => d.valeur);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#3b82f6', // Principales
          '#ef4444', // Vacants
          '#10b981', // Secondaires
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
    },
    cutout: '60%',
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
