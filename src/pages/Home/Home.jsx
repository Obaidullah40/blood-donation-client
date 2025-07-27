import React from 'react';
import Banner from './Banner';
import FeaturedSection from './FeaturedSection';
import ContactSection from './ContactSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedSection/>
            <ContactSection/>
        </div>
    );
};

export default Home;