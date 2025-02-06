import { motion } from "framer-motion";

export const TabItem = ({ title, index, active, setActive }) => {
    return (
        <button 
            onClick={() => setActive(title)}
            className="relative py-2 px-4 text-lg font-medium transition-colors duration-300"
        >
            {/* текст вкладки */}
            <span className={`transition-colors duration-300 ${active ? "text-yellow-600 font-bold" : "text-gray-500 hover:text-gray-700"}`}>
                {title.toUpperCase()}
            </span>

            {/* анимированная линия под вкладкой */}
            {active && (
                <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500 rounded"
                />
            )}
        </button>
    );
};
