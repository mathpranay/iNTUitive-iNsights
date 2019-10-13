var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://127.0.0.1:5000/data/",
    "method": "GET",
    "headers": {
      "Accept": "*/*",
      "Cache-Control": "no-cache",
      "Host": "127.0.0.1:5000",
      "Connection": "keep-alive",
      "cache-control": "no-cache"
    }
  }
  
  $.ajax(settings).done(function (response) {
    //console.log(typeof(response))
    response = JSON.parse(response)
    //console.log(response)
    
    time_away = response.time_away
    var length1 = Object.keys(time_away).length;
    var time =[];
    var i;
    for(i=0;i<length1;++i)
    {
    time.push(time_away[i]);
    }
    
    
    Blinks =response.Blinks
    var length2 = Object.keys(Blinks).length;
    var blink =[];
    var i;
    for(i=0;i<length2;++i)
    {
    blink.push(Blinks[i]);
    
    }
    
    
    
    Looked_Away =response.Looked_Away
    var length3 = Object.keys(Looked_Away).length;
    var away =[];
    var i;
    for(i=0;i<length3;++i)
    {
    away.push(Looked_Away[i]);
    
    }
    
    
    
    Total_working_time= response.Total_working_time
    var length4 = Object.keys(Total_working_time).length;
    var work =[];
    var i;
    for(i=0;i<length4;++i)
    {
    work.push(Total_working_time[i]);
    
    }
    
    
    
    yawn =response.yawn
    var length5 = Object.keys(yawn).length;
    var Yawn =[];
    var i;
    for(i=0;i<length5;++i)
    {
    Yawn.push(yawn[i]);
    
    }

    
    
    
    time_smiling =response["time_smiling"]
    var length6 = Object.keys(time_smiling).length;
    var smile =[];
    var i;
    for(i=0;i<length6;++i)
    {
    smile.push(time_smiling[i]);
    }

    drowsy_times = response.drowsy_times
    var length7 = Object.keys(drowsy_times).length;
    var Drowse1 =[];
    var i;
    for(i=0;i<length7;++i)
    {
    Drowse1.push(drowsy_times);
    }
    //console.log(Drowse1)
    var length8 = Object.keys(Drowse1).length;
    var Drowse =[];
    var i;
    for(i=0;i<length8;++i)
    {
    Drowse.push(Drowse1);
    }
    // console.log(Drowse)
    //console.log(Drowse.length)
    Drowse = Drowse1[Drowse.length-1][Drowse.length-1]
    Drowse = Drowse.slice(1,-1)
    Drowse = Drowse.split(', ')
    for(i=0;i<Drowse.length;i++){
        Drowse[i]=parseInt(Drowse[i])
    }
    dist_times = response.dist_times
    var length9 = Object.keys(dist_times).length;
    var dist =[];
    var i;
    for(i=0;i<length9;++i)
    {
    dist.push(dist_times[i]);
    }
    dist = dist[dist.length-1]
    dist = dist.slice(2,-2)
    dist = dist.split('], [')
    for(i=0;i<dist.length;i++){
        dist[i]= dist[i].split(', ')
        for(j=0;j<2;j++){
            dist[i][j] = parseFloat(dist[i][j])
        }
    }

    

    

const yawndata = Yawn
var yawnaverage = 0

for(i=0;i<yawndata.length-1;i++){
    yawnaverage+=yawndata[i]
}
yawnaverage =yawnaverage/(yawndata.length-1)

yawnlast = yawndata[yawndata.length-1]

var ctx = document.getElementById('yawn');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Average', 'Last Session'],
        datasets: [{
            label: 'number of yawns',
            data: [yawnaverage, yawnlast],
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

const blinkdata = blink
var blinkaverage = 0


for(i=0;i<blinkdata.length-1;i++){
    blinkaverage+=blinkdata[i]
}
blinkaverage =blinkaverage/(blinkdata.length-1)

blinklast = blinkdata[blinkdata.length-1]

var ctx = document.getElementById('blink');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Average', 'Last Session'],
        datasets: [{
            label:'number of links',
            data: [blinkaverage, blinklast],
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

const workdata = work
var workaverage = 0

for(i=0;i<workdata.length-1;i++){
    workaverage+=workdata[i]
}
workaverage =workaverage/(workdata.length-1)

worklast = workdata[workdata.length-1]

var ctx = document.getElementById('work');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Average', 'Last Session'],
        datasets: [{
            data: [workaverage, worklast],
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


var drowsydata = Drowse
var labels =[]
for (i=0;i<=drowsydata.length;i++){
    labels.push(i)
}

new Chart(document.getElementById("tiredness"), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{ 
          data: drowsydata,
          label: "Drowsiness",
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        //text: 'World population per region (in millions)'
      }
    }
  });

var middles = []
for(i=0;i<dist.length;i++){
    middles[i]=(dist[i][0]+dist[i][1])/2
}
var radii =[]
for(i=0;i<dist.length;i++){
    radii[i]=(dist[i][1]-dist[i][0])/2
}



new Chart(document.getElementById("distraction"), {
    type: 'pie',
    data: {
      //labels: 
      datasets: [{ 
          data: [work[work.length-1],(smile[smile.length-1]+time[time.length-1])],
          label: "Drowsiness",
          backgroundColor: [
            'rgba(255,106,0,1)',
            'rgba(189,7,96,0.8)'],
          borderColor: "#3e95cd",
          fill: true
        }
      ],
      labels: ['Productive Time','Unproductive Time']
    },
    options: {
      title: {
        display: false,
      }
    }
  });
  });

  

  


