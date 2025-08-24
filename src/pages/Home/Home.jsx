import React from 'react';
import Banner from './Banner';
import FeaturedSection from './FeaturedSection';
import ContactSection from './ContactSection';
import FeaturedDonorsSection from './FeaturedDonorsSection';
import RecentRequestsSection from './RecentRequestsSection';
import WhyDonateSection from './WhyDonateSection';
import SuccessStoriesSection from './SuccessStoriesSection';
import ReviewsSection from './ReviewsSection';
import NewsletterSection from './NewsletterSection';
import FAQSection from './FAQSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedSection/>
            <FeaturedDonorsSection />
            <RecentRequestsSection />
            <WhyDonateSection />
            <SuccessStoriesSection />
            <ReviewsSection />
            <NewsletterSection />
            <FAQSection />
            <ContactSection/>

        </div>
    );
};

export default Home;