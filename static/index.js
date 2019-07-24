var ctx = document.getElementById('myChart').getContext('2d');
fetch('/7-days')
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data)
    let dates = data.map(row => row.timestamp).map(date => moment.utc(date).format("L LTS"))
    console.log('dates :', dates);
    let temp = data.map(row => row.temperature)
    console.log('temp :', temp);
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
  
      // The data for our dataset
      data: {
          labels: dates,
          datasets: [{
              label: 'Temperature',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: temp
          }]
      },
  
      // Configuration options go here
      options: {}
    });
  })

