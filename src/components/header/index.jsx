import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-20 bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center">
                        <Link 
                            to="/" 
                            className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                        >
                            PieQ
                        </Link>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {userLoggedIn ? (
                            <button
                                onClick={() => {
                                    doSignOut().then(() => {
                                        navigate('/login');
                                    });
                                }}
                                className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                <FiLogOut className="text-sm" />
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md transition-colors"
                                >
                                    <FiLogIn className="text-sm" />
                                    <span className="text-sm font-medium">Login</span>
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    <FiUserPlus className="text-sm" />
                                    <span className="text-sm font-medium">Register</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;