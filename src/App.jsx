import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import MainContent from './MainContent.jsx';
import Footer from './Footer.jsx';
import SecondPage from './secondpage/SecondPage.jsx'; // Import your second page component

function App() {
    return (
        <Router>
            <AppContent />
            <Footer />
        </Router>
    );
}

function AppContent() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/second' && <Header />}
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/second" element={<SecondPage />} />
            </Routes>
        </>
    );
}

export default App;
