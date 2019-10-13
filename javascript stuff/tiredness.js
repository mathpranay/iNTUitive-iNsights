var drowsydata = [86,114,106,106,107,111,133,221,783,278]
var labels =[]
for (i=0;i<=drowsydata.length;i++){
    labels.push(i)
}

new Chart(document.getElementById("MyChart"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{ 
          data: drowsydata,
          label: "Africa",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
  });