// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Button from "../../components/elements/Button";
// import { ToastContainer, toast } from "react-toastify";

// const Register = () => {
//   const { register, handleSubmit } = useForm();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         toast.success("Account created successfully! 🎉");
//         navigate("/login");
//       } else {
//         const error = await response.json();
//         toast.error(error.message || "Registration failed");
//       }
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="h-screen bg-black flex items-center justify-center">
//       <form
//         className="w-full max-w-md bg-white p-6 rounded shadow"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <h2 className="text-2xl font-bold mb-4">Register</h2>
//         <input
//           {...register("name", { required: true })}
//           placeholder="Name"
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           {...register("email", { required: true })}
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <input
//           {...register("password", { required: true })}
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//         />
//         <Button type="submit">Register</Button>
//         <ToastContainer />
//       </form>
//     </div>
//   );
// };

// export default Register;
