// SIMULATED ADMIN CONNECTION
// This allows you to set variables in the browser console to change the site content without editing code.
// Example: run setAdminData('coupon', 'SUPER50') in console.

function setAdminData(key, value) {
    localStorage.setItem('rv_' + key, value);
    location.reload();
}

// Apply Saved Data
const savedCoupon = localStorage.getItem('rv_coupon');
if(savedCoupon) {
    document.querySelector('.code-box').innerText = savedCoupon;
    document.querySelector('.toast-content p strong').innerText = "Special Deal!";
}

const savedPhone = localStorage.getItem('rv_phone');
if(savedPhone) {
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
        let href = link.getAttribute('href');
        // Simple regex replace for standard format
        link.setAttribute('href', href.replace(/923285796234/, savedPhone));
    });
}