import React from 'react';
import errorImg from "../assets/404.jpg"
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-base-200">
            <img src={errorImg} alt="404 Not Found" className="w-80 mb-6" />
            <h1 className="text-3xl font-bold text-red-500">Oops! Page not found</h1>
            <p className="text-gray-500 mb-6">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary">
                Back to Home
            </Link>
        </div>
    );
};

export default NotFound;