import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Loading from '../Components/Loading'; // Importeer je loading component

const AppLayout = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simuleer een laadtijd (bijvoorbeeld met een timeout)
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Stel de laadtijd in (in milliseconden)
    }, []);

    return (
        <>
            <Navbar />
            <main>
                {loading ? (
                    <Loading /> // Toon de loading component tijdens het laden
                ) : (
                    <Outlet />
                )}
            </main>
            <Footer />
        </>
    );
};

export default AppLayout;
