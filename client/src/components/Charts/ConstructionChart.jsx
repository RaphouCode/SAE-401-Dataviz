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
          '#cbd5e1', // Gris élégant pour 'Moyenne 10 ans'
          '#0c2e57', // Navy profond pour 'Année en cours'
        ],
        borderRadius: 6,
        barThickness: 40,
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
