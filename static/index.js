var ctx = document.getElementById('myChart').getContext('2d');
fetch('/2-days')
  .then(res => {
    return res.json()
  })
  .then(data => {
    let dates = data.map(row => row.timestamp).map(date => moment.utc(date).format("DD/MM LT"))
    let temp = data.map(row => row.temperature)
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
          data: temp,
          // xAxisID: 'test'
        }]
      },

      // Configuration options go here
      options: {
        scales: {
          yAxes: [{
            ticks: {
              suggestedMin: 15,
              suggestedMax: 20
            }
          }]
        }
      }
    });
  })

const tempsRestantBout = document.getElementById('tempsWeekReste')
var dateBout = moment("2019-11-17")
tempsRestantBout.textContent = dateBout.fromNow()

const tempsRestantDegus = document.getElementById('tempsWeekResteDegus')
var dateDegus = moment("2019-12-01")
tempsRestantDegus.textContent = dateDegus.fromNow()