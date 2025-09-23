"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatDate } from "@/lib/dateUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface RankingHistory {
  changedBy: number;
  changedTo: number;
  reason: string;
  olympiadId: string;
  date: string;
  pointsGained?: number;
}

interface RankingChartProps {
  rankingHistory: RankingHistory[];
  currentRanking: number;
}

const RankingChart: React.FC<RankingChartProps> = ({
  rankingHistory,
  currentRanking,
}) => {
  const processRankingData = () => {
    if (!rankingHistory?.length) {
      return {
        labels: ["Initial", "Current"],
        datasets: [
          {
            label: "Ranking",
            data: [currentRanking, currentRanking],
            borderColor: "rgb(255, 132, 0)",
            backgroundColor: "rgba(255, 132, 0, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      };
    }

    const sortedHistory = [...rankingHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const labels = ["Initial"];
    const data = [sortedHistory[0]?.changedBy || currentRanking];

    sortedHistory.forEach((entry) => {
      labels.push(formatDate(entry.date));
      data.push(entry.changedTo);
    });

    if (
      sortedHistory.length > 0 &&
      sortedHistory[sortedHistory.length - 1].changedTo !== currentRanking
    ) {
      labels.push("Current");
      data.push(currentRanking);
    }

    return {
      labels,
      datasets: [
        {
          label: "Ranking",
          data,
          borderColor: "rgb(255, 132, 0)",
          backgroundColor: "rgba(255, 132, 0, 0.1)",
          pointBackgroundColor: "rgb(255, 132, 0)",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const chartData = processRankingData();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgb(255, 132, 0)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context: any) => context[0].label,
          label: (context: any) => `Ranking: ${context.parsed.y}`,
          afterLabel: (context: any) => {
            const index = context.dataIndex;
            if (index > 0 && rankingHistory?.length) {
              const sortedHistory = [...rankingHistory].sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              );
              const entry = sortedHistory[index - 1];
              if (entry) {
                const change = entry.changedBy;
                const changeText = change > 0 ? `+${change}` : `${change}`;
                const changeDirection =
                  change > 0
                    ? "↑ (Better)"
                    : change < 0
                    ? "↓ (Worse)"
                    : "→ (Same)";
                return [
                  `Change: ${changeText} ${changeDirection}`,
                  `Reason: ${entry.reason}`,
                  entry.pointsGained
                    ? `Points Gained: +${entry.pointsGained}`
                    : "",
                ].filter(Boolean);
              }
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 12 } },
      },
      y: {
        reverse: false,
        grid: { color: "rgba(107, 114, 128, 0.1)" },
        ticks: {
          color: "#6b7280",
          font: { size: 12 },
          callback: (value: any) => `${value}`,
        },
        title: {
          display: true,
          text: "Ranking Position",
          color: "#6b7280",
          font: { size: 14, weight: "bold" as const },
        },
      },
    },
    interaction: { intersect: false, mode: "index" as const },
  };

  if (!rankingHistory?.length) {
    return (
      <div className="h-56 flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center text-gray-600">
          <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No Ranking History
          </h3>
          <p className="text-sm text-gray-600">
            Your ranking history will appear here once you participate in
            olympiads.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-56 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RankingChart;
