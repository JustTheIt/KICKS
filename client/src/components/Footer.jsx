import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import logo from '../assets/logo.png';

const Footer = () => {
    // Get data from Redux store
    const subCategoryData = useSelector(state => state.product.allSubCategory);
    const categoryData = useSelector(state => state.product.allCategory);

    // Function to generate category URLs
    const handleRedirectProductListpage = (id, name) => {
        try {
            const subcategory = subCategoryData?.find(sub => {
                const filterData = sub.category?.some(c => c._id === id);
                return filterData ? true : null;
            });
            
            if (!subcategory) {
                return `/${valideURLConvert(name)}-${id}`;
            }
            
            return `/${valideURLConvert(name)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`;
        } catch (error) {
            return `/${valideURLConvert(name)}-${id}`;
        }
    };

    // Get URLs for all main categories
    const getCategoryUrl = (categoryName) => {
        const category = categoryData?.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        return category ? handleRedirectProductListpage(category._id, category.name) : `/collections/${categoryName.toLowerCase()}`;
    };

    const mensUrl = getCategoryUrl('men');
    const womensUrl = getCategoryUrl('women');
    const kidsUrl = getCategoryUrl('kids');

    return (
        <footer className="bg-gray-100 text-sm text-gray-700 mt-10 border-t">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Brand Info */}
                <div>
                    <img
                        src={logo}
                        alt="KICKS Logo"
                        className="h-10 mb-4"
                    />
                    <p className="text-gray-600">
                        KICKS is a renowned footwear brand from Nepal that offers a wide range of shoes for men, women, and kids.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
                        <li><Link to="/pages/about-us" className="hover:text-indigo-600">About Us</Link></li>
                        <li><Link to="/pages/contact-us" className="hover:text-indigo-600">Contact Us</Link></li>
                        <li><Link to="/pages/return-policy" className="hover:text-indigo-600">Return Policy</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link 
                                to={mensUrl}
                                className="hover:text-indigo-600"
                            >
                                Men
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to={womensUrl}
                                className="hover:text-indigo-600"
                            >
                                Women
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to={kidsUrl}
                                className="hover:text-indigo-600"
                            >
                                Kids
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2">
                        <li>Email: <a href="mailto:support@kicks.com" className="hover:text-indigo-600">support@kicks.com</a></li>
                        <li>Phone: <a href="tel:+9779866579810" className="hover:text-indigo-600">+977 9866579810</a></li>
                        <li>Address: Kathmandu, Nepal</li>
                    </ul>
                    <div className="flex gap-3 mt-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" alt="Instagram" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
                            <img src="https://cdn-icons-png.flaticon.com/24/1384/1384060.png" alt="YouTube" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-white text-center py-4 border-t text-xs">
                &copy; {new Date().getFullYear()} KICKS Shoes. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;