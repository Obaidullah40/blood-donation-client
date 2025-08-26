import React from 'react';
import Banner from './Banner';
import FeaturedSection from './FeaturedSection';
import ContactSection from './ContactSection';
import RecentRequestsSection from './RecentRequestsSection';
import WhyDonateSection from './WhyDonateSection';
import ReviewsSection from './ReviewsSection';
import NewsletterSection from './NewsletterSection';
import FAQSection from './FAQSection';
import HowItWorksSection from './HowItWorksSection';
import DonationBenefitsSection from './DonationBenefitsSection';

const Home = () => {
    return (
        <div>
            <Banner />
            <FeaturedSection/>
            <DonationBenefitsSection />
            <RecentRequestsSection />
            <WhyDonateSection />
            <HowItWorksSection/>
            <ReviewsSection />
            <NewsletterSection />
            <FAQSection />
            <ContactSection/>

        </div>
    );
};

export default Home;