fetch('data.json')
.then(response => response.json())
.then(data => {
    createChart(data);

})
.catch(error => console.error('error fetching data:', error));

function createChart(data) {


    // map the Json data to the chart's data format
    const days = data.map(item => item.day);
    const amounts = data.map(item => item.amount);
    

    const defaultBarColor = '#EC755D';
    const currentDayColor = '#76B5BC'

    //get today's day as a string
    const today = new Date().toLocaleString('en-us',{weekday: 'short'}).toLowerCase();

    //create an array for the backgroundproperty
    const backgroundColors = days.map(day => day === today? currentDayColor : defaultBarColor);


    



    const ctx = document.getElementById('myExpensesChart').getContext('2d');
    const myExpensesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: 'My Expenses ',
                data: amounts,
                backgroundColor: backgroundColors,
                  borderWidth: 1
                  
            }]
        },
        options: {
            plugins: {
                legend: {
                  display: false // This will hide the legend
                },
                tooltip: {
                    enabled: true, //Enable toolkits
                    mode: 'index', //show all items in the same index
                    intersect: true, //show tooltips even when not extactly hovering over an item
                    callbacks: {
                        label: function(tooltipItem, data) {
                            // You can access the value of the hovered data point like this:
                            const value = tooltipItem.parsed.y;
                            // And then return the string you want to display in the tooltip:
                            return 'My expenses: $' + value;
                        }
                    }
                }
            },

            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                        beginAtZero: true,
                        grid: {
                            display: false

                        },
                        ticks: {
                            display: false
                        }
                }
        
            }
        }
    })

}




