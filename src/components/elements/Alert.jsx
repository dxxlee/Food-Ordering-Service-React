import clsx from "clsx";
import { motion } from "framer-motion";

function getClassName({ className }) {
    return clsx("flex rounded-lg p-4 text-sm items-center", className);
}

const variants = {
    success: "bg-green-100 text-green-700 border border-green-300",
    danger: "bg-red-100 text-red-700 border border-red-300",
};

export const Alert = ({ children, className, variant = "success" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={clsx(variants[variant], getClassName({ className }))}
        >
            <svg
                className="w-6 h-6 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                ></path>
            </svg>
            <div>{children}</div>
        </motion.div>
    );
};
