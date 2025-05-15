"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../utils/AuthContext";
import { getParsedLocalStorageItem } from "@/app/utils/common";

export default function GetProfile() {
  const { isLoggedIn } = useAuth(); // Access the global auth state
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null); // State to store user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      // Fetch user data
      const storedUserData = getParsedLocalStorageItem("userData");
      
      if (storedUserData) {
        try {
          let {data} = JSON.parse(storedUserData)
          let token = localStorage.getItem('token')
          setUserData(data.login); // Parse user data
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      } else {
        console.warn("No user data found in localStorage.");
      }
      setLoading(false);

    }
  }, [isLoggedIn]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        {userData ? (
          <div>
            <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </div>
        ) : (
          <p>No user data available.</p>
        )}
      </div>
    </div>
  );
}