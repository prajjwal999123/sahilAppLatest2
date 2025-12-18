import { db } from './firebase-config.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async () => {
    const bookingGrid = document.getElementById('booking-branches-grid');
    const deliveryGrid = document.getElementById('delivery-states-grid');

    // Function to render booking branches
    const renderBookingBranches = (branches) => {
        if (bookingGrid) {
            bookingGrid.innerHTML = ''; // Clear loading message
            if (branches.length === 0) {
                bookingGrid.innerHTML = '<p>No booking branches available at the moment.</p>';
                return;
            }
            branches.forEach(branch => {
                const card = document.createElement('div');
                card.className = 'branch-card';
                card.innerHTML = `
                    <div class="branch-card-header">
                        <div class="branch-card-icon"><i class="fas fa-building"></i></div>
                        <h3>${branch.name}</h3>
                    </div>
                    <p><i class="fas fa-map-marker-alt"></i>${branch.address}</p>
                    <p><i class="fas fa-phone-alt"></i>${branch.phone}</p>
                    <p><i class="fas fa-user-tie"></i>Contact: ${branch.contactPerson}</p>
                    <a href="${branch.location}" target="_blank">Get Directions</a>
                `;
                bookingGrid.appendChild(card);
            });
        }
    };

    // Function to render delivery states
    const renderDeliveryStates = (states) => {
        if (deliveryGrid) {
            deliveryGrid.innerHTML = ''; // Clear loading message
            if (states.length === 0) {
                deliveryGrid.innerHTML = '<p>No delivery states available at the moment.</p>';
                return;
            }
            states.forEach(state => {
                const card = document.createElement('div');
                card.className = 'branch-card';
                card.innerHTML = `
                    <div class="branch-card-header">
                        <div class="branch-card-icon"><i class="fas fa-truck"></i></div>
                        <h3>${state.state}</h3>
                    </div>
                    <p><i class="fas fa-check-circle"></i>Service Available</p>
                    <a href="${state.link}" target="_blank">Check Coverage</a>
                `;
                deliveryGrid.appendChild(card);
            });
        }
    };

    // Fetch and render booking branches from Firestore
    try {
        const bookingBranchesRef = collection(db, 'bookingBranches');
        const bookingSnapshot = await getDocs(bookingBranchesRef);
        const bookingBranches = bookingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderBookingBranches(bookingBranches);
    } catch (error) {
        console.error("Error fetching booking branches: ", error);
        if (bookingGrid) {
            bookingGrid.innerHTML = '<p>Error loading branches. Please try again later.</p>';
        }
    }

    // Fetch and render delivery states from Firestore
    try {
        const deliveryStatesRef = collection(db, 'deliveryBranches');
        const deliverySnapshot = await getDocs(deliveryStatesRef);
        const deliveryStates = deliverySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderDeliveryStates(deliveryStates);
    } catch (error) {
        console.error("Error fetching delivery states: ", error);
        if (deliveryGrid) {
            deliveryGrid.innerHTML = '<p>Error loading delivery states. Please try again later.</p>';
        }
    }
});
