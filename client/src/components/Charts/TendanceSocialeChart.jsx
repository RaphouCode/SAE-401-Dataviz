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
        borderColor: '#0039a2', // Primary
        backgroundColor: '#0039a2',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Taux de pauvreté (%)',
        data: pauvrete,
        borderColor: '#e9a2ef', // Accent
        backgroundColor: '#e9a2ef',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderWidth: 2,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: { usePointStyle: true, boxWidth: 8, padding: 20 }
      },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        min: 0,
        grid: { borderDash: [4, 4] },
        title: {
          display: false,
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
