import { Alert } from "../../components/elements/Alert";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto p-6 mt-12 bg-white rounded-lg shadow-lg"
        >
            <Alert variant="success">
                <span className="font-bold">Payment Successful!</span> Thank you for your order. You will receive a confirmation email shortly.
            </Alert>
        </motion.div>
    );
};

export default PaymentSuccess;
