import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Application Data
    const [homestays, setHomestays] = useState([]);
    const [touristPlaces, setTouristPlaces] = useState([]);
    const [guides, setGuides] = useState([]);

    // Load data from API on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [homestaysRes, touristPlacesRes, guidesRes] = await Promise.all([
                    fetch('/api/homestays'),
                    fetch('/api/tourist-places'),
                    fetch('/api/guides')
                ]);

                const homestaysData = await homestaysRes.json();
                const touristPlacesData = await touristPlacesRes.json();
                const guidesData = await guidesRes.json();

                setHomestays(homestaysData);
                setTouristPlaces(touristPlacesData);
                setGuides(guidesData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Fallback to mock data if API fails
                const { mockData } = await import('../data/mockData');
                setHomestays(mockData.homestays);
                setTouristPlaces(mockData.touristPlaces);
                setGuides(mockData.guides);
            }
        };

        fetchData();
    }, []);

    const [pendingHomestays, setPendingHomestays] = useState([]);
    const [pendingGuides, setPendingGuides] = useState([]);

    // Users & Auth
    const [users, setUsers] = useState([
        { id: 101, name: 'Alice Admin', email: 'admin@test.com', password: 'password', role: 'admin' },
        { id: 102, name: 'Bob User', email: 'user@test.com', password: 'password', role: 'user', phone: '', address: '' },
        { id: 1, name: 'Ravi Shankar', email: 'guide@test.com', password: 'password', role: 'guide', phone: '+91-9876543210' } // Seed dummy auth linking mockData guide
    ]);
    const [currentUser, setCurrentUser] = useState(null);

    // Bookings
    const [bookings, setBookings] = useState([
        { id: 1001, userId: 102, itemId: 1, type: 'homestay', amount: 4500, date: '2026-05-10' },
        { id: 1002, userId: 102, itemId: 1, type: 'guide', amount: 3000, date: '2026-05-12' }
    ]);

    // Cart
    const [cart, setCart] = useState([]);

    const addToCart = (item, type) => {
        const cartItem = { ...item, type, id: `${type}-${item.id}` };
        setCart(prev => {
            const existing = prev.find(c => c.id === cartItem.id);
            if (existing) return prev; // Don't add duplicates
            return [...prev, cartItem];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(item => item.id !== itemId));
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () => cart.reduce((total, item) => total + item.amount, 0);

    // Auth Methods
    const registerUser = async (userData) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (data.success) {
                setUsers([...users, data.user]);
                setCurrentUser(data.user);
                return data.user;
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
        return null;
    };

    const loginUser = async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                setCurrentUser(data.user);
                return true;
            }
        } catch (error) {
            console.error('Login error:', error);
        }
        return false;
    };

    const logoutUser = () => setCurrentUser(null);

    const updateUserProfile = (id, updates) => {
        setUsers(users.map(u => u.id === id ? { ...u, ...updates } : u));
        if (currentUser?.id === id) setCurrentUser({ ...currentUser, ...updates });

        // Link updates if the user is a guide
        if (currentUser?.role === 'guide') {
            setGuides(guides.map(g => g.id === id ? { ...g, contact: updates.phone || g.contact } : g));
        }
    };

    const addBooking = async (itemId, type, amount) => {
        if (!currentUser) return null;
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: currentUser.id, itemId, type, amount })
            });
            const data = await response.json();
            if (data.success) {
                setBookings([...bookings, data.booking]);
                return data.booking;
            }
        } catch (error) {
            console.error('Booking error:', error);
        }
        return null;
    };

    // Approvals
    const addPendingHomestay = (hs) => setPendingHomestays([...pendingHomestays, { ...hs, id: Date.now() }]);
    const approveHomestay = (id) => {
        const hs = pendingHomestays.find(h => h.id === id);
        if (hs) setHomestays([...homestays, hs]);
        setPendingHomestays(pendingHomestays.filter(h => h.id !== id));
    };
    const rejectHomestay = (id) => setPendingHomestays(pendingHomestays.filter(h => h.id !== id));

    const addPendingGuide = (g) => setPendingGuides([...pendingGuides, { ...g, id: Date.now() }]);
    const approveGuide = (id) => {
        const g = pendingGuides.find(x => x.id === id);
        if (g) setGuides([...guides, g]);
        setPendingGuides(pendingGuides.filter(x => x.id !== id));
    };
    const rejectGuide = (id) => setPendingGuides(pendingGuides.filter(x => x.id !== id));

    return (
        <AppContext.Provider value={{
            homestays, touristPlaces, guides,
            pendingHomestays, addPendingHomestay, approveHomestay, rejectHomestay,
            pendingGuides, addPendingGuide, approveGuide, rejectGuide,
            users, bookings, addBooking,
            currentUser, registerUser, loginUser, logoutUser, updateUserProfile,
            cart, addToCart, removeFromCart, clearCart, getCartTotal
        }}>
            {children}
        </AppContext.Provider>
    );
};
