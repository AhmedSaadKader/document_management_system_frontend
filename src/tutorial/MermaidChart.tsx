import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
  chart: string; // Mermaid syntax string
}

const MermaidChart: React.FC<MermaidChartProps> = ({ chart }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });

    const renderChart = async () => {
      try {
        if (chartRef.current) {
          chartRef.current.innerHTML = '';
          const { svg } = await mermaid.render('mermaid-chart', chart);
          chartRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error((err as Error).message);
      }
    };

    renderChart();
  }, [chart]);

  return <div ref={chartRef} className='mermaid' />;
};

export default MermaidChart;
