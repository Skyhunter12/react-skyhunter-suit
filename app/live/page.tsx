'use client';
import { useEffect, useState } from "react";
import AstronautWithAttachmentResults from "../attachmentResults/page";
import { useAuth } from "../utils/AuthContext";
import { getCurrentAstronautResults } from "../utils/actions";
import { useSearchParams } from "next/navigation";
import { AstronautData } from "../utils/interfaces";
import { useAstronauts } from "../utils/astronautsProvider";

interface LiveProps {
    id: string; // Replace 'string' with the appropriate type if needed
}


const Live = () => {
    let {isLoggedIn} = useAuth();
    const {astronautsData, setAstronautsData } = useAstronauts();
//   const { astronautsData, setAstronautsData } = useAstronauts();
    let [limit, setLimit] = useState(10)
    let [page, setPage] = useState(1)
    let visibility ={
        showRespirationRate: false,
        showBodyTemperature:true,
        showBloodOxygen:true,
        showRegulatedPressure:false,
        showLeakDetection:false,
        showActuators:false,
        showBloodPressure : false,
        showHeartRate: true
    }
     
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
            let data:AstronautData[] = await fetchdata?.data?.AttachementResults?.attachmentResult?.map((item: any) => {
                visibility.showRespirationRate= item.showRespirationRate ? true: false;
                visibility.showBodyTemperature= item?.body_temperature ? true: false;
                visibility.showBloodOxygen= item.o2 >1 ? true: false;
                visibility.showRegulatedPressure= item.regulated_pressure ? true: false;
                visibility.showLeakDetection= item?.leak_detection ? true: false;
                visibility.showBloodPressure= item?.bp ? true: false;
                visibility.showActuators= item?.actuators ? true: false;
                visibility.showHeartRate= item?.values.length >1 ? true: false;

                return{ id: item.id,
                name: item.name,
                description: item.description,
                effect: item.effect,
                values: item.values,
                belongs_to: item.belongs_to,
                catagory: item.catagory,
                attached_to: item.attached_to,
                is_live: item.is_live,
                severity: item.severity,
                bp : item.bp,
                oxygen_level: item.o2,
                Actuators : item.actuators ,
                leak_detection: item.leak_detection,
                rapid_pressurization: item.rapid_pressurization,
                regulated_pressure: item.regulated_pressure,
                respiration_rate: item.respiration_rate,
                body_temperature: item.body_temperature
               }
            }) ;
             setAstronautsData( data )
        } catch (error) {
            console.error("Error fetching astronauts data:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Astronaut Live</h1>
        {/* // @ts-ignore */}
        <AstronautWithAttachmentResults
        showRespirationRate={visibility.showRegulatedPressure as boolean}
        showBodyTemperature={visibility.showBodyTemperature as boolean}
        showBloodOxygen={visibility.showBloodOxygen as boolean}
        showRegulatedPressure={visibility.showRegulatedPressure as boolean}
        showLeakDetection={visibility.showLeakDetection as boolean}
        showActuators={visibility.showActuators as boolean}
        showBloodPressure={visibility.showBloodPressure as boolean}
        showHeartRate={visibility.showHeartRate as boolean}
        // astronautsData={astronautsData && astronautsData.length > 0 ? astronautsData : null} // Pass the first astronaut or null
        />
      </div>
    );
  };
  
  export default Live;