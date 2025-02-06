// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

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
//         toast.success("Logged in successfully! 🎉");
//         navigate("/");
//       } else {
//         const error = await response.json();
//         toast.error(error.message || "Login failed");
//       }
//     } catch (err) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("email", { required: true })} type="email" placeholder="Email" />
//       <input {...register("password", { required: true })} type="password" placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
