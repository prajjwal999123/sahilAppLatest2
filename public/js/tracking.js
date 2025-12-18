document.addEventListener('DOMContentLoaded', () => {
    const trackingForm = document.getElementById('tracking-form');
    const trackingResults = document.getElementById('tracking-results');

    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const trackingNumber = document.getElementById('tracking-number').value.trim();

        if (trackingNumber) {
            fetchShipmentDetails(trackingNumber);
        }
    });

    function fetchShipmentDetails(trackingNumber) {
        const db = firebase.database();
        const shipmentRef = db.ref('shipments/' + trackingNumber);

        shipmentRef.on('value', (snapshot) => {
            const shipment = snapshot.val();
            if (shipment) {
                displayShipmentDetails(shipment);
            } else {
                trackingResults.innerHTML = '<p>No shipment found with this tracking number.</p>';
            }
        });
    }

    function displayShipmentDetails(shipment) {
        let html = `
            <h2>Shipment Details</h2>
            <p><strong>Tracking Number:</strong> ${shipment.trackingNumber}</p>
            <p><strong>Status:</strong> ${shipment.status}</p>
            <p><strong>Location:</strong> ${shipment.location}</p>
            <p><strong>Last Updated:</strong> ${new Date(shipment.timestamp).toLocaleString()}</p>
        `;
        trackingResults.innerHTML = html;
    }
});
