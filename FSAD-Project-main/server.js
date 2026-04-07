import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock data (in a real app, this would come from a database)
const mockData = {
    homestays: [
        { id: 1, name: "Sunset Villa", description: "Beautiful view of the valley with high-speed internet.", lat: 34.0522, lng: -118.2437, amount: 4500, rooms: 2, category: "double bedroom", location: "Los Angeles" },
        { id: 2, name: "Cozy Cabin", description: "In the woods, perfect for a retreat.", lat: 40.7128, lng: -74.0060, amount: 2500, rooms: 1, category: "single bedroom", location: "New York" },
        { id: 3, name: "Eiffel Dream", description: "See the tower from your window.", lat: 48.8584, lng: 2.2945, amount: 4800, rooms: 3, category: "triple bedroom", location: "Paris" },
        { id: 4, name: "Montmartre Artist Studio", description: "A creative vibe in the heart of Paris.", lat: 48.8867, lng: 2.3431, amount: 3200, rooms: 1, category: "single bedroom", location: "Paris" },
        { id: 5, name: "Marine Drive Sea View", description: "Wake up to the sound of waves in Mumbai.", lat: 18.944, lng: 72.823, amount: 3500, rooms: 2, category: "double bedroom", location: "Mumbai" },
        { id: 6, name: "Bandra Heritage Home", description: "Experience classic Mumbai lifestyle.", lat: 19.0596, lng: 72.8295, amount: 2800, rooms: 1, category: "single bedroom", location: "Mumbai" },
        { id: 7, name: "Marina Beach Retreat", description: "Walking distance from the spectacular Marina Beach.", lat: 13.05, lng: 80.2824, amount: 2100, rooms: 2, category: "double bedroom", location: "Chennai" },
        { id: 8, name: "Mylapore Traditional Stay", description: "Immerse in the heritage of Chennai.", lat: 13.0368, lng: 80.2676, amount: 1900, rooms: 3, category: "triple bedroom", location: "Chennai" }
    ],
    touristPlaces: [
        { id: 1, name: "Hollywood Sign", description: "Iconic landmark offering hiking trails.", lat: 34.1341, lng: -118.3215, amount: 1500, location: "Los Angeles" },
        { id: 2, name: "Statue of Liberty", description: "Historical monument on Ellis Island.", lat: 40.6892, lng: -74.0445, amount: 1800, location: "New York" },
        { id: 3, name: "Eiffel Tower", description: "Most-visited paid monument in the world.", lat: 48.8584, lng: 2.2945, amount: 2000, location: "Paris" },
        { id: 4, name: "Louvre Museum", description: "World's largest art museum.", lat: 48.8606, lng: 2.3376, amount: 1200, location: "Paris" },
        { id: 5, name: "Gateway of India", description: "Iconic arch monument built in the early 20th century.", lat: 18.922, lng: 72.834, amount: 1000, location: "Mumbai" },
        { id: 6, name: "Siddhivinayak Temple", description: "Historic and popular Hindu temple dedicated to Lord Shri Ganesh.", lat: 19.0166, lng: 72.8306, amount: 1100, location: "Mumbai" },
        { id: 7, name: "Marina Beach", description: "Longest natural urban beach in India.", lat: 13.05, lng: 80.2824, amount: 1500, location: "Chennai" },
        { id: 8, name: "Kapaleeshwarar Temple", description: "Stunning Dravidian architecture temple.", lat: 13.0335, lng: 80.2706, amount: 1200, location: "Chennai" }
    ],
    guides: [
        // Including first 10 guides for brevity, in real app all would be here
        { id: 1, name: "Ravi Shankar", qualification: "History MA", experience: "5 Years", amount: 1500, contact: "+91-9876543210", location: "Mumbai" },
        { id: 2, name: "Antoine Dupont", qualification: "Tourism Degree", experience: "8 Years", amount: 2200, contact: "+33-612345678", location: "Paris" },
        { id: 3, name: "Meena Iyer", qualification: "Local Heritage Expert", experience: "3 Years", amount: 1200, contact: "+91-9988776655", location: "Chennai" },
        { id: 4, name: "John Smith", qualification: "Geography BA", experience: "7 Years", amount: 1800, contact: "+1-555-1234", location: "Los Angeles" },
        { id: 5, name: "Maria Garcia", qualification: "Cultural Studies MA", experience: "4 Years", amount: 1600, contact: "+34-612345678", location: "Barcelona" },
        { id: 6, name: "Ahmed Hassan", qualification: "Archaeology PhD", experience: "10 Years", amount: 2500, contact: "+20-123456789", location: "Cairo" },
        { id: 7, name: "Yuki Tanaka", qualification: "Art History MA", experience: "6 Years", amount: 1900, contact: "+81-901234567", location: "Tokyo" },
        { id: 8, name: "Carlos Rodriguez", qualification: "Local Guide Certification", experience: "5 Years", amount: 1400, contact: "+52-551234567", location: "Mexico City" },
        { id: 9, name: "Anna Petrov", qualification: "History BA", experience: "3 Years", amount: 1300, contact: "+7-4951234567", location: "Moscow" },
        { id: 10, name: "David Wilson", qualification: "Tourism Management", experience: "9 Years", amount: 2100, contact: "+44-2071234567", location: "London" }
        // ... more guides would be included
    ]
};

// Routes
app.get('/api/homestays', (req, res) => {
    const { location } = req.query;
    if (location) {
        const filtered = mockData.homestays.filter(h =>
            h.location.toLowerCase().includes(location.toLowerCase()) ||
            h.name.toLowerCase().includes(location.toLowerCase())
        );
        res.json(filtered);
    } else {
        res.json(mockData.homestays);
    }
});

app.get('/api/tourist-places', (req, res) => {
    const { location } = req.query;
    if (location) {
        const filtered = mockData.touristPlaces.filter(t =>
            t.location.toLowerCase().includes(location.toLowerCase()) ||
            t.name.toLowerCase().includes(location.toLowerCase())
        );
        res.json(filtered);
    } else {
        res.json(mockData.touristPlaces);
    }
});

app.get('/api/guides', (req, res) => {
    res.json(mockData.guides);
});

app.post('/api/bookings', (req, res) => {
    const { userId, itemId, type, amount } = req.body;
    const newBooking = {
        id: Date.now(),
        userId,
        itemId,
        type,
        amount,
        date: new Date().toISOString().split('T')[0]
    };
    // In a real app, save to database
    res.json({ success: true, booking: newBooking });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    // Mock authentication
    const users = [
        { id: 101, name: 'Alice Admin', email: 'admin@test.com', password: 'password', role: 'admin' },
        { id: 102, name: 'Bob User', email: 'user@test.com', password: 'password', role: 'user' },
        { id: 1, name: 'Ravi Shankar', email: 'guide@test.com', password: 'password', role: 'guide' }
    ];

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password, role } = req.body;
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role: role || 'user'
    };
    // In a real app, save to database
    res.json({ success: true, user: newUser });
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all handler: send back React's index.html file for client-side routing
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});