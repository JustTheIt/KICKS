import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { valideURLConvert } from '../utils/valideURLConvert';
import logo from '../assets/logo.png';
import { FaFacebook, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarker } from "react-icons/fa";

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
        <footer className="bg-[#1a1a1a] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div>
                        <img
                            src={logo}
                            alt="KICKS Logo"
                            className="h-14 mb-6 brightness-0 invert"
                        />
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            KICKS is a premium footwear brand from Nepal, crafting exceptional shoes for men, women, and kids with unmatched quality and style.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" 
                               className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noreferrer"
                               className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noreferrer"
                               className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group bg-transparent border-0 p-0 m-0 cursor-pointer"
                                >
                                    <span className="w-1 h-1 bg-white rounded-full group-hover:w-2 transition-all"></span>
                                    Home
                                </button>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group">
                                    <span className="w-1 h-1 bg-white rounded-full group-hover:w-2 transition-all"></span>
                                    About
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group bg-transparent border-0 p-0 m-0 cursor-pointer"
                                >
                                    <span className="w-1 h-1 bg-white rounded-full group-hover:w-2 transition-all"></span>
                                    Contact Us
                                </button>
                            </li>
                            <li>
                                <Link to="/return" className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group">
                                    <span className="w-1 h-1 bg-white rounded-full group-hover:w-2 transition-all"></span>
                                    Return Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6 text-white">Categories</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    to={mensUrl}
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group"
                                >
                                    <span className="w-1 h-1 bg-white rounded-full group-hover:w-2 transition-all"></span>
                                    Men
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={womensUrl}
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group"
                                >
                                    <span className="w-1 h-1 bg-white rounded-full group-hover:w-2 transition-all"></span>
                                    Women
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to={kidsUrl}
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-3 group"
                                >
                                    <span className="w-1 h-1 bg-white rounded-full group-hover:w-2 transition-all"></span>
                                    Kids
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6 text-white">Contact Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <a href="mailto:support@kicks.com" className="text-white hover:text-gray-300 transition-colors">
                                        support@kicks.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <FaPhone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <a href="tel:+9779866579810" className="text-white hover:text-gray-300 transition-colors">
                                        +977 9866579810
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                                    <FaMapMarker className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Address</p>
                                    <p className="text-white">Kathmandu, Nepal</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} KICKS Shoes. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <Link to="/pages/privacy-policy" className="text-gray-500 hover:text-white transition-colors text-sm">
                                Privacy Policy
                            </Link>
                            <Link to="/pages/terms-of-service" className="text-gray-500 hover:text-white transition-colors text-sm">
                                Terms of Service
                            </Link>
                            <Link to="/pages/shipping-policy" className="text-gray-500 hover:text-white transition-colors text-sm">
                                Shipping Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;