import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function SanteParcSocialChart({ data }) {
  if (!data || data.length === 0) return null;

  const labels = data.map(d => d.indicateur);
  const values = data.map(d => d.valeur);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Taux (%)',
        data: values,
        backgroundColor: [
          '#0039a2', // Bleu pour vacance
          '#f59e0b', // Orange pour passoires thermiques
        ],
        borderRadius: 6,
        barThickness: 32,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Barres horizontales pour une meilleure lisibilité
    scales: {
      x: {
        beginAtZero: true,
        suggestedMax: 20,
        grid: { borderDash: [4, 4] }
      },
      y: {
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div style={{ height: '180px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
