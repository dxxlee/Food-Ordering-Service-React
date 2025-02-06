import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-gray-300 py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/*компашка*/}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-700 uppercase">Company</h2>
                    <ul className="text-gray-600 space-y-2">
                        <li>
                            <a href="#" className="hover:text-yellow-600 transition">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-600 transition">Menu</a>
                        </li>
                    </ul>
                </div>

                {/*всякое*/}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-700 uppercase">Legal</h2>
                    <ul className="text-gray-600 space-y-2">
                        <li>
                            <a href="#" className="hover:text-yellow-600 transition">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-600 transition">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-yellow-600 transition">Terms & Conditions</a>
                        </li>
                    </ul>
                </div>

                {/*соц сети*/}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-700 uppercase">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://t.me/ddxxlee" className="text-gray-600 hover:text-blue-500 transition">
                            <FaTelegram size={24} />
                        </a>
                        <a href="https://www.instagram.com/vibesswithdn/" className="text-gray-600 hover:text-pink-500 transition">
                            <FaInstagram size={24} />
                        </a>
                    </div>
                </div>

                {/*контакты*/}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-gray-700 uppercase">Contact</h2>
                    <p className="text-gray-600">Astana IT University, Astana, Kazakhstan</p>
                    <p className="text-gray-600 mt-1">Work Email:  230481@astanait.edu.kz</p>
                    <p className="text-gray-600 mt-1">Personal Email:  danielcool.lee06@gmail.com</p>
                </div>
            </div>

            {/*в*/}
            <div className="mt-10 border-t border-gray-300 py-4 text-center text-gray-600">
                © 2025 Food Delivery. All Rights Reserved.
            </div>
        </footer>
    );
};
