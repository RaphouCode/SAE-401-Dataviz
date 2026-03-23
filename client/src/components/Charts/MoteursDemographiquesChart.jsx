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

export default function MoteursDemographiquesChart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: ['Moteurs'],
    datasets: data.map(d => ({
      label: d.type,
      data: [d.valeur],
      // `#0039a2` for Naturel, `#f2bde7` for Migratoire for brand consistency
      backgroundColor: d.type === 'Naturel' ? '#0039a2' : '#f2bde7',
      borderRadius: 6,
      barThickness: 32,
    }))
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: { usePointStyle: true, boxWidth: 8, padding: 20 }
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { borderDash: [4, 4] },
        title: { display: false }
      },
      y: {
        stacked: true,
        display: false,
        grid: { display: false }
      }
    }
  };

  return (
    <div style={{ height: '120px', width: '100%' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
