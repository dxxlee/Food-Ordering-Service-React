import { useEffect, useState } from "react";

const Enable2FA = () => {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const enable2FA = async () => {
      const response = await fetch("https://food-order-backend-6az2.onrender.com/api/enable-2fa", 
      // const response = await fetch("http://localhost:8080/api/enable-2fa", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setQrCode(result.qrCode); // Show QR code
      } else {
        console.error(result.message);
      }
    };

    enable2FA();
  }, []);

  return (
    <div>
      {qrCode ? (
        <div>
          <h3>Scan this QR code with your Authenticator app</h3>
          <img src={qrCode} alt="QR Code" />
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default Enable2FA;
