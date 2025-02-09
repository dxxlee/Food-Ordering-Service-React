import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  
  const [is2faEnabled, setIs2faEnabled] = useState(false);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState(""); 

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://food-order-backend-6az2.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Если 2FA включён – ожидаем временный токен и переходим ко вводу кода
      if (result.message === "2FA token required") {
        setIs2faEnabled(true);
        setUserId(result.user.id);
        // Сохраняем временный токен для дальнейшей проверки 2FA
        sessionStorage.setItem("Auth token", result.tempToken);
        toast.info("Write 2FA token from Google Authenticator");
      } else if (response.ok) {
        // Если 2FA не включён или пройдена проверка
        sessionStorage.setItem("Auth token", result.token);
        sessionStorage.setItem("User", JSON.stringify(result.user));
        toast.success("Logged in successfully!");
        navigate("/");
        window.location.reload();
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong");
    }
  };

  // Функция для отправки 2FA кода
  const handle2faTokenSubmit = async (e) => {
    e.preventDefault();
    const twoFAToken = e.target.token.value;
    try {
      const response = await fetch("https://food-order-backend-6az2.onrender.com/api/verify-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("Auth token")}`,
        },
        body: JSON.stringify({ token: twoFAToken }),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem("Auth token", result.token);
        sessionStorage.setItem("User", JSON.stringify(result.user));
        toast.success("Logged in successfully with 2FA!");
        navigate("/");
        window.location.reload();
      } else {
        setError(result.message || "Invalid 2FA token");
      }
    } catch (err) {
      console.error("2FA submit error:", err);
      toast.error("Something went wrong during 2FA verification");
    }
  };

  // Функция для вызова эндпоинта enable-2fa и получения QR-кода
  const handleEnable2FA = async () => {
    try {
      const token = sessionStorage.getItem("Auth token");
      if (!token) {
        toast.error("You must be logged in to enable 2FA");
        return;
      }
      const response = await fetch("https://food-order-backend-6az2.onrender.com/api/enable-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setQrCodeUrl(result.qrCodeUrl);
        console.log("QR Code URL:", result.qrCodeUrl);
        toast.success("QR Code received! Scan it with your Google Authenticator app.");
      } else {
        toast.error(result.message || "Failed to enable 2FA");
      }
    } catch (err) {
      console.error("Error enabling 2FA:", err);
      toast.error("Something went wrong while enabling 2FA");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-green-100 to-green-300">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
          Welcome Back
        </h2>

        {/* Форма логина */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div whileFocus={{ scale: 1.05 }} className="relative border border-gray-300 rounded-lg">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="w-full p-3 border-none outline-none rounded-lg text-gray-700"
            />
          </motion.div>
          <motion.div whileFocus={{ scale: 1.05 }} className="relative border border-gray-300 rounded-lg">
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
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </motion.button>
        </form>

        {is2faEnabled && (
          <form onSubmit={handle2faTokenSubmit} className="space-y-4 mt-6">
            <motion.div whileFocus={{ scale: 1.05 }} className="relative border border-gray-300 rounded-lg">
              <input
                type="text"
                name="token"
                placeholder="Enter 2FA token"
                className="w-full p-3 border-none outline-none rounded-lg text-gray-700"
              />
            </motion.div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Verify 2FA Token
            </motion.button>
          </form>
        )}

        <div className="mt-6">
          <button
            onClick={handleEnable2FA}
            className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition"
          >
            Enable 2FA (Get QR Code)
          </button>
        </div>
        
        {qrCodeUrl && (
          <div className="mt-6 flex flex-col items-center">
            <p className="mb-2 text-center">
              Scan this QR code with your Google Authenticator app:
            </p>
            <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />
          </div>
        )}

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-green-500 hover:underline font-medium"
          >
            Register
          </a>
        </p>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default Login;





// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";


// const Login = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         sessionStorage.setItem("Auth token", result.token);
//         sessionStorage.setItem("User", JSON.stringify(result.user));
//         toast.success("Logged in successfully! 🎉");
//         navigate("/");
//         window.location.reload(); 
        
        
//       } else {
//         const error = await response.json();
//         toast.error(error.message || "Login failed");
        
//       }
      
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="h-screen flex justify-center items-center bg-gradient-to-br from-green-100 to-green-300">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className="bg-white p-8 rounded-xl shadow-lg w-96"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
//           Welcome Back
//         </h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <motion.div
//             whileFocus={{ scale: 1.05 }}
//             className="relative border border-gray-300 rounded-lg"
//           >
//             <input
//               {...register("email", { required: true })}
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 border-none outline-none rounded-lg text-gray-700"
//             />
//           </motion.div>
//           <motion.div
//             whileFocus={{ scale: 1.05 }}
//             className="relative border border-gray-300 rounded-lg"
//           >
//             <input
//               {...register("password", { required: true })}
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 border-none outline-none rounded-lg text-gray-700"
//             />
//           </motion.div>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
//           >
//             Login
//           </motion.button>
//         </form>
//         <p className="text-center text-sm mt-4">
//           Don't have an account?{" "}
//           <a
//             href="/register"
//             className="text-green-500 hover:underline font-medium"
//           >
//             Register
//           </a>
//         </p>
//       </motion.div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;
