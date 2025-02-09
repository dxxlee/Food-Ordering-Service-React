import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://food-order-backend-6az2.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Registration successful! 🎉");
        navigate("/login");
      } else {
        const error = await response.json();
        toast.error(error.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div
            whileFocus={{ scale: 1.05 }}
            className="relative border border-gray-300 rounded-lg"
          >
            <input
              {...register("name", { required: true })}
              placeholder="Full Name"
              className="w-full p-3 border-none outline-none rounded-lg text-gray-700"
            />
          </motion.div>
          <motion.div
            whileFocus={{ scale: 1.05 }}
            className="relative border border-gray-300 rounded-lg"
          >
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border-none outline-none rounded-lg text-gray-700"
            />
          </motion.div>
          <motion.div
            whileFocus={{ scale: 1.05 }}
            className="relative border border-gray-300 rounded-lg"
          >
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="w-full p-3 border-none outline-none rounded-lg text-gray-700"
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </motion.button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            Login
          </a>
        </p>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Register;
