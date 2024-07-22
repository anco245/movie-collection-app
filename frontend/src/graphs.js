import React, { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distribution by Decade',
    },
  },
};

const data = {
  labels: ['1920-1929', '1930-1939', '1940-1949', '1950-1959', '1960-1969', '1970-1979', '1980-1989', '1990-1999', '2000-2009', '2010-2019', '2020-2029'],
  datasets: [
    {
      label: 'Distribution by Decade',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [],
    },
  ],
};

function addData(results, setResults) {
  let postResults = [];

  console.log("results: " + results.);

  results.forEach(element => {
    postResults.push(element["movie_count"]);
  });

  data.datasets[0].data = postResults;
}

export default function Graph() {

  const [results, setResults] = useState([]);

  const url = "http://localhost:8080/movies/graphdata";

  const getInfo = useCallback(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        setResults(JSON.parse(xhr.responseText));
      }
    };
    xhr.send();
  }, url);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  addData({results}, {setResults});

  return (
    <div className="barGraph">
      <Bar data={data} options={options} />
    </div>
  );
}