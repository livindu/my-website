document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple validation (for demonstration purposes only)
    if (username === 'admin' && password === 'admin') {
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
});

let powerChart;

function fetchChartData(device) {
    fetch(`/api/data?device=${device}`)
        .then(response => response.json())
        .then(data => updateChart(data))
        .catch(error => console.error('Error fetching data:', error));
}

function updateChart(data) {
    const ctx = document.getElementById('powerChart').getContext('2d');
    if (powerChart) {
        powerChart.destroy();
    }
    powerChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.time,
            datasets: [{
                label: 'Power Consumption',
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
}

function showIframe(device) {
    document.getElementById('deviceIframe').style.display = 'block';
    document.getElementById('deviceIframe').src = `/${device}.html`;
    document.getElementById('powerChart').style.display = 'none';
    document.getElementById('chartTitle').style.display = 'none';
}

function showMainChart() {
    document.getElementById('deviceIframe').style.display = 'none';
    document.getElementById('powerChart').style.display = 'block';
    document.getElementById('chartTitle').style.display = 'block';
    fetchChartData('main');
}

function logout() {
    window.location.href = 'login.html';
}


document.addEventListener('DOMContentLoaded', function() {
    showMainChart();
});
