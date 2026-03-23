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
          '#0039a2', // Principales (Primary)
          '#e9a2ef', // Vacants (Accent)
          '#173672', // Secondaires (Secondary)
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'right',
        labels: { usePointStyle: true, padding: 15 }
      },
    },
    cutout: '65%',
  };

  return (
    <div style={{ height: '200px', width: '100%' }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
