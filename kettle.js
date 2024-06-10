document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/data?device=kettle')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('kettleChart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.time,
                    datasets: [{
                        label: 'Kettle Power Consumption',
                        data: data.power,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
