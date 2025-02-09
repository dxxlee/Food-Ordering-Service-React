import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Enable2FAButton = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  // Функция для включения 2FA
  const enable2FA = async () => {
    try {
      const response = await fetch("https://food-order-backend-6az2.onrender.com/api/enable-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQrCodeUrl(data.qrCodeUrl); // Отображаем QR код
        setIs2FAEnabled(true);
        toast.success("2FA Enabled! Scan the QR code with your Authenticator app.");
      } else {
        const error = await response.json();
        toast.error(error.message || "Error enabling 2FA");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // Функция для выключения 2FA
  const disable2FA = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/disable-2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("Auth token")}`,
        },
      });

      if (response.ok) {
        setIs2FAEnabled(false);
        setQrCodeUrl(null);
        toast.success("2FA Disabled");
      } else {
        const error = await response.json();
        toast.error(error.message || "Error disabling 2FA");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      {!is2FAEnabled ? (
        <button onClick={enable2FA} className="px-6 py-2 bg-green-500 text-white rounded-md">
          Enable 2FA
        </button>
      ) : (
        <div>
          <div className="text-center">
            <img src={qrCodeUrl} alt="QR code for 2FA" className="mx-auto" />
            <p>Scan this QR code with Google Authenticator</p>
          </div>
          <button onClick={disable2FA} className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md">
            Disable 2FA
          </button>
        </div>
      )}
    </div>
  );
};

export default Enable2FAButton;
