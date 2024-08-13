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

const initialData = {
  labels: ['1920-1929', '1930-1939', '1940-1949', '1950-1959', '1960-1969', '1970-1979', '1980-1989', '1990-1999', '2000-2009', '2010-2019', '2020-2029'],
  datasets: [
    {
      label: 'Amount',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [],
    },
  ],
};

export default function Graph() {

  const [data, setData] = useState(initialData);
  const url = "http://localhost:8080/movies/graphdata";

  const getInfo = useCallback(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const decades = {1920: 0,
                      1930: 0,
                      1940: 0,
                      1950: 0,
                      1960: 0,
                      1970: 0,
                      1980: 0,
                      1990: 0,
                      2000: 0,
                      2010: 0,
                      2020: 0};

        const results = JSON.parse(xhr.responseText);
        results.forEach(element => (decades[element["decade"]] = element["movie_count"]));

        const arrayOfDecadesValues = Object.values(decades);

        setData(prevData => ({
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: arrayOfDecadesValues,
          }]
        }));

      }
    };
    xhr.send();
  }, [url]);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <div className="barGraph">
      <Bar data={data} options={options} />
    </div>
  );
}