
import { db } from './firebase-config.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        const welcomeMessage = document.querySelector('.hero-content p');
        if(welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${username}. Manage your website content with ease.`;
        }
    }

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('username');
            window.location.href = 'admin.html';
        });
    }

    const manageBookingBtn = document.getElementById('manage-booking-btn');
    const manageDeliveryBtn = document.getElementById('manage-delivery-btn');
    const bookingBranchManagement = document.getElementById('booking-branch-management');
    const deliveryBranchManagement = document.getElementById('delivery-branch-management');

    if (manageBookingBtn && manageDeliveryBtn && bookingBranchManagement && deliveryBranchManagement) {
        bookingBranchManagement.classList.add('active');
        deliveryBranchManagement.classList.remove('active');

        manageBookingBtn.addEventListener('click', () => {
            bookingBranchManagement.classList.add('active');
            deliveryBranchManagement.classList.remove('active');
        });

        manageDeliveryBtn.addEventListener('click', () => {
            deliveryBranchManagement.classList.add('active');
            bookingBranchManagement.classList.remove('active');
        });
    }

    if (document.body.classList.contains('admin-dashboard-page')) {
        const addBookingBranchForm = document.getElementById('add-booking-branch-form');
        const bookingBranchList = document.getElementById('booking-branch-list');
        const editBookingBranchPopup = document.getElementById('edit-booking-branch-popup');
        const editBookingBranchForm = document.getElementById('edit-booking-branch-form');

        const renderAdminBookingBranches = async () => {
            if (bookingBranchList) {
                bookingBranchList.innerHTML = '';
                const querySnapshot = await getDocs(collection(db, "bookingBranches"));
                querySnapshot.forEach((doc) => {
                    const branch = doc.data();
                    const item = document.createElement('div');
                    item.className = 'branch-item';
                    let locationLink = branch.location ? `<p><b>Location :-</b> <a href="${branch.location}" target="_blank">View on Map</a></p>` : '';
                    item.innerHTML = `<div>
                                            <h3>${branch.name}</h3>
                                            <p><b>Address :-</b> ${branch.address}</p>
                                            <p><b>Phone No. :-</b> ${branch.phone}</p>
                                            ${locationLink}
                                        </div>
                                        <div class="branch-actions">
                                            <button data-id="${doc.id}" class="edit-booking cta-button"><i class="fas fa-edit"></i> Edit</button>
                                            <button data-id="${doc.id}" class="remove-booking cta-button"><i class="fas fa-trash"></i> Delete</button>
                                        </div>`;
                    bookingBranchList.appendChild(item);
                });
            }
        };

        if (addBookingBranchForm) {
            addBookingBranchForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await addDoc(collection(db, "bookingBranches"), {
                    name: document.getElementById('booking-branch-name').value,
                    address: document.getElementById('booking-branch-address').value,
                    phone: document.getElementById('booking-branch-phone').value,
                    location: document.getElementById('booking-branch-location').value
                });
                renderAdminBookingBranches();
                addBookingBranchForm.reset();
            });
        }

        if (bookingBranchList) {
            bookingBranchList.addEventListener('click', async (e) => {
                const targetButton = e.target.closest('button');
                if (targetButton && targetButton.classList.contains('remove-booking')) {
                    await deleteDoc(doc(db, "bookingBranches", targetButton.dataset.id));
                    renderAdminBookingBranches();
                } else if (targetButton && targetButton.classList.contains('edit-booking')) {
                    const id = targetButton.dataset.id;
                    const querySnapshot = await getDocs(collection(db, "bookingBranches"));
                    const docToEdit = querySnapshot.docs.find(doc => doc.id === id);
                    if (docToEdit) {
                        const branch = docToEdit.data();
                        document.getElementById('edit-booking-branch-id').value = id;
                        document.getElementById('edit-booking-branch-name').value = branch.name;
                        document.getElementById('edit-booking-branch-address').value = branch.address;
                        document.getElementById('edit-booking-branch-phone').value = branch.phone;
                        document.getElementById('edit-booking-branch-location').value = branch.location || '';
                        editBookingBranchPopup.style.display = 'flex';
                    }
                }
            });
        }

        if (editBookingBranchForm) {
            editBookingBranchForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = document.getElementById('edit-booking-branch-id').value;
                await updateDoc(doc(db, "bookingBranches", id), {
                    name: document.getElementById('edit-booking-branch-name').value,
                    address: document.getElementById('edit-booking-branch-address').value,
                    phone: document.getElementById('edit-booking-branch-phone').value,
                    location: document.getElementById('edit-booking-branch-location').value
                });
                renderAdminBookingBranches();
                editBookingBranchPopup.style.display = 'none';
            });
        }

        const addDeliveryBranchForm = document.getElementById('add-delivery-branch-form');
        const deliveryBranchList = document.getElementById('delivery-branch-list');
        const editDeliveryBranchPopup = document.getElementById('edit-delivery-branch-popup');
        const editDeliveryBranchForm = document.getElementById('edit-delivery-branch-form');

        const renderAdminDeliveryBranches = async () => {
            if (deliveryBranchList) {
                deliveryBranchList.innerHTML = '';
                const querySnapshot = await getDocs(collection(db, "deliveryBranches"));
                querySnapshot.forEach((doc) => {
                    const branch = doc.data();
                    const item = document.createElement('div');
                    item.className = 'branch-item';
                    item.innerHTML = `<div><h3>${branch.state}</h3><p><a href="${branch.link}" target="_blank">${branch.link}</a></p></div>
                                        <div class="branch-actions">
                                            <button data-id="${doc.id}" class="edit-delivery cta-button"><i class="fas fa-edit"></i> Edit</button>
                                            <button data-id="${doc.id}" class="remove-delivery cta-button"><i class="fas fa-trash"></i> Delete</button>
                                        </div>`;
                    deliveryBranchList.appendChild(item);
                });
            }
        };

        if (addDeliveryBranchForm) {
            addDeliveryBranchForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await addDoc(collection(db, "deliveryBranches"), {
                    state: document.getElementById('delivery-branch-state').value,
                    link: document.getElementById('delivery-branch-link').value
                });
                renderAdminDeliveryBranches();
                addDeliveryBranchForm.reset();
            });
        }

        if (deliveryBranchList) {
            deliveryBranchList.addEventListener('click', async (e) => {
                const targetButton = e.target.closest('button');
                if (targetButton && targetButton.classList.contains('remove-delivery')) {
                    await deleteDoc(doc(db, "deliveryBranches", targetButton.dataset.id));
                    renderAdminDeliveryBranches();
                } else if (targetButton && targetButton.classList.contains('edit-delivery')) {
                    const id = targetButton.dataset.id;
                    const querySnapshot = await getDocs(collection(db, "deliveryBranches"));
                    const docToEdit = querySnapshot.docs.find(doc => doc.id === id);
                    if (docToEdit) {
                        const branch = docToEdit.data();
                        document.getElementById('edit-delivery-branch-id').value = id;
                        document.getElementById('edit-delivery-branch-state').value = branch.state;
                        document.getElementById('edit-delivery-branch-link').value = branch.link;
                        editDeliveryBranchPopup.style.display = 'flex';
                    }
                }
            });
        }

        if (editDeliveryBranchForm) {
            editDeliveryBranchForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const id = document.getElementById('edit-delivery-branch-id').value;
                await updateDoc(doc(db, "deliveryBranches", id), {
                    state: document.getElementById('edit-delivery-branch-state').value,
                    link: document.getElementById('edit-delivery-branch-link').value
                });
                renderAdminDeliveryBranches();
                editDeliveryBranchPopup.style.display = 'none';
            });
        }

        document.querySelectorAll('.close-button').forEach(button => {
            button.addEventListener('click', () => {
                button.closest('.popup').style.display = 'none';
            });
        });

        renderAdminBookingBranches();
        renderAdminDeliveryBranches();
    }
});
