  // Firebase Imports
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
        import { getFirestore, doc, getDoc, setDoc, serverTimestamp, collection, query, where, orderBy, getDocs, addDoc, updateDoc, deleteDoc, writeBatch, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"; // Added onSnapshot

        // Firebase Config (Same as before)
        const firebaseConfig = {
         apiKey: "AIzaSyAtvnbedBpCiRe_ZyfoB-TacrboEMgft5Y", authDomain: "mobile-shop-1c315.firebaseapp.com", projectId: "mobile-shop-1c315", storageBucket: "mobile-shop-1c315.firebasestorage.app", messagingSenderId: "689278786227", appId: "1:689278786227:web:ee06565e4a230381bf6ec6", measurementId: "G-MLDEWBBEMV"
        };
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // Firestore Collections
        const ordersCol = collection(db, 'orders');
        const categoriesCol = collection(db, 'categories'); // Needed for header search dropdown

        // --- DOM Elements ---
        // (Copied all const declarations from your previous working code)
        // Header, Search, Desktop Auth
        const logoBtn = document.getElementById('logo-btn');
        const mobileLogoBtn = document.getElementById('mobile-logo-btn');
        const searchBar = document.getElementById('search-bar');
        const searchCategoryDropdown = document.getElementById('search-category-dropdown');
        const searchIconBtn = document.getElementById('search-icon-btn');
        const authLinks = document.getElementById('auth-links'); // Desktop Login/Register links
        const userInfo = document.getElementById('user-info'); // Desktop User Info section
        const userEmailSpan = document.getElementById('user-email'); // Desktop user email display
        const loginBtnNav = document.getElementById('login-btn-nav'); // Desktop login button
        const signupBtnNav = document.getElementById('signup-btn-nav'); // Desktop signup button
        const logoutBtnNav = document.getElementById('logout-btn-nav'); // Desktop logout button

        // Account Drawer (Mobile Auth Modal)
        const accountDrawerModal = document.getElementById('account-drawer-modal');
        const accountDrawerBg = document.getElementById('account-drawer-bg');
        const closeAccountDrawerBtnLoggedIn = document.getElementById('close-account-drawer-btn-logged-in');
        const closeAccountDrawerBtnLoggedOut = document.getElementById('close-account-drawer-btn-logged-out');
        const accountDrawerLoggedIn = document.getElementById('account-drawer-logged-in');
        const accountDrawerLoggedOut = document.getElementById('account-drawer-logged-out');
        const accountDrawerUserEmail = document.getElementById('account-drawer-user-email'); // Email in drawer
        const drawerLogoutBtn = document.getElementById('drawer-logout-btn'); // Logout in drawer
        const loginTab = document.getElementById('drawer-login-tab-btn'); // Login tab in drawer
        const signupTab = document.getElementById('drawer-signup-tab-btn'); // Signup tab in drawer
        const loginForm = document.getElementById('drawer-login-form'); // Login form in drawer
        const signupForm = document.getElementById('drawer-signup-form'); // Signup form in drawer

        // Main Menu Drawer (Mobile Navigation)
        const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
        const mainMenuDrawerModal = document.getElementById('main-menu-drawer-modal');
        const mainMenuDrawerBg = document.getElementById('main-menu-drawer-bg');
        const closeMainMenuDrawerBtn = document.getElementById('close-main-menu-drawer-btn');
        const mainMenuCategoryList = document.getElementById('main-menu-category-list');
        const drawerSearchBtn = document.getElementById('drawer-search-btn'); // Search button in drawer
        const drawerSearchBar = document.getElementById('drawer-search-bar'); // Search bar in drawer
        const drawerMenuTabBtn = document.getElementById('drawer-menu-tab-btn'); // Menu tab in drawer
        const drawerCategoriesTabBtn = document.getElementById('drawer-categories-tab-btn'); // Categories tab in drawer
        const drawerMenuContent = document.getElementById('drawer-menu-content'); // Menu links in drawer
        const drawerMyAccountBtn = document.getElementById('drawer-my-account-btn'); // Account button in drawer

        // Cart (Modal + Badges)
        const cartCountBadge = document.getElementById('cart-count-badge'); // Desktop header badge
        const cartIcon = document.getElementById('cart-icon'); // Desktop header icon link
        const mobileHeaderCartBtn = document.getElementById('mobile-header-cart-btn'); // Mobile header cart icon button
        const mobileHeaderCartBadge = document.getElementById('mobile-header-cart-badge'); // Mobile header cart badge
        const cartModal = document.getElementById('cart-modal'); // Cart drawer modal
        const cartModalBg = document.getElementById('cart-modal-bg'); // Cart drawer background
        const closeCartBtn = document.getElementById('close-cart-btn'); // Close button in cart drawer
        const cartItemsContainer = document.getElementById('cart-items-container'); // Container for items in cart drawer
        const cartTotalEl = document.getElementById('cart-total'); // Total display in cart drawer

        // Wishlist (Badges)
        const wishlistCountBadge = document.getElementById('wishlist-count-badge'); // Desktop header badge
        const mobileWishlistBadge = document.getElementById('mobile-wishlist-badge'); // Mobile bottom nav badge

        // Mobile Bottom Nav Links
        const mobileCartLink = document.getElementById('mobile-cart-link'); // Cart link in bottom nav
        const mobileAccountLink = document.getElementById('mobile-account-link'); // Account link in bottom nav

        // Tracking Modal
        const trackingModal = document.getElementById('tracking-modal');
        const closeTrackingBtn = document.getElementById('close-tracking-btn');
        const trackingIconBtn = document.getElementById('tracking-icon-btn'); // Header tracking icon button
        const trackingItemsContainer = document.getElementById('tracking-items-container');
        const footerOrdersLink = document.getElementById('footer-orders-link'); // Footer tracking link

        // Profile Page Specific DOM Elements
        const accountContainer = document.getElementById('account-container');
        const profileLoading = document.getElementById('profile-loading');
        const loginPrompt = document.getElementById('login-prompt');
        const loginPromptBtn = document.getElementById('login-prompt-btn'); // Login button on profile prompt
        const profileSidebar = document.getElementById('profile-sidebar');
        const allAccountViews = document.querySelectorAll('.account-view');
        const welcomeMessage = document.getElementById('welcome-message');
        const profileNotification = document.getElementById('profile-notification');
        const dashboardView = document.getElementById('dashboard-view');
        const ordersView = document.getElementById('orders-view');
        const addressesView = document.getElementById('addresses-view');
        const accountDetailsView = document.getElementById('account-details-view');
        const wishlistView = document.getElementById('wishlist-view');
        const ordersListContainer = document.getElementById('orders-list-container');
        const wishlistContainer = document.getElementById('wishlist-container');
        const profilePicImg = document.getElementById('profile-pic-img');
        const profilePicInput = document.getElementById('profile-pic-input');
        const picUploadStatus = document.getElementById('pic-upload-status');
        const profileDetailsForm = document.getElementById('profile-details-form');
        const formStatus = document.getElementById('form-status');
        const verifyWhatsAppBtn = document.getElementById('verify-whatsapp-btn');
        const whatsAppInput = document.getElementById('profile-whatsapp');
        const whatsappStatusText = document.getElementById('whatsapp-status-text');
        const verifyBtnText = document.getElementById('verify-btn-text');
        const verifyBtnLoader = document.getElementById('verify-btn-loader');

        // Address Modal DOM Elements
        const addressModal = document.getElementById('address-modal');
        const closeAddressModalBtn = document.getElementById('close-address-modal-btn');
        const addNewAddressBtn = document.getElementById('add-new-address-btn');
        const addressesListContainer = document.getElementById('addresses-list-container');
        const addressForm = document.getElementById('address-form');
        const addressFormTitle = document.getElementById('address-form-title');
        const addressEditId = document.getElementById('address-edit-id');
        const addressName = document.getElementById('address-name');
        const addressPhone = document.getElementById('address-phone');
        const addressLine = document.getElementById('address-line');
        const addressCity = document.getElementById('address-city');
        const addressDistrict = document.getElementById('address-district');
        const addressPostalCode = document.getElementById('address-postal-code');
        const addressIsDefault = document.getElementById('address-is-default');
        const addressFormError = document.getElementById('address-form-error');
        const deleteAddressBtn = document.getElementById('delete-address-btn');

        // --- Global State ---
        let currentUser = null;
        let currentUserDocRef = null;
        let categoriesCache = []; // For search dropdown and mobile drawer

        // --- Drawer/Modal Open/Close Functions ---
        const openAccountDrawer = () => { if(accountDrawerModal) accountDrawerModal.classList.remove('hidden'); }
        const closeAccountDrawer = () => { if(accountDrawerModal) accountDrawerModal.classList.add('hidden'); }
        const openMainMenuDrawer = () => { if(mainMenuDrawerModal) mainMenuDrawerModal.classList.remove('hidden'); }
        const closeMainMenuDrawer = () => { if(mainMenuDrawerModal) mainMenuDrawerModal.classList.add('hidden'); }
        const openCartModal = (e) => { e.preventDefault(); renderCartModal(); if(cartModal) cartModal.classList.remove('hidden'); };
        const closeCartModal = () => { if(cartModal) cartModal.classList.add('hidden'); };
        const openTrackingModal = (e) => { e.preventDefault(); if(trackingModal) trackingModal.classList.remove('hidden'); loadUserOrders(true); } // Pass true for modal version
        const closeTrackingModal = () => { if(trackingModal) trackingModal.classList.add('hidden'); };
        const openAddressModal = (addressDoc = null) => {
             if(!addressForm) return;
             addressForm.reset(); addressEditId.value = ''; addressFormError.textContent = ''; deleteAddressBtn.classList.add('hidden');
             if (addressDoc) {
                 const data = addressDoc.data();
                 addressFormTitle.textContent = 'Edit Address'; addressEditId.value = addressDoc.id; addressName.value = data.name || ''; addressPhone.value = data.phone || ''; addressLine.value = data.address || ''; addressCity.value = data.city || ''; addressDistrict.value = data.district || ''; addressPostalCode.value = data.postalCode || ''; addressIsDefault.checked = data.isDefault || false; deleteAddressBtn.classList.remove('hidden');
             } else { addressFormTitle.textContent = 'Add New Address'; }
             if(addressModal) addressModal.classList.remove('hidden');
        }
        const closeAddressModal = () => { if(addressModal) addressModal.classList.add('hidden'); };

        // --- Auth State Change (Main Handler) ---
        onAuthStateChanged(auth, async (user) => {
            currentUser = user;
            if (user) {
                currentUserDocRef = doc(db, "users", user.uid);
                // Update Header/Desktop UI
                if(authLinks) authLinks.classList.add('hidden');
                // ** Keep Desktop User Info visible via CSS (`md:flex`) - No JS needed **
                // if(userInfo) userInfo.classList.remove('hidden');
                // if(userInfo) userInfo.classList.add('md:flex');

                // Update Account Drawer UI
                if(accountDrawerLoggedIn) accountDrawerLoggedIn.classList.remove('hidden'); if(accountDrawerLoggedIn) accountDrawerLoggedIn.classList.add('flex');
                if(accountDrawerLoggedOut) accountDrawerLoggedOut.classList.add('hidden'); if(accountDrawerLoggedOut) accountDrawerLoggedOut.classList.remove('flex');
                // Update Mobile Bottom Nav
                if(mobileAccountLink) { mobileAccountLink.href = 'profile.html'; mobileAccountLink.onclick = null; }
                // Update Profile Page Content UI
                if(loginPrompt) loginPrompt.classList.add('hidden');
                if(accountContainer) accountContainer.classList.remove('hidden');

                // Fetch and display user email/role
                try {
                     const userDoc = await getDoc(currentUserDocRef);
                     const userData = userDoc.exists() ? userDoc.data() : {};
                     const userDisplayName = userData.role === "admin" ? `${user.email} (Admin)` : user.email;
                     if(userEmailSpan) userEmailSpan.textContent = userDisplayName; // Header
                     if(accountDrawerUserEmail) accountDrawerUserEmail.textContent = userDisplayName; // Drawer
                } catch (error) {
                     console.error("Error fetching user role: ", error);
                     if(userEmailSpan) userEmailSpan.textContent = user.email; // Fallback for header
                     if(accountDrawerUserEmail) accountDrawerUserEmail.textContent = user.email; // Fallback for drawer
                }
                closeAccountDrawer(); // Close drawer after login/signup attempt
                await loadUserProfile(); // Load profile details if on profile page
                showView('dashboard'); // Show dashboard if on profile page

            } else { // User is logged out
                currentUserDocRef = null;
                // Update Header/Desktop UI
                if(authLinks) authLinks.classList.remove('hidden'); // Show Login/Register
                // ** Keep Desktop User Info hidden via CSS (`hidden`) - No JS needed **
                // if(userInfo) userInfo.classList.add('hidden');
                // if(userInfo) userInfo.classList.remove('md:flex');
                if(userEmailSpan) userEmailSpan.textContent = '';
                // Update Account Drawer UI
                if(accountDrawerLoggedIn) accountDrawerLoggedIn.classList.add('hidden'); if(accountDrawerLoggedIn) accountDrawerLoggedIn.classList.remove('flex');
                if(accountDrawerLoggedOut) accountDrawerLoggedOut.classList.remove('hidden'); if(accountDrawerLoggedOut) accountDrawerLoggedOut.classList.add('flex');
                // Update Mobile Bottom Nav
                if(mobileAccountLink) {
                     mobileAccountLink.href = '#';
                     mobileAccountLink.onclick = (e) => { e.preventDefault(); openAccountDrawer(); };
                }
                // Update Profile Page Content UI
                if(accountContainer) accountContainer.classList.add('hidden');
                if(loginPrompt) loginPrompt.classList.remove('hidden');
            }
            // Update badges regardless of auth state
            updateCartCountBadge();
            updateWishlistCountBadge();
        });

        // --- Auth Form Logic (Drawer) ---
        if(loginBtnNav) loginBtnNav.addEventListener('click', () => openAccountDrawer());
        if(signupBtnNav) signupBtnNav.addEventListener('click', () => { openAccountDrawer(); if(signupTab) signupTab.click(); });
        if(closeAccountDrawerBtnLoggedIn) closeAccountDrawerBtnLoggedIn.addEventListener('click', closeAccountDrawer);
        if(closeAccountDrawerBtnLoggedOut) closeAccountDrawerBtnLoggedOut.addEventListener('click', closeAccountDrawer);
        if(accountDrawerBg) accountDrawerBg.addEventListener('click', closeAccountDrawer);
        if(loginTab) loginTab.addEventListener('click', () => { loginTab.classList.add('active'); if(signupTab) signupTab.classList.remove('active'); if(loginForm) loginForm.classList.remove('hidden'); if(signupForm) signupForm.classList.add('hidden'); });
        if(signupTab) signupTab.addEventListener('click', () => { signupTab.classList.add('active'); if(loginTab) loginTab.classList.remove('active'); if(signupForm) signupForm.classList.remove('hidden'); if(loginForm) loginForm.classList.add('hidden'); });
        if(loginForm) loginForm.addEventListener('submit', async (e) => {
             e.preventDefault(); const email = document.getElementById('drawer-login-email').value; const password = document.getElementById('drawer-login-password').value; const errorP = document.getElementById('drawer-login-error'); if(errorP) errorP.textContent = 'Logging in...';
             try { await signInWithEmailAndPassword(auth, email, password); } catch (error) { console.error("Login Error:", error); if(errorP) errorP.textContent = error.message; }
        });
        if(signupForm) signupForm.addEventListener('submit', async (e) => {
             e.preventDefault(); const email = document.getElementById('drawer-signup-email').value; const password = document.getElementById('drawer-signup-password').value; const name = document.getElementById('drawer-signup-name').value; const phone = document.getElementById('drawer-signup-phone').value; const address = document.getElementById('drawer-signup-address').value; const city = document.getElementById('drawer-signup-city').value; const district = document.getElementById('drawer-signup-district').value; const postalCode = document.getElementById('drawer-signup-postal-code').value; const errorP = document.getElementById('drawer-signup-error'); if(errorP) errorP.textContent = 'Creating account...';
             try {
                 const userCredential = await createUserWithEmailAndPassword(auth, email, password); const user = userCredential.user; const userDocRef = doc(db, "users", user.uid);
                 await setDoc(userDocRef, { name: name, email: email, phone: phone, createdAt: serverTimestamp(), role: "customer" });
                 await addDoc(collection(userDocRef, "addresses"), { name: name, phone: phone, address: address, city: city, district: district, postalCode: postalCode, isDefault: true });
             } catch (error) { console.error("Signup Error:", error); if(errorP) errorP.textContent = error.message; }
        });
        if(drawerLogoutBtn) drawerLogoutBtn.addEventListener('click', () => { signOut(auth).then(() => { window.location.href = 'index.html'; }); });
        if(logoutBtnNav) logoutBtnNav.addEventListener('click', () => { signOut(auth).then(() => { window.location.href = 'index.html'; }); });
        if(loginPromptBtn) loginPromptBtn.addEventListener('click', () => openAccountDrawer());

        // --- Main Menu Drawer Logic ---
        if(hamburgerMenuBtn) hamburgerMenuBtn.addEventListener('click', openMainMenuDrawer);
        if(closeMainMenuDrawerBtn) closeMainMenuDrawerBtn.addEventListener('click', closeMainMenuDrawer);
        if(mainMenuDrawerBg) mainMenuDrawerBg.addEventListener('click', closeMainMenuDrawer);
        if(drawerMyAccountBtn) drawerMyAccountBtn.addEventListener('click', () => { closeMainMenuDrawer(); openAccountDrawer(); });
        if(drawerMenuTabBtn) drawerMenuTabBtn.addEventListener('click', () => { drawerMenuTabBtn.classList.add('active'); drawerMenuTabBtn.classList.remove('text-gray-500'); drawerCategoriesTabBtn.classList.remove('active'); drawerCategoriesTabBtn.classList.add('text-gray-500'); if (drawerMenuContent) drawerMenuContent.classList.remove('hidden'); if (mainMenuCategoryList) mainMenuCategoryList.classList.add('hidden'); });
        if(drawerCategoriesTabBtn) drawerCategoriesTabBtn.addEventListener('click', () => { drawerCategoriesTabBtn.classList.add('active'); drawerCategoriesTabBtn.classList.remove('text-gray-500'); drawerMenuTabBtn.classList.remove('active'); drawerMenuTabBtn.classList.add('text-gray-500'); if (drawerMenuContent) drawerMenuContent.classList.add('hidden'); if (mainMenuCategoryList) mainMenuCategoryList.classList.remove('hidden'); });

        // --- Cart Logic (Shared) ---
        const getCart = () => JSON.parse(localStorage.getItem('mobileHubCart')) || [];
        const saveCart = (cart) => localStorage.setItem('mobileHubCart', JSON.stringify(cart));
        const updateCartCountBadge = () => { /* Same as before */
             const cart = getCart(); const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); const cartTotalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
             if (cartCountBadge) { if (totalItems > 0) { cartCountBadge.textContent = totalItems; cartCountBadge.classList.remove('hidden'); cartCountBadge.classList.add('pop'); setTimeout(() => cartCountBadge.classList.remove('pop'), 200); } else { cartCountBadge.textContent = '0'; cartCountBadge.classList.remove('hidden', 'pop'); } }
             const cartTotalText = document.querySelector('#cart-icon span.lg\\:inline'); if (cartTotalText) { cartTotalText.textContent = `Rs.${cartTotalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`; } // Changed md:inline to lg:inline
             if (mobileHeaderCartBadge) { if (totalItems > 0) { mobileHeaderCartBadge.textContent = totalItems; mobileHeaderCartBadge.classList.remove('hidden'); } else { mobileHeaderCartBadge.textContent = '0'; } }
             const mobileCartBadge = document.getElementById('mobile-cart-badge'); if (mobileCartBadge) { if (totalItems > 0) { mobileCartBadge.textContent = totalItems; mobileCartBadge.classList.remove('hidden'); } else { mobileCartBadge.textContent = '0'; } }
        };
        const renderCartModal = () => { /* Same as before */
             const cart = getCart(); let total = 0; if (!cartItemsContainer || !cartTotalEl) return;
             if (cart.length === 0) { cartItemsContainer.innerHTML = '<p class="text-slate-500 py-6 text-center">Your cart is empty.</p>'; cartTotalEl.textContent = 'Rs. 0.00'; return; }
             cartItemsContainer.innerHTML = cart.map(item => { total += item.price * item.quantity; return ` <div class="flex items-center gap-4 py-4"> <img src="${item.imageUrl || 'https://via.placeholder.com/64'}" alt="${item.name}" class="w-16 h-16 rounded object-contain mix-blend-multiply bg-slate-100 p-1"> <div class="flex-grow"> <h4 class="font-semibold text-sm text-slate-800">${item.name}</h4> <div class="flex items-center gap-2 my-1"> <button data-id="${item.id}" class="cart-qty-decrease w-6 h-6 font-bold rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center">-</button> <span class="w-6 text-center font-bold text-sm text-slate-700">${item.quantity}</span> <button data-id="${item.id}" class="cart-qty-increase w-6 h-6 font-bold rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center">+</button> </div> <p class="text-sm text-amber-600 font-bold">Rs. ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p> </div> <button data-id="${item.id}" class="cart-remove-item text-slate-400 hover:text-red-500" title="Remove Item"> <i class="fas fa-times text-lg"></i> </button> </div>`; }).join('');
             cartTotalEl.textContent = `Rs. ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        };
        if(cartIcon) cartIcon.addEventListener('click', openCartModal);
        if(mobileCartLink) mobileCartLink.addEventListener('click', openCartModal);
        if(mobileHeaderCartBtn) mobileHeaderCartBtn.addEventListener('click', openCartModal);
        if(closeCartBtn) closeCartBtn.addEventListener('click', closeCartModal);
        if(cartModalBg) cartModalBg.addEventListener('click', closeCartModal);
        if(cartModal) cartModal.addEventListener('click', (e) => { /* Same as before */
             if (e.target === e.currentTarget || e.target === cartModalBg) return; const targetButton = e.target.closest('button, a'); if (!targetButton) return; if (targetButton.href?.includes('cart.html') || targetButton.href?.includes('checkout.html')) return; const id = targetButton.dataset.id; if (!id) return; const cart = getCart(); const itemIndex = cart.findIndex(i => i.id === id); if (itemIndex === -1) return; let cartChanged = false;
             if (targetButton.classList.contains('cart-qty-increase')) { cart[itemIndex].quantity++; cartChanged = true; }
             else if (targetButton.classList.contains('cart-qty-decrease')) { if (cart[itemIndex].quantity > 1) { cart[itemIndex].quantity--; cartChanged = true; } else { if (confirm('Remove item?')) { cart.splice(itemIndex, 1); cartChanged = true; } } }
             else if (targetButton.classList.contains('cart-remove-item')) { if (confirm('Remove item?')) { cart.splice(itemIndex, 1); cartChanged = true; } }
             if (cartChanged) { saveCart(cart); renderCartModal(); updateCartCountBadge(); }
        });

        // --- Wishlist Logic (Shared) ---
        const getWishlist = () => JSON.parse(localStorage.getItem('mobileHubWishlist')) || [];
        const saveWishlist = (wishlist) => localStorage.setItem('mobileHubWishlist', JSON.stringify(wishlist));
        const updateWishlistCountBadge = () => { /* Same as before */
             const wishlist = getWishlist(); const totalItems = wishlist.length;
             if (wishlistCountBadge) { if (totalItems > 0) { wishlistCountBadge.textContent = totalItems; wishlistCountBadge.classList.remove('hidden'); } else { wishlistCountBadge.textContent = '0'; } wishlistCountBadge.classList.add('pop'); setTimeout(() => wishlistCountBadge.classList.remove('pop'), 200); }
             if (mobileWishlistBadge) { if (totalItems > 0) { mobileWishlistBadge.textContent = totalItems; mobileWishlistBadge.classList.remove('hidden'); } else { mobileWishlistBadge.textContent = '0'; } }
        };
        const addToCartFromWishlist = (productId) => { /* Same as before */
             let cart = getCart(); let wishlist = getWishlist(); const product = wishlist.find(p => p.id === productId); if (!product) { console.error("Product not found in wishlist!"); return; }
             const existingItem = cart.find(item => item.id === productId);
             if (existingItem) { existingItem.quantity++; } else { cart.push({ id: product.id, name: product.name, price: product.price, originalPrice: product.price, imageUrl: product.imageUrl, quantity: 1 }); }
             saveCart(cart); updateCartCountBadge(); alert(`${product.name} added to cart!`);
        };
        const renderWishlist = () => { /* Same as before */
            if (!wishlistContainer) return; const wishlist = getWishlist();
            if (wishlist.length === 0) { wishlistContainer.innerHTML = `<div class="text-center py-10"> <i class="fas fa-heart text-4xl text-gray-400 mb-4"></i> <h3 class="text-xl font-semibold text-gray-700 mb-2">Your Wishlist is Empty</h3> <p class="text-gray-500 mb-6">You haven't added any products yet.</p> <a href="index.html" class="bg-amber-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-amber-700"> Start Shopping </a> </div>`; return; }
            wishlistContainer.innerHTML = wishlist.map(item => ` <div class="wishlist-item flex flex-col sm:flex-row items-center gap-4 py-4"> <button class="wishlist-remove-btn text-gray-400 hover:text-red-500 self-start sm:self-center" title="Remove" data-id="${item.id}"> <i class="fas fa-times text-lg"></i> </button> <img src="${item.imageUrl || 'https://via.placeholder.com/80'}" alt="${item.name}" class="w-20 h-20 object-contain rounded border p-1"> <div class="flex-grow text-center sm:text-left"> <h3 class="font-semibold text-gray-800">${item.name}</h3> </div> <p class="font-bold text-amber-600 w-full sm:w-32 text-center sm:text-right text-lg"> Rs. ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} </p> <button class="wishlist-add-to-cart-btn bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-amber-700 w-full sm:w-auto" data-id="${item.id}"> Add to Cart </button> </div> `).join('');
        };

        // --- Order Loading (Shared) ---
        const loadUserOrders = async (isModal = false) => { /* Same as before */
             const container = isModal ? trackingItemsContainer : ordersListContainer; if (!container) return;
             container.innerHTML = '<p class="text-slate-500 text-center">Loading orders...</p>'; const user = auth.currentUser;
             if (!user) { const loginHtml = ` <div class="text-center p-8"> <h3 class="text-xl font-semibold text-slate-700 mb-4">Please Log In</h3> <p class="text-slate-500 mb-6">Log in to view orders.</p> <button id="tracking-login-btn" class="bg-amber-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-amber-700">Login Now</button> </div>`; container.innerHTML = loginHtml; const btn = container.querySelector('#tracking-login-btn'); if (btn) { btn.addEventListener('click', () => { if(isModal) closeTrackingModal(); openAccountDrawer(); }); } return; }
             try {
                 const q = query(ordersCol, where("userId", "==", user.uid), orderBy("createdAt", "desc")); const snap = await getDocs(q);
                 if (snap.empty) { container.innerHTML = ` <div class="text-center p-8 ${isModal ? '' : 'border rounded-md bg-slate-50'}"> <h3 class="text-xl font-semibold text-slate-700 mb-4">No Orders</h3> <p class="text-slate-500">No orders placed yet.</p> </div>`; return; }
                 container.innerHTML = snap.docs.map(doc => { const o = doc.data() || {}; const id = doc.id; const date = o.createdAt ? o.createdAt.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';
                     const itemsHtml = (o.items || []).map(item => `<div class="flex items-center gap-3 py-2 border-b last:border-b-0 border-slate-200"> <img src="${item.imageUrl || 'https://via.placeholder.com/60'}" alt="${item.name || 'Item'}" class="w-12 h-12 object-contain rounded border p-1 bg-white"> <div> <p class="text-sm font-medium text-gray-700">${item.name || 'Item'}</p> <p class="text-xs text-gray-500">Qty: ${item.quantity || 1}</p> </div> </div>`).join('');
                     let statColor = 'bg-slate-100 text-slate-700'; const statLower = (o.status || 'Pending').toLowerCase(); if (statLower === 'pending') statColor = 'bg-yellow-100 text-yellow-800'; else if (statLower === 'shipped' || statLower === 'processing') statColor = 'bg-blue-100 text-blue-800'; else if (statLower === 'delivered') statColor = 'bg-green-100 text-green-800'; else if (statLower === 'cancelled') statColor = 'bg-red-100 text-red-800';
                     return ` <div class="bg-white border rounded-lg p-4 shadow-sm ${isModal ? 'mb-4' : ''}"> <div class="flex flex-col sm:flex-row justify-between items-start mb-3"> <div> <p class="text-xs text-slate-500">ID: ${id}</p> <p class="font-bold text-lg text-slate-800">Total: Rs. ${(o.totalAmount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p> </div> <span class="text-sm font-bold px-3 py-1 rounded-full ${statColor} mt-2 sm:mt-0">${o.status || 'Pending'}</span> </div> <p class="text-sm text-slate-600 mb-2"><strong>Placed:</strong> ${date}</p> <div class="mb-3"> <p class="text-sm font-semibold text-slate-700 mb-1">Items:</p> <div class="space-y-1 pl-2"> ${itemsHtml || '<p class="text-sm text-slate-500">No items.</p>'} </div> </div> <div class="bg-slate-50 p-3 rounded-md"> <p class="text-sm font-semibold text-slate-700">Shipping to: ${o.customerInfo?.name || 'N/A'}</p> <p class="text-xs text-slate-500">${o.customerInfo?.address || 'N/A'}, ${o.customerInfo?.city || ''}</p> </div> </div>`;
                 }).join('');
             } catch (error) { console.error("Err fetching orders:", error); container.innerHTML = '<p class="text-red-500 text-center">Could not load orders.</p>'; }
        };
        if(trackingIconBtn) trackingIconBtn.addEventListener('click', openTrackingModal);
        if(closeTrackingBtn) closeTrackingBtn.addEventListener('click', closeTrackingModal);
        if(footerOrdersLink) footerOrdersLink.addEventListener('click', openTrackingModal);

        // --- Profile Page View & Form Logic (Same as your working code) ---
        function showView(viewName) { /* Same as before */ if (!profileSidebar) return; profileSidebar.querySelectorAll('.sidebar-link').forEach(link => { link.classList.toggle('active', link.dataset.view === viewName); }); allAccountViews.forEach(view => { view.classList.toggle('hidden', view.id !== `${viewName}-view`); }); }
        if (accountContainer) { /* Same as before */ accountContainer.addEventListener('click', (e) => { const targetLink = e.target.closest('a[data-view], button[data-view]'); if (!targetLink) return; e.preventDefault(); const viewName = targetLink.dataset.view; switch (viewName) { case 'dashboard': showView('dashboard'); break; case 'account-details': showView('account-details'); break; case 'addresses': showView('addresses'); loadUserAddresses(); break; case 'orders': showView('orders'); loadUserOrders(false); break; case 'downloads': alert('No downloads yet.'); break; case 'wishlist': showView('wishlist'); renderWishlist(); break; case 'logout': signOut(auth).then(() => { window.location.href = 'index.html'; }); break; } }); }
        if (wishlistContainer) { /* Same as before */ wishlistContainer.addEventListener('click', (e) => { if (e.target.closest('.wishlist-remove-btn')) { const productId = e.target.closest('.wishlist-remove-btn').dataset.id; if (confirm('Remove?')) { let wishlist = getWishlist().filter(item => item.id !== productId); saveWishlist(wishlist); renderWishlist(); updateWishlistCountBadge(); } } if (e.target.closest('.wishlist-add-to-cart-btn')) { const productId = e.target.closest('.wishlist-add-to-cart-btn').dataset.id; addToCartFromWishlist(productId); } }); }
        async function loadUserProfile() { /* Same as before */ if (!currentUserDocRef || !currentUser || !profileLoading) return; profileLoading.classList.remove('hidden'); try { const userDoc = await getDoc(currentUserDocRef); let userData = {}; let userName = currentUser.email.split('@')[0]; if (userDoc.exists()) { userData = userDoc.data(); if (userData.name) { userName = userData.name.split(' ')[0]; } } else { console.warn("No user doc!"); } if(welcomeMessage) welcomeMessage.innerHTML = `Hello <strong>${userName}</strong> (not ${userName}? <a href="#" data-view="logout" class="text-amber-600 hover:underline">Log out</a>)`; if(document.getElementById('profile-name')) document.getElementById('profile-name').value = userData.name || ''; if(document.getElementById('profile-email')) document.getElementById('profile-email').value = currentUser.email || ''; if(document.getElementById('profile-phone')) document.getElementById('profile-phone').value = userData.phone || ''; if(document.getElementById('profile-whatsapp')) document.getElementById('profile-whatsapp').value = userData.whatsapp || ''; if (profilePicImg) { profilePicImg.src = userData.photoURL || 'https://via.placeholder.com/150'; } if (profileNotification) { profileNotification.classList.toggle('hidden', !!userData.phone); } profileLoading.classList.add('hidden'); } catch (e) { console.error("Err loading profile:", e); if(profileLoading) profileLoading.innerHTML = '<p class="text-red-500">Error loading.</p>'; } }
        if (verifyWhatsAppBtn) { /* Same as before */ const resetVerifyButton = () => { verifyWhatsAppBtn.disabled = false; verifyBtnText.innerHTML = '<i class="fab fa-whatsapp mr-1"></i> Verify'; verifyBtnLoader.classList.add('hidden'); verifyBtnText.classList.remove('hidden'); verifyWhatsAppBtn.classList.add('bg-green-500', 'hover:bg-green-600'); verifyWhatsAppBtn.classList.remove('bg-gray-400', 'cursor-not-allowed'); whatsappStatusText.textContent = 'Enter number and verify.'; whatsappStatusText.className = 'text-xs text-gray-500 mt-1'; }; whatsAppInput.addEventListener('input', resetVerifyButton); verifyWhatsAppBtn.addEventListener('click', () => { const num = whatsAppInput.value.trim(); if (!num) { alert('Enter number.'); return; } verifyWhatsAppBtn.disabled = true; verifyBtnText.classList.add('hidden'); verifyBtnLoader.classList.remove('hidden'); whatsappStatusText.textContent = 'Verifying...'; whatsappStatusText.className = 'text-xs text-blue-600 mt-1'; setTimeout(() => { verifyBtnLoader.classList.add('hidden'); verifyBtnText.classList.remove('hidden'); verifyBtnText.innerHTML = '<i class="fas fa-check mr-1"></i> Verified'; verifyWhatsAppBtn.classList.remove('bg-green-500', 'hover:bg-green-600'); verifyWhatsAppBtn.classList.add('bg-gray-400', 'cursor-not-allowed'); whatsappStatusText.textContent = 'Verified!'; whatsappStatusText.className = 'text-xs text-green-600 mt-1'; }, 2000); }); }
        if (profileDetailsForm) { /* Same as before */ profileDetailsForm.addEventListener('submit', async (e) => { e.preventDefault(); if (!currentUserDocRef || !currentUser) return; const updatedData = { name: document.getElementById('profile-name').value, phone: document.getElementById('profile-phone').value, whatsapp: document.getElementById('profile-whatsapp').value, email: currentUser.email }; try { await setDoc(currentUserDocRef, updatedData, { merge: true }); formStatus.textContent = 'Updated!'; formStatus.className = 'text-green-600 text-sm text-center mt-2'; if (profileNotification) profileNotification.classList.add('hidden'); if (updatedData.name) { const userName = updatedData.name.split(' ')[0]; if(welcomeMessage) welcomeMessage.innerHTML = `Hello <strong>${userName}</strong> (not ${userName}? <a href="#" data-view="logout" class="text-amber-600 hover:underline">Log out</a>)`; } } catch (e) { console.error("Err updating profile:", e); formStatus.textContent = 'Update failed.'; formStatus.className = 'text-red-500 text-sm text-center mt-2'; } setTimeout(() => { if(formStatus) formStatus.textContent = ''; }, 3000); }); }
        if (profilePicInput) { /* Same as before */ profilePicInput.addEventListener('change', async (e) => { const file = e.target.files[0]; if (!file || !currentUser || !currentUserDocRef) return; picUploadStatus.textContent = 'Uploading...'; const apiKey = "e1a633610b9b80b8a73e426e7d78cf0e"; const formData = new FormData(); formData.append('image', file); try { const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: 'POST', body: formData }); const result = await response.json(); if (result.success) { const url = result.data.url; await setDoc(currentUserDocRef, { photoURL: url }, { merge: true }); if(profilePicImg) profilePicImg.src = url; picUploadStatus.textContent = 'Complete!'; } else { throw new Error(result.error.message || 'Upload failed'); } } catch (e) { console.error("Err uploading pic:", e); picUploadStatus.textContent = 'Upload failed.'; } setTimeout(() => { if(picUploadStatus) picUploadStatus.textContent = ''; }, 3000); }); }

        // --- Address Logic (Same as your working code) ---
        const loadUserAddresses = async () => { /* Same as before */ if (!currentUser || !addressesListContainer) return; addressesListContainer.innerHTML = '<p class="text-slate-500 text-center">Loading addresses...</p>'; try { const addrRef = collection(db, 'users', currentUser.uid, 'addresses'); const q = query(addrRef, orderBy('isDefault', 'desc')); const snap = await getDocs(q); if (snap.empty) { addressesListContainer.innerHTML = `<p class="text-slate-500 text-center p-4 border rounded-md bg-slate-50">No saved addresses.</p>`; return; } addressesListContainer.innerHTML = snap.docs.map(doc => { const d = doc.data(); const isDef = d.isDefault || false; return `<div class="address-card ${isDef ? 'is-default' : ''}"> ${isDef ? '<span class="default-badge">DEFAULT</span>' : ''} <h4 class="font-bold text-lg text-gray-800">${d.name}</h4> <p class="text-gray-600 text-sm">${d.phone}</p> <p class="text-gray-600 text-sm mt-2"> ${d.address},<br> ${d.city}, ${d.district},<br> ${d.postalCode} </p> <div class="flex gap-2 mt-4"> <button class="edit-address-btn text-sm text-amber-600 hover:underline font-medium" data-id="${doc.id}">Edit</button> <span class="text-gray-300">|</span> <button class="delete-address-btn text-sm text-red-600 hover:underline font-medium" data-id="${doc.id}">Delete</button> ${!isDef ? `<span class="text-gray-300">|</span> <button class="set-default-btn text-sm text-green-600 hover:underline font-medium" data-id="${doc.id}">Set as Default</button>` : ''} </div> </div>`; }).join(''); } catch (e) { console.error("Err loading addresses:", e); addressesListContainer.innerHTML = `<p class="text-red-500 text-center">Could not load addresses.</p>`; } }
        const handleSetDefaultAddress = async (docIdToSet) => { /* Same as before */ if (!currentUser) return; try { const batch = writeBatch(db); const addrRef = collection(db, 'users', currentUser.uid, 'addresses'); const q = query(addrRef, where('isDefault', '==', true)); const oldDefSnap = await getDocs(q); oldDefSnap.docs.forEach(d => batch.update(d.ref, { isDefault: false })); const newDefRef = doc(addrRef, docIdToSet); batch.update(newDefRef, { isDefault: true }); await batch.commit(); loadUserAddresses(); } catch (e) { console.error("Err setting default:", e); alert('Error setting default.'); } }
        if (addNewAddressBtn) addNewAddressBtn.addEventListener('click', () => openAddressModal(null));
        if (closeAddressModalBtn) closeAddressModalBtn.addEventListener('click', closeAddressModal);
        if (addressForm) { /* Same as before */ addressForm.addEventListener('submit', async (e) => { e.preventDefault(); if (!currentUser) return; const addrRef = collection(db, 'users', currentUser.uid, 'addresses'); const editId = addressEditId.value; const addrData = { name: addressName.value, phone: addressPhone.value, address: addressLine.value, city: addressCity.value, district: addressDistrict.value, postalCode: addressPostalCode.value, isDefault: addressIsDefault.checked }; try { if (addrData.isDefault) { const batch = writeBatch(db); const q = query(addrRef, where('isDefault', '==', true)); const oldDefSnap = await getDocs(q); oldDefSnap.docs.forEach(d => { if (d.id !== editId) batch.update(d.ref, { isDefault: false }); }); await batch.commit(); } if (editId) { await setDoc(doc(addrRef, editId), addrData); } else { await addDoc(addrRef, addrData); } closeAddressModal(); loadUserAddresses(); } catch (e) { console.error("Err saving addr:", e); addressFormError.textContent = "Error saving."; } }); }
        if (addressesListContainer) { /* Same as before */ addressesListContainer.addEventListener('click', async (e) => { const target = e.target; const id = target.dataset.id; if (!id || !currentUser) return; const addrRef = collection(db, 'users', currentUser.uid, 'addresses'); if (target.classList.contains('edit-address-btn')) { try { const docSnap = await getDoc(doc(addrRef, id)); if (docSnap.exists()) openAddressModal(docSnap); } catch (e) { console.error("Err fetching addr:", e); } } if (target.classList.contains('delete-address-btn')) { if (confirm('Delete address?')) { try { await deleteDoc(doc(addrRef, id)); loadUserAddresses(); } catch (e) { console.error("Err deleting addr:", e); alert('Error deleting.'); } } } if (target.classList.contains('set-default-btn')) { await handleSetDefaultAddress(id); } }); }
        if (deleteAddressBtn) { /* Same as before */ deleteAddressBtn.addEventListener('click', async () => { const id = addressEditId.value; if (!id || !currentUser) return; if (confirm('Delete this address?')) { try { const addrRef = collection(db, 'users', currentUser.uid, 'addresses'); await deleteDoc(doc(addrRef, id)); closeAddressModal(); loadUserAddresses(); } catch (e) { console.error("Err deleting addr:", e); addressFormError.textContent = 'Error deleting.'; } } }); }

        // --- Search & Category Logic (Header & Drawer) ---
        const renderCategoryNavForSearch = (categories) => { // Render categories in header dropdown and mobile drawer
             if(searchCategoryDropdown) { let html = `<option value="all">ALL CATEGORIES</option>`; html += categories.map(c => `<option value="${c.name}">${c.name.toUpperCase()}</option>`).join(''); searchCategoryDropdown.innerHTML = html; }
             if (mainMenuCategoryList) { let html = `<a href="shop.html?category=all" class="category-link drawer-menu-link">All Products</a>`; html += categories.map(c => `<a href="shop.html?category=${encodeURIComponent(c.name)}" class="category-link drawer-menu-link">${c.name}</a>`).join(''); mainMenuCategoryList.innerHTML = html; }
        };
        onSnapshot(query(categoriesCol, orderBy("name")), (snapshot) => { categoriesCache = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })); renderCategoryNavForSearch(categoriesCache); }, error => console.error("Error fetching categories:", error));

        const performSearch = () => { // Redirects to shop.html
            const searchTerm = searchBar.value.trim(); const selectedCategory = searchCategoryDropdown.value; let url = 'shop.html?';
            if (searchTerm) url += `search=${encodeURIComponent(searchTerm)}`; if (selectedCategory !== 'all') url += `${searchTerm ? '&' : ''}category=${encodeURIComponent(selectedCategory)}`;
            if (url !== 'shop.html?') { window.location.href = url; } else if (!searchTerm && selectedCategory === 'all') { window.location.href = 'shop.html';}
        };
        const performDrawerSearch = () => { // Redirects to shop.html
            const searchTerm = drawerSearchBar.value.trim(); if (searchTerm) { window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}`; closeMainMenuDrawer(); }
        };
        if(searchBar) searchBar.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
        if(searchIconBtn) searchIconBtn.addEventListener('click', performSearch);
        if(searchCategoryDropdown) searchCategoryDropdown.addEventListener('change', performSearch);
        if(drawerSearchBtn) drawerSearchBtn.addEventListener('click', performDrawerSearch);
        if(drawerSearchBar) drawerSearchBar.addEventListener('keypress', (e) => { if (e.key === 'Enter') performDrawerSearch(); });

        // --- Logo Click ---
        if (logoBtn) logoBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'index.html'; });
        if (mobileLogoBtn) mobileLogoBtn.addEventListener('click', (e) => { e.preventDefault(); window.location.href = 'index.html'; });

        // --- Initial Page Load ---
        updateCartCountBadge();
        updateWishlistCountBadge();
        renderCartModal(); // Pre-render cart modal structure
