import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import ProfileCard from "../components/ProfileCard";
import { FiAlertCircle } from "react-icons/fi";

export default function Home() {
  const [merchants, setMerchants] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "merchants"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMerchants(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center px-4 py-10">

      {merchants.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-4 mt-20">

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl text-gray-500">
            <FiAlertCircle />
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold">
            No Merchants Available
          </h2>

          {/* Subtitle */}
          <p className="text-sm text-gray-500 max-w-xs">
            There are currently no active merchants. Please check back later.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md space-y-4">
          {merchants.map((m) => (
            <ProfileCard key={m.id} merchant={m} />
          ))}
        </div>
      )}
    </div>
  );
}