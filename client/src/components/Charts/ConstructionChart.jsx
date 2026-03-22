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

export default function ConstructionChart({ data }) {
  if (!data || data.length === 0) return null;

  const labels = data.map(d => d.periode);
  const values = data.map(d => d.volume);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Volume de construction',
        data: values,
        backgroundColor: [
          '#9ca3af', // Gris pour 'Moyenne 10 ans'
          '#8b5cf6', // Violet pour 'Année en cours'
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
