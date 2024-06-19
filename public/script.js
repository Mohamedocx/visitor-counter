document.addEventListener("DOMContentLoaded", function() {
    const visitorCountElement = document.getElementById("visitorCount");

    // Fetch the visitor count from the server
    fetch('/api/visitorCount')
        .then(response => response.json())
        .then(data => {
            visitorCountElement.textContent = data.count;
        })
        .catch(error => console.error('Error fetching visitor count:', error));
}); 
