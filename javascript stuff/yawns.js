const data = [1,3,32,1,24,2,3,1,8]
console.log(data[1])
var average = 0

for(i=0;i<data.length-1;i++){
    average+=data[i]
}
average =average/(data.length-1)

last = data[data.length-1]

var ctx = document.getElementById('yawn');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Average', 'Last Session'],
        datasets: [{
            label: '# of Votes',
            data: [average, last],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});