"use client";
import { useEffect, useState } from "react";
import { getAstronaut, getAstronauts } from "../utils/actions";
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/AuthContext";
import React from "react";
import Link from "next/link";

export default function Astronauts() {
  const [astronautsData, setAstronautsData] = useState<any>(null); // State to store suits data
  const [loading, setLoading] = useState(true);
  const [client, setClent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, login } = useAuth(); // Access the global auth state
  const router = useRouter(); // Initialize useRouter
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      // Fetch user data

        try {

          // Save token to localStorage and update global state
          let token =localStorage.getItem("token");
          if (!token) {
            console.error("Token not found in localStorage");
            setError("Authentication token is missing.");
            return;
          }
          const fetchAstronauts = async () => {
            try {
              let fetchdata = await getAstronauts(token||"")
              console.log("fetchdata",fetchdata.data)
                setAstronautsData(fetchdata?.data?.Persons)
            } catch (err) {
              console.error("Error fetching astronauts data:", err);
              setError("Failed to fetch astronauts data.");
            } finally {
              setLoading(false);
            }
          };
      
          fetchAstronauts();
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
        setLoading(false)
        setClent(true)
    }
  },  [isLoggedIn, login]);

  const handleRowClick = async (id: string) => {
    try {
      router.push(`/astronaut?id=${ id }`) // Pass the ID as a query parameter
       // Update the state with the fetched details
    } catch (err) {
      console.error("Error fetching suit details:", err);
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  // async function checkIfDataChanged() {
  //   const token = localStorage.getItem("token");
  //   let changedData =await getSuits(suitsByFeature, token||"")
  //   console.log("suitsData",suitsData)
  //   setSuitsData(changedData)
  // }
  return (client &&
    <div className="min-h-screen bg-gray-100 flex justify-center bg-[url('/images/Mars_rocket_2.png')] bg-cover bg-[100%_100%] bg-center bg-no-repeat">
      {/* Use max-w-full to span all 12 columns */}
      <div className="grid grid-cols-12 w-full ">
      <div className="col-span-2"></div>  
      <div className="bg-white p-2 rounded shadow-md col-span-10">
        <h2 className="text-2xl font-bold mb-12 text-center">Astronauts</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
        </div> 

        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-2">Name</th>
              <th className="border border-gray-300 px-2 py-2">Specialisation</th>
              <th className="border border-gray-300 px-2 py-2">Photo</th>
              <th className="border border-gray-300 px-2 py-2">Phone</th>
              <th className="border border-gray-300 px-2 py-2">Email</th>
              <th className="border border-gray-300 px-2 py-2">Age</th>
              <th className="border border-gray-300 px-2 py-2">Height & Weight</th>
              <th className="border border-gray-300 px-2 py-2">Experience</th>
            </tr>
          </thead>
          <tbody>
            {astronautsData?.length > 0 ? (
              astronautsData?.map((astronaut: any, index: number) => (
                <React.Fragment key={astronaut.id || index}>
                  <tr
                    className="hover:bg-gray-100 cursor-pointer"
                     // Fetch details on row click
                  >
                    <td className="border border-gray-300 px-2 py-2">{astronaut?.firstName} {astronaut?.lastName} <a href={`/astronaut/?id=${ astronaut.id }`}>more</a></td>
                    <td className="border border-gray-300 px-2 py-2">{astronaut?.specialisation}</td>
                    <td className="border border-gray-300 px-2 py-2">{astronaut?.photo?.url}</td>
                    <td className="border border-gray-300 px-2 py-2">{astronaut?.phone}</td>
                    <td className="border border-gray-300 px-2 py-2">{astronaut?.email}</td>
                    <td className="border border-gray-300 px-2 py-2">{astronaut?.age}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      {astronaut.height} ft, {astronaut.weight} kg
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      {astronaut.experience} years
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-2">
                  No suits data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );

}

