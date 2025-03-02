import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import NotFoundAnimation from "../assets/404-animation.json";

const Error404 = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
            <div className="flex flex-col md:flex-row items-center justify-center p-4 text-center md:text-left w-full">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex-shrink-0 mb-4 md:mb-0 w-full md:w-auto"
                >
                    <Lottie animationData={NotFoundAnimation} className="w-72 h-72 mx-auto md:mx-0" />
                </motion.div>

                <div className="flex flex-col items-center md:items-start md:ml-8 w-full md:w-auto">
                    <h1 className="text-6xl font-bold text-red-500">404</h1>
                    <h2 className="text-2xl font-semibold mt-2">Page introuvable</h2>
                    <p className="text-gray-600 mt-1">
                        Oups ! La page que vous cherchez n'existe pas.
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-4"
                    >
                        <Link
                            to="/"
                            className="px-5 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
                        >
                            Retour à l'accueil
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Error404;
