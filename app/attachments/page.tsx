"use client";
import { useEffect, useState } from "react";
import { getAttachments } from "../utils/actions";
import { useRouter } from "next/navigation";
import { useAuth } from "../utils/AuthContext";
import React from "react";
import Select from "react-select";

export default function Attachments() {
  const [attachmentsData, setAttachmentsData] = useState<any>(null); // State to store suits data
  const [loading, setLoading] = useState(true);
  const [client, setClent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<string | number>(1);
  const [limit, setLimit] = useState<string | number>(10);
  const { isLoggedIn, login } = useAuth(); // Access the global auth state
  const router = useRouter(); // Initialize useRouter
  
  const [attachmentsFeature, setAttachmentsFeature] = useState({
    body_part_belongs: [
      "wrist",
      "chest"
    ],
    is_active: true,
    is_damaged: false,
    is_default: false,
    is_equipped: false,
    is_equipped_to: null,
    manufactured: null,
    module: null,
    type: ["health"] // Default type value
  });
  const bodyPartOptions = [
    { value: "wrist", label: "Wrist" },
    { value: "chest", label: "Chest" },
    { value: "arm", label: "Arm" },
  ];

  const typeOptions = [
    { value: "monitor", label: "Monitor" },
    { value: "health", label: "Health" },
    { value: "wellness", label: "Wellness" },
    { value: "disease", label: "Disease" },
    { value: "communication", label: "Communication" },
  ];

  useEffect(() => {
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      const token = localStorage.getItem('token') || "";
        if (!token) {
          console.error("Token not found in localStorage");
          setError("Authentication token is missing.");
          return;
        }  
        fetchAttachments(token);
        setLoading(false)
    }
    setClent(true)
  },  [isLoggedIn, attachmentsFeature, page, limit, router]);
  
  const fetchAttachments = async (token:string) => {
    try {
      setLoading(true)
      let fetchdata = await getAttachments(attachmentsFeature, token||"", page, limit)
      console.log("fetchdata",fetchdata.data)
      if (fetchdata?.data?.Attachements?.attachment) {
        setAttachmentsData(fetchdata?.data?.Attachements?.attachment)
      } else {
        setAttachmentsData([]);
      }
    } catch (err) {
      console.error("Error fetching attachments data:", err);
      setError("Failed to fetch attachments data.");
    } finally {
      setLoading(false);
    }
  };
  const handleRowClick = async (id: string) => {
    try {
      // Navigate to the details page with the ID as a query parameter
      router.push(`/attachment?id=${id}`);
    } catch (err) {
      console.error("Error updating attachment details:", err);
    }
  };

  const handleFilterChange = async (key: string, value: any) => {
    setAttachmentsFeature((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (client &&
    <div className="min-h-screen bg-gray-100 flex justify-center bg-[url('/images/Mars_rocket_2.png')] bg-cover bg-[100%_100%] bg-center bg-no-repeat">
      {/* Use max-w-full to span all 12 columns */}
      <div className="grid grid-cols-12 w-full ">
      <div className="col-span-2"></div>  
      <div className="bg-white p-2 rounded shadow-md col-span-10">
        <h2 className="text-2xl font-bold mb-12 text-center">Attachments</h2>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
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
                <label className="block text-gray-700">Limit</label>
                <input
                type="number"
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
                className="border rounded px-2 py-2 w-full"
                min={1}
                />
            </div>
            <div className="w-full md:w-3/12">
                <label className="block text-gray-700">Body Part Belongs</label>
                <Select
                isMulti
                options={bodyPartOptions}
                value={bodyPartOptions.filter((option) =>
                  attachmentsFeature.body_part_belongs.includes(option.value)
                )}
                onChange={(selectedOptions)=>handleFilterChange('body_part_belongs', selectedOptions?.map((option:any)=>option.value))}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            <div className="w-full md:w-3/12">
                <label className="block text-gray-700">Is Active</label>
                <select
                id="isActiveFilter"
                className="border rounded px-2 py-2 w-full"
                onChange={(e)=>handleFilterChange('is_active',e.target.value === "true")}
                >
                <option value="All">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
                </select>
            </div>

            <div className="w-full md:w-3/12">
                <label className="block text-gray-700">Is Damaged</label>
                <select
                id="isDamagedFilter"
                className="border rounded px-2 py-2 w-full"
                onChange={(e)=>handleFilterChange('is_damaged', e.target.value === "true")}
                >
                <option value="All">All</option>
                <option value="true">Damaged</option>
                <option value="false">Not Damaged</option>
                </select>
            </div>

            <div className="w-full md:w-3/12">
                <label className="block text-gray-700">Is Default</label>
                <select
                id="isDefaultFilter"
                className="border rounded px-2 py-2 w-full"
                onChange={(e)=>handleFilterChange('is_default', e.target.value === "true")}
                >
                <option value="All">All</option>
                <option value="true">Default</option>
                <option value="false">Not Default</option>
                </select>
            </div>

            <div className="w-full md:w-3/12">
                <label className="block text-gray-700"> Euipped condition</label>
                <select
                id="isEquippedFilter"
                className="border rounded px-2 py-2 w-full"
                onChange={(e)=>handleFilterChange('is_equipped',e.target.value === "true")}
                >
                <option value="All">All</option>
                <option value="true">Busy</option>
                <option value="false">Idle</option>
                </select>
            </div>

            <div className="w-full md:w-3/12">
                <label className="block text-gray-700">Module</label>
                <select
                id="moduleFilter"
                className="border rounded px-2 py-2 w-full"
                onChange={(e)=>handleFilterChange('module', e.target.value)}
                >
                <option value="All">All</option>
                <option value="Heart Rate Monitor">Heart Rate Monitor</option>
                <option value="Life Support">Life Support</option>
                </select>
            </div>

            <div className="w-full md:w-3/12">
                <label className="block text-gray-700">Type</label>
                <Select
                isMulti
                options={typeOptions}
                value={typeOptions.filter((option) =>
                  attachmentsFeature.type.includes(option.value)
                )}
                onChange={(selectedOptions)=>handleFilterChange('type', selectedOptions?.map((option:any)=>option.value))}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>
        </div> 

        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-2">Module</th>
              <th className="border border-gray-300 px-2 py-2">Serial number</th>
              <th className="border border-gray-300 px-2 py-2">Manufactured in</th>
              <th className="border border-gray-300 px-2 py-2">Damaged conition</th>
              <th className="border border-gray-300 px-2 py-2">Active/Inactive</th>
              <th className="border border-gray-300 px-2 py-2">Type</th>
              <th className="border border-gray-300 px-2 py-2">Can be attached to</th>
              <th className="border border-gray-300 px-2 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {attachmentsData?.length > 0 ? (
              attachmentsData?.map((attachment: any, index: number) => (
                <React.Fragment key={attachment.id || index}>
                  <tr
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleRowClick(attachment?.id)} // Fetch details on row click
                  >
                    <td className="border border-gray-300 px-2 py-2">{attachment?.module} </td>
                    <td className="border border-gray-300 px-2 py-2">{attachment?.serial_number}</td>
                    <td className="border border-gray-300 px-2 py-2">{attachment?.manufactured}</td>
                    <td className="border border-gray-300 px-2 py-2">{attachment?.is_damaged? "Damaged":'N/A'}</td>
                    <td className="border border-gray-300 px-2 py-2">{attachment?.is_active ? "Active": "Inactive"}</td>
                    <td className="border border-gray-300 px-2 py-2">{attachment?.type?.map((e:String, index:any)=>(
                        <React.Fragment key={index}>
                            {e}
                            {index < attachment?.body_part_belongs?.length - 1 && ", "}
                        </React.Fragment>))}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">{attachment?.body_part_belongs?.map((e:String, index:any)=>(
                        <React.Fragment key={index}>
                            {e}
                            {index < attachment?.body_part_belongs?.length - 1 && ", "}
                        </React.Fragment>
                        ))}
                    </td>
                    <td className="border border-gray-300 px-2 py-2">{attachment?.description}</td>
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

