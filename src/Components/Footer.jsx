import React from "react"; 
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; 

const Footer = () => { 
    return ( 
        <footer className="bg-gray-800 text-white py-8"> 
            <div className="container mx-auto flex flex-col md:flex-row justify-between"> 
                <div className="mb-6"> 
                    <h4 className="text-lg font-bold">Contact Us</h4> 
                    <p>Phone: 08148458278</p> 
                    <p>Email: ugwuvalentine917@gmail.com</p> 
                </div> 
                <div className="mb-6"> 
                    <h4 className="text-lg font-bold">Quick Links</h4> 
                    <ul> 
                        <li><a href="#" className="hover:underline">About Us</a></li> 
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li> 
                        <li><a href="#" className="hover:underline">Terms of Service</a></li> 
                        <li><a href="#" className="hover:underline">FAQs</a></li> 
                    </ul> 
                </div> 
                <div className="mb-6"> 
                    <h4 className="text-lg font-bold">Follow Us</h4> 
                    <div className="flex space-x-4"> 
                        <a href="https://www.facebook.com/ugwu.valentine.7967" className="hover:text-gray-400"><FaFacebook /></a> 
                        <a href="https://www.instagram.com/ugwu1612/profilecard/?igsh=emMzeGs0a2ZxMmNo" className="hover:text-gray-400"><FaInstagram /></a> 
                        <a href="https://www.twitter.com/Val09797539?t=D_2D-UiPTTO_CrksH5Z4sW&s=09" className="hover:text-gray-400"><FaTwitter /></a> 
                    </div> 
                </div> 
            </div> 
            <p className="text-center mt-4">© 2024 Zoom GO store. All rights reserved.</p> 
        </footer> 
    ); 
}; 

export default Footer; 