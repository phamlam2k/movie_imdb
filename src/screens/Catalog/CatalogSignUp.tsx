import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CatologSignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Implement your signup logic here
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div 
            className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center" 
            style={{ backgroundImage: 'url("https://wallpapers.com/images/featured/movie-background-4saldhgir0h87q13.jpg")' }}
        >
            <div className="bg-primary p-8 rounded-[30px] shadow-md w-full max-w-[500px] max-h-[1000px]">
                <h1 className="text-5xl mb-4">Sign Up</h1>
                <p className="mb-8">Create your account. Please fill in the details below.</p>
                <form onSubmit={handleSignUp}>
                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" 
                            placeholder="Enter your username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-500 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input 
                            type="password" 
                            id="confirmPassword" 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline" 
                            placeholder="Confirm your password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                   <div className="flex items-center justify-between mb-3">
                        <button 
                            type="submit" 
                            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-transform duration-200 hover:scale-105"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="mb-3">Already have an account?</p>
                    <Link className="text-blue-500 hover:text-blue-700" to={'/login'}>
                        Sign In
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default CatologSignUp;
