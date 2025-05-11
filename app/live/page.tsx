'use client';
import { useEffect, useState } from "react";
import AstronautWithAttachmentResults from "../attachmentResults/page";
import { useAuth } from "../utils/AuthContext";
import { getCurrentAstronautResults } from "../utils/actions";
import { useSearchParams } from "next/navigation";

interface LiveProps {
    id: string; // Replace 'string' with the appropriate type if needed
}
type AstronautData = {
    name: String
    description: String
    effect: String
    values: [String]
    belongs_to: [String]
    catagory: [String]
    attached_to: [String]
    is_live: Boolean
    severity: String
    bp : String
    oxygen_level: String
    Actuators : String 
    leak_detection: String
    rapid_pressurization: String
    regulated_pressure: String
    respiration_rate: String
    body_temperature: String
}

const Live = () => {
    let {isLoggedIn} = useAuth();
    let [astronautsData, setAstronautsData] = useState<AstronautData[] | null>(null); // State to store suits data
    let [page, setPage] = useState(1)
    let [limit, setLimit] = useState(10)
    let [client, SetClient] = useState(false)
    let searchParams = useSearchParams()
    let id = searchParams.get('id')
        
    useEffect(()=>{
        let token = localStorage.getItem('token') || '';
        let feature = {
            belongs_to:id
        }
        fetchData(feature, token, page, limit);
    },[isLoggedIn, page, limit])

    const fetchData = async (feature:any, token:string, page:number, limit:number) => {
        try {
            let feature = {
                belongs_to:id
            }
            let fetchdata = await getCurrentAstronautResults(feature, token, page, limit)
            setAstronautsData(fetchdata.data.AttachementResults.attachmentResult)
        } catch (error) {
            console.error("Error fetching astronauts data:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Astronaut Live</h1>
        <AstronautWithAttachmentResults
        showRespirationRate={true}
        showBodyTemperature={true}
        showBloodOxygen={true}
        showRegulatedPressure={true}
        showLeakDetection={true}
        showMaterialInnovations={true}
        showRapidPressurization={true}
        showActuators={true}
        showBloodPressure={true}
        showHeartRate={true}
        astronautsData={astronautsData}
        />
      </div>
    );
  };
  
  export default Live;