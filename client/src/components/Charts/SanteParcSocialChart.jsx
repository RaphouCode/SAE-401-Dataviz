import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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
        backgroundColor: 'rgba(239, 68, 68, 0.2)', // Rouge clair
        borderColor: '#ef4444',
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#ef4444',
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: Math.max(...values, 15) // Pour avoir une échelle correcte
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div style={{ height: '250px', width: '100%' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
}
