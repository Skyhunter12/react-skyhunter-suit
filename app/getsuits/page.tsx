"use client";
import { useEffect, useState } from "react";
import { getSuit, getSuits } from "../utils/actions";
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/AuthContext";

export default function GetSuits() {
  const [suitsData, setSuitsData] = useState<any>(null); // State to store suits data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSuit, setSelectedSuit] = useState<any | null>(null); // State to store the selected suit's details
  const { isLoggedIn, login } = useAuth(); // Access the global auth state
  
  const [moduleFilter, setModuleFilter] = useState<string>("All");
  const [nameFilter, setNameFilter] = useState<string>("All");
  const [limit, setLimit] = useState<number>(2);
  const [page, setPage] = useState<number>(1);
  const router = useRouter()

  const suitsByFeature = {
    module: moduleFilter !== "All" ? [moduleFilter] : null,
    name: nameFilter !== "All" ? [nameFilter] : null,
    limit,
    page,
  };
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      // Fetch user data

        try {

          // Save token to localStorage and update global state
          let token =localStorage.getItem("token");
          login(token); // Update the logged-in state in AuthContext
          const fetchSuits = async () => {
            try {
              let fetchdata = await getSuits(suitsByFeature, token||"")
              console.log("fetchdata",fetchdata.data.SuitsByFeature.suits)
              setSuitsData(fetchdata?.data?.SuitsByFeature?.suits)
            } catch (err) {
              console.error("Error fetching suits data:", err);
              setError("Failed to fetch suits data.");
            } finally {
              setLoading(false);
            }
          };
      
          fetchSuits();
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
        setLoading(false)
    }
    
  },  [moduleFilter, nameFilter, limit, page, isLoggedIn, login, router]);

  const handleRowClick = async (id: string) => {
    try {
      router.push(`/getsuit?id=${ id }`) 
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
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center bg-[url('/images/Mars_rocket_2.png')] bg-cover bg-[100%_100%] bg-center bg-no-repeat">
      {/* Use max-w-full to span all 12 columns */}
      <div className="grid grid-cols-12 w-full ">
      <div className="col-span-2"></div>  
      <div className="bg-white p-2 rounded shadow-md col-span-10">
        <h2 className="text-2xl font-bold mb-12 text-center">Suits</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          <div className="w-full md:w-3/12">
            <label className="block text-gray-700">Module</label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="border rounded px-2 py-2 w-full"
            >
              <option value="All">All</option>
              <option value="AR Module">AR Module</option>
              <option value="Life Support">Life Support</option>
            </select>
          </div>

          <div className="w-full md:w-3/12">
            <label className="block text-gray-700">Name</label>
            <select
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="borderla rounded px-2 py-2 w-full"
            >
              <option value="All">All</option>
              <option value="Sidekick">Sidekick</option>
              <option value="Oxygen Module">Oxygen Module</option>
            </select>
          </div>

          <div className="w-full md:w-3/12">
            <label className="block text-gray-700">Limit</label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="border rounded px-2 py-2 w-full"
              min={1}
            />
          </div>

          <div className="w-full md:w-3/12">
            <label className="block text-gray-700">Page</label>
            <input
              type="number"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
              className="border rounded px-2 py-2 w-full"
              min={1}
            />
          </div>
        </div>

        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-2">Model</th>
              <th className="border border-gray-300 px-2 py-2">Serial Number</th>
              <th className="border border-gray-300 px-2 py-2">Size</th>
              <th className="border border-gray-300 px-2 py-2">Generation</th>
              <th className="border border-gray-300 px-2 py-2">Manufactured</th>
              <th className="border border-gray-300 px-2 py-2">Last Maintenance</th>
              <th className="border border-gray-300 px-2 py-2">Lifetime</th>
            </tr>
          </thead>
          <tbody>
            {suitsData?.length > 0 ? (
              suitsData?.map((suit: any, index: number) => (
                <>
                  <tr
                    key={suit?.id || index}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(suit?.id)} // Fetch details on row click
                  >
                    <td className="border border-gray-300 px-2 py-2">{suit?.model}</td>
                    <td className="border border-gray-300 px-2 py-2">{suit?.serial_number}</td>
                    <td className="border border-gray-300 px-2 py-2">{suit?.size}</td>
                    <td className="border border-gray-300 px-2 py-2">{suit?.generation}</td>
                    <td className="border border-gray-300 px-2 py-2">{suit?.manufactured}</td>
                    <td className="border border-gray-300 px-2 py-2">{suit?.last_maintainance}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      {suit.lifetime.years} years, {suit.lifetime.months} months, {suit.lifetime.days} days
                    </td>
                  </tr>
                  {selectedSuit?.id === suit.id && (
                    <tr>
                      <td colSpan={7} className="border border-gray-300 px-2 py-2">
                        <div>
                          <strong>Details:</strong>
                          <p>Module: {selectedSuit?.functional_modifications?.module}</p>
                          <p>Name: {selectedSuit?.functional_modifications?.name}</p>
                          <p>Description: {selectedSuit?.functional_modifications?.description}</p>
                          <p>Installed On: {selectedSuit?.functional_modifications?.installed_on}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
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

