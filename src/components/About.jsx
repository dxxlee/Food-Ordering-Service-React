import aboutImage from "../assets/images/about.png";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { motion } from "framer-motion";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
};

const center = {
  lat: 51.090573207373595,
  lng: 71.4259698820672,
};

export const About = () => {
  return (
    <div className="container mx-auto p-6 text-gray-900 bg-white">
      {/* Основной блок */}
      <motion.div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 items-center">
          {/* Текстовый блок */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to our food ordering service! We bring you the best culinary experience,
              offering a wide variety of delicious meals prepared with passion and care.
              Enjoy fresh ingredients, fast delivery, and an easy ordering process!
            </p>
          </div>

          {/* Картинка */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={aboutImage}
              alt="About Us"
              className="w-full max-w-md rounded-xl"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Локация */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Location</h2>
        <p className="text-lg text-gray-600 mb-6">
          Visit our restaurant or order online from the comfort of your home!
        </p>

        <div className="overflow-hidden rounded-lg shadow-lg">
          <LoadScript googleMapsApiKey="AIzaSyBCvngeCiJFqxk9dULIffo_C9nE-WY-UfU">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </motion.div>
    </div>
  );
};
