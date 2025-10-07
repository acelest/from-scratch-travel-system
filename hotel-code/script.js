// Hotel data
const hotels = [
    {
        id: 1,
        name: "The Grand Palace",
        location: "New York, USA",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 5,
        price: "$299/night",
        facilities: [
            { icon: "🏊", name: "Swimming Pool", description: "Olympic-sized outdoor pool" },
            { icon: "🍽️", name: "Fine Dining", description: "Michelin-starred restaurant" },
            { icon: "💆", name: "Spa & Wellness", description: "Full-service luxury spa" },
            { icon: "🏋️", name: "Fitness Center", description: "24/7 state-of-the-art gym" },
            { icon: "🚗", name: "Valet Parking", description: "Complimentary valet service" },
            { icon: "📶", name: "Free WiFi", description: "High-speed internet" }
        ],
        packages: [
            {
                name: "Luxury Suite",
                price: "$399",
                features: ["Ocean view", "King size bed", "Private balcony", "Butler service", "Complimentary breakfast"]
            },
            {
                name: "Presidential Suite",
                price: "$799",
                features: ["2 bedrooms", "Private dining room", "Personal chef", "Limousine service", "Premium amenities"]
            },
            {
                name: "Romantic Getaway",
                price: "$499",
                features: ["Honeymoon suite", "Champagne welcome", "Couple's massage", "Private dinner", "Late checkout"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 2,
        name: "Ocean Vista Resort",
        location: "Malibu, California",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4,
        price: "$249/night",
        facilities: [
            { icon: "🏖️", name: "Private Beach", description: "Exclusive beachfront access" },
            { icon: "🛥️", name: "Water Sports", description: "Kayaking, surfing, sailing" },
            { icon: "🎾", name: "Tennis Court", description: "Professional tennis facilities" },
            { icon: "🍹", name: "Beach Bar", description: "Tropical cocktails by the ocean" },
            { icon: "🌺", name: "Tropical Gardens", description: "Lush landscaped grounds" },
            { icon: "🚁", name: "Helicopter Pad", description: "Private helicopter transfers" }
        ],
        packages: [
            {
                name: "Oceanview Deluxe",
                price: "$329",
                features: ["Ocean view", "Private terrace", "Mini bar", "Beach access", "Continental breakfast"]
            },
            {
                name: "Beachfront Villa",
                price: "$599",
                features: ["Direct beach access", "Private pool", "2 bedrooms", "Personal concierge", "All meals included"]
            },
            {
                name: "Surfer's Paradise",
                price: "$399",
                features: ["Surf lessons", "Board rental", "Wetsuit included", "Beach picnic", "Sunset cruise"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 3,
        name: "Alpine Mountain Lodge",
        location: "Aspen, Colorado",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", 
        rating: 5,
        price: "$359/night",
        facilities: [
            { icon: "⛷️", name: "Ski-in/Ski-out", description: "Direct slope access" },
            { icon: "🔥", name: "Fireplace Lounge", description: "Cozy mountain atmosphere" },
            { icon: "🧖", name: "Hot Tub", description: "Outdoor alpine hot springs" },
            { icon: "🎿", name: "Equipment Rental", description: "Full ski and snowboard gear" },
            { icon: "🍷", name: "Wine Cellar", description: "Premium wine collection" },
            { icon: "🚠", name: "Private Lift", description: "Exclusive mountain access" }
        ],
        packages: [
            {
                name: "Ski Adventure",
                price: "$459",
                features: ["Lift tickets", "Ski lessons", "Equipment rental", "Mountain lunch", "Après-ski drinks"]
            },
            {
                name: "Alpine Luxury",
                price: "$699",
                features: ["Mountain suite", "Private chef", "Helicopter skiing", "Personal guide", "Premium equipment"]
            },
            {
                name: "Winter Retreat",
                price: "$529",
                features: ["Fireplace suite", "Spa treatments", "Snowshoe tours", "Hot chocolate service", "Cozy amenities"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 4,
        name: "Urban Boutique Hotel",
        location: "Tokyo, Japan",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4,
        price: "$199/night",
        facilities: [
            { icon: "🍣", name: "Sushi Bar", description: "Authentic Japanese cuisine" },
            { icon: "🛁", name: "Onsen Bath", description: "Traditional hot spring baths" },
            { icon: "🏮", name: "Zen Garden", description: "Peaceful meditation space" },
            { icon: "🎌", name: "Cultural Tours", description: "Guided city explorations" },
            { icon: "🚄", name: "Station Access", description: "Direct train connections" },
            { icon: "🎯", name: "Business Center", description: "Modern meeting facilities" }
        ],
        packages: [
            {
                name: "Tokyo Explorer",
                price: "$279",
                features: ["City tour", "Metro pass", "Cultural guide", "Traditional dinner", "Shopping discount"]
            },
            {
                name: "Business Elite",
                price: "349",
                features: ["Executive floor", "Airport transfer", "Meeting room access", "Fast WiFi", "Concierge service"]
            },
            {
                name: "Zen Experience",
                price: "319",
                features: ["Garden view", "Tea ceremony", "Meditation session", "Onsen access", "Healthy breakfast"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 5,
        name: "Desert Oasis Resort",
        location: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 5,
        price: "449/night",
        facilities: [
            { icon: "🏛️", name: "Luxury Suites", description: "Opulent Arabian-style rooms" },
            { icon: "🐪", name: "Desert Safari", description: "Camel rides and dune bashing" },
            { icon: "💎", name: "Gold Souk Tour", description: "Exclusive shopping experiences" },
            { icon: "🏌️", name: "Golf Course", description: "Championship desert course" },
            { icon: "✈️", name: "Private Jet", description: "Luxury travel arrangements" },
            { icon: "🌙", name: "Rooftop Terrace", description: "Stunning city skyline views" }
        ],
        packages: [
            {
                name: "Arabian Nights",
                price: "649",
                features: ["Desert suite", "Camel safari", "Bedouin dinner", "Falcon show", "Traditional music"]
            },
            {
                name: "Luxury Escape",
                price: "899",
                features: ["Royal suite", "Private butler", "Helicopter tour", "Shopping tour", "Michelin dining"]
            },
            {
                name: "Golf Paradise",
                price: "579",
                features: ["Golf suite", "Course access", "Pro lessons", "Cart included", "Clubhouse dining"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ]
    },
    {
        id: 6,
        name: "Tropical Paradise Resort",
        location: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 5,
        price: "$189/night",
        facilities: [
            { icon: "🌴", name: "Infinity Pool", description: "Overlooking rice terraces" },
            { icon: "🧘", name: "Yoga Pavilion", description: "Daily meditation sessions" },
            { icon: "🍹", name: "Tiki Bar", description: "Tropical cocktails and sunset views" },
            { icon: "🏊", name: "Natural Springs", description: "Sacred water temple nearby" },
            { icon: "🎨", name: "Art Gallery", description: "Local Balinese artwork" },
            { icon: "🚤", name: "Island Tours", description: "Private boat excursions" }
        ],
        packages: [
            {
                name: "Wellness Retreat",
                price: "$289",
                features: ["Yoga classes", "Spa treatments", "Healthy cuisine", "Meditation guide", "Nature walks"]
            },
            {
                name: "Cultural Journey",
                price: "$359",
                features: ["Temple tours", "Cooking class", "Art workshop", "Traditional dance", "Local guide"]
            },
            {
                name: "Honeymoon Bliss",
                price: "$429",
                features: ["Private villa", "Couple's massage", "Romantic dinner", "Flower decoration", "Photo session"]
            }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        ]
    }
];

// --- MODAL MANAGEMENT FUNCTIONS ---

// Close main Hotel Details modal
function closeModal() {
    const modal = document.getElementById('hotelModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close Booking Form modal
function closeBookingModal() {
    const modal = document.getElementById('bookingFormModal');
    modal.style.display = 'none';
    // Restore body scroll only if the main modal is also closed
    if (document.getElementById('hotelModal').style.display !== 'block') {
        document.body.style.overflow = 'auto';
    }
}

// --- HOTEL CARD GENERATION ---

function generateHotelCards() {
    const hotelsGrid = document.getElementById('hotelsGrid');
    
    hotels.forEach(hotel => {
        const hotelCard = document.createElement('div');
        hotelCard.className = 'hotel-card';
        hotelCard.onclick = () => openHotelModal(hotel.id);
        
        const stars = '★'.repeat(hotel.rating) + '☆'.repeat(5 - hotel.rating);
        
        hotelCard.innerHTML = `
            <div class="hotel-image" style="background-image: url('${hotel.image}')"></div>
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <p class="hotel-location">📍 ${hotel.location}</p>
                <div class="hotel-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-text">(${hotel.rating}/5)</span>
                </div>
                <div class="hotel-price">${hotel.price}</div>
            </div>
        `;
        
        hotelsGrid.appendChild(hotelCard);
    });
}

// --- MODAL CONTENT LOADING ---

// Open hotel modal
function openHotelModal(hotelId) {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return;
    
    const modal = document.getElementById('hotelModal');
    const modalHeader = document.getElementById('modalHeader');
    const modalHotelName = document.getElementById('modalHotelName');
    const modalHotelLocation = document.getElementById('modalHotelLocation');
    
    modalHeader.style.backgroundImage = `url('${hotel.image}')`;
    modalHotelName.textContent = hotel.name;
    modalHotelLocation.textContent = hotel.location;
    
    loadFacilities(hotel.facilities);
    loadPackages(hotel.packages);
    loadGallery(hotel.gallery);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset to first tab (Facilities)
    // Pass null for the event to just activate the tab content and button
    showTab('facilities', null); 
}

// Load facilities
function loadFacilities(facilities) {
    const facilitiesGrid = document.getElementById('facilitiesGrid');
    facilitiesGrid.innerHTML = '';
    
    facilities.forEach(facility => {
        const facilityItem = document.createElement('div');
        facilityItem.className = 'facility-item';
        facilityItem.innerHTML = `
            <span class="facility-icon">${facility.icon}</span>
            <div>
                <strong>${facility.name}</strong>
                <p style="margin: 0; font-size: 0.9em; opacity: 0.8;">${facility.description}</p>
            </div>
        `;
        facilitiesGrid.appendChild(facilityItem);
    });
}

// Load packages (UPDATED to pass features)
function loadPackages(packages) {
    const packagesGrid = document.getElementById('packagesGrid');
    packagesGrid.innerHTML = '';
    
    packages.forEach(pkg => {
        const packageCard = document.createElement('div');
        packageCard.className = 'package-card';
        
        const featuresHTML = pkg.features.map(feature => `<li>${feature}</li>`).join('');
        
        // Encode features array to safely pass it as a string argument
        const featuresString = encodeURIComponent(JSON.stringify(pkg.features));

        packageCard.innerHTML = `
            <h4 class="package-name">${pkg.name}</h4>
            <div class="package-price">${pkg.price}<span style="font-size: 0.6em;">/night</span></div>
            <ul class="package-features">${featuresHTML}</ul>
            <button class="book-btn" onclick="bookPackage('${pkg.name}', '${pkg.price}', '${featuresString}')">
                Book Now
            </button>
        `;
        packagesGrid.appendChild(packageCard);
    });
}

// Load gallery
function loadGallery(gallery) {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    gallery.forEach((image) => {
        const imageDiv = document.createElement('div');
        imageDiv.style.cssText = `
            background-image: url('${image}');
            background-size: cover;
            background-position: center;
            height: 200px;
            border-radius: 10px;
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        imageDiv.onmouseover = () => imageDiv.style.transform = 'scale(1.05)';
        imageDiv.onmouseout = () => imageDiv.style.transform = 'scale(1)';
        imageDiv.onclick = () => openImageModal(image);
        
        galleryGrid.appendChild(imageDiv);
    });
}

// Open image in full screen (simple implementation)
function openImageModal(imageSrc) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    `;
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    
    overlay.onclick = () => document.body.removeChild(overlay);
}

// Show tab content
function showTab(tabName, event) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab, if event is available
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // Find the button if the call came without an event (like from openHotelModal)
        const tabButton = document.querySelector(`.tab[onclick*='${tabName}']`);
        if (tabButton) {
            tabButton.classList.add('active');
        }
    }
}

// --- BOOKING LOGIC (UPDATED) ---

// Book package function - opens the Booking Form modal
function bookPackage(packageName, price, encodedFeatures) {
    // 1. Get the booking form modal elements
    const bookingModal = document.getElementById('bookingFormModal');
    const packageNameInput = document.getElementById('packageNameInput');
    const nameDisplay = document.getElementById('modalPackageNameDisplay');
    const priceDisplay = document.getElementById('modalPackagePriceDisplay');
    const featuresDisplay = document.getElementById('modalPackageFeaturesDisplay');

    // 2. Set the hidden form value (to send to the server)
    packageNameInput.value = packageName;

    // 3. Set the displayed package details
    nameDisplay.textContent = packageName;
    priceDisplay.textContent = price;

    // 4. Decode and display the features list
    const features = JSON.parse(decodeURIComponent(encodedFeatures));
    featuresDisplay.innerHTML = '<ul style="list-style-type: none; padding-left: 0;">' + 
        features.map(f => `<li style="margin-bottom: 5px;"><span style="color: #2ecc71;">✓</span> ${f}</li>`).join('') + 
        '</ul>';

    // 5. Open the modal
    bookingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // 6. Close the larger hotel details modal for better user experience
    closeModal();
}


// --- EVENT LISTENERS AND INITIALIZATION ---

document.addEventListener('DOMContentLoaded', function() {
    // Generate hotel cards on page load
    generateHotelCards();
    
    // Close modals when clicking the X button
    document.querySelector('#hotelModal .close').onclick = closeModal;
    document.querySelector('#bookingFormModal .close').onclick = closeBookingModal;
    
    // Close modals when clicking outside of them
    window.onclick = function(event) {
        const hotelModal = document.getElementById('hotelModal');
        const bookingModal = document.getElementById('bookingFormModal');
        
        if (event.target === hotelModal) {
            closeModal();
        } 
        if (event.target === bookingModal) {
            closeBookingModal();
        }
    };
    
    // Add smooth scrolling to navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#hotels') {
                document.querySelector('.hotels-section').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add keyboard support for modal (Escape key)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Close the top-most modal first
            closeBookingModal();
            closeModal();
        }
    });

    // Handle form submission success redirect (optional, based on EJS logic)
    // If your server redirects with a query parameter like /hotel?inquiry=success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('inquiry') === 'success') {
        alert("🎉 Thank you! Your inquiry has been submitted successfully. We'll contact you soon.");
        // Clear the query parameter after showing the alert
        history.replaceState(null, '', window.location.pathname);
    }
});

// Add some interactive animations on scroll (original code retained)
window.addEventListener('scroll', function() {
    const hotels = document.querySelectorAll('.hotel-card');
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    hotels.forEach((hotel, index) => {
        const hotelTop = hotel.offsetTop;
        if (scrollTop + windowHeight > hotelTop + 100) {
            hotel.style.animationDelay = `${index * 0.1}s`;
            hotel.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
});

// Add CSS animation for scroll effect - done via JavaScript to keep styles separate
const style = document.createElement('style');
style.textContent = `
    .hotel-card {
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);