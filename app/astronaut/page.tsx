"use client";
import { useEffect, useState } from "react";
import { getAstronaut } from "../utils/actions";
import { useAuth } from "../utils/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Link from "next/link";

export default function Astronaut() {
  const [astronautData, setAstronautData] = useState<any>(null); // State to store suits data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth(); // Access the global auth state
  const router = useRouter()
  const APP_URL = process.env.NEXT_PUBLIC_APP_LIVE_URL || process.env.NEXT_PUBLIC_APP_URL || '';
  
  let searchParams = useSearchParams()
    let id = searchParams.get('id')
    
  useEffect(() => {
    if (!id) {
      setError("No astronaut ID provided.");
      setLoading(false);
      return;
    }
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      // Fetch user data
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setError("Authentication token is missing.");
            setLoading(false);
            return;
          }
          // Save token to localStorage and update global state
          
      
          fetchAstronaut(JSON.stringify(token));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
        setLoading(false)
      }
  }, [isLoggedIn, id, router]);

  const fetchAstronaut = async (token:any) => {
    try {
      
      let fetchdata = await getAstronaut(APP_URL, id, token)
      
      if (!fetchdata?.data?.PersonById) {
        console.error("No data found for the given filters");
        setError("No data found for the given filters.");
        return;
      }
      if(fetchdata?.data?.PersonById){
        setAstronautData(fetchdata?.data?.PersonById)
      }
      else{
      setAstronautData([])
      }
    } catch (err) {
      console.error("Error fetching suits data:", err);
      setError("Failed to fetch suits data.");
    } finally {
      setLoading(false);
    }
  };

  const goLive = async (id: string) => {
    try {
      router.push(`/live?id=${ id }`) // Pass the ID as a query parameter
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
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-2 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-10 text-center">Astronaut</h2>
         { astronautData?
               ( <section className="vh-100" style={{
                backgroundColor: "#f4f5f7",
                maxHeight: "80vh", // Limit the height of the section
                overflowY: "auto", // Enable vertical scrolling within the section
              }}>
                <MDBContainer className="py-5 h-100">
                  <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="12" className="mb-4 mb-lg-12">
                      <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                          <MDBCol md="4" className="gradient-custom text-center text-white"
                            style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                            <MDBCardImage src={astronautData?.photos[0]?.url} 
                              alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                            <MDBTypography tag="h5">{astronautData?.firstName} {astronautData?.lastName}</MDBTypography>
                            <MDBCardText>{astronautData?.specialisation}</MDBCardText>
                            <MDBIcon far icon="edit mb-5" />
                          </MDBCol>
                          <MDBCol md="8">
                            <MDBCardBody className="p-4">
                              <MDBTypography tag="h6" >Information</MDBTypography>
                              <div className="pt-1 d-flex justify-content-between">
                              <a href="#!" className="text-muted text-start">Edit</a>
                              <Link className="text-end" href={`/live/?id=${ astronautData.id }`}>Live Status</Link>
                              </div>
                              <hr className="mt-0 mb-4" />
                              <MDBRow className="pt-1">
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Email</MDBTypography>
                                  <MDBCardText className="text-muted">{astronautData?.email}</MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Phone</MDBTypography>
                                  <MDBCardText className="text-muted">{astronautData?.phone}</MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Specialisation</MDBTypography>
                                  <MDBCardText className="text-muted">{astronautData?.specialisation}</MDBCardText>
                                </MDBCol>
                              </MDBRow>
                              <MDBTypography tag="h6">Additional Information</MDBTypography>
                              <hr className="mt-0 mb-4" />
                              <MDBRow className="pt-1">
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Age</MDBTypography>
                                  <MDBCardText className="text-muted">{astronautData.age}</MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Height and Weight</MDBTypography>
                                  <MDBCardText className="text-muted">{astronautData?.height}ft, {astronautData.weight} kg</MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Training</MDBTypography>
                                  <MDBCardText className="text-muted">{astronautData?.training}</MDBCardText>
                                </MDBCol>
                              </MDBRow>
                              {
                                astronautData?.medical_history?.length>0 ?(
                                    astronautData.medical_history.map((m_history: any, index: number) => (
                                    <MDBRow className="pt-1" key={index}>
                                    <MDBCol size="12" className="mb-3">
                                    <MDBTypography tag="h6" className="text-primary">
                                        Medical Record #{index + 1}
                                    </MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Disease</MDBTypography>
                                      <MDBCardText className="text-muted">{m_history?.disease}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Medication</MDBTypography>
                                      <MDBCardText className="text-muted">{m_history?.medication}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Medication date</MDBTypography>
                                      <MDBCardText className="text-muted">{m_history?.medication_date}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Medication duration</MDBTypography>
                                      <MDBCardText className="text-muted">{m_history?.medication_duration}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Medication dosage</MDBTypography>
                                      <MDBCardText className="text-muted">{m_history?.medication_dosage}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Medication frequency</MDBTypography>
                                      <MDBCardText className="text-muted">{m_history?.medication_frequency}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Medication reason</MDBTypography>
                                      <MDBCardText className="text-muted">{m_history?.medication_reason}</MDBCardText>
                                    </MDBCol>
                                  </MDBRow>))   
                                ):(
                                    <MDBRow className="pt-1">
                                        No privious medical history found
                                    </MDBRow>
                                )
                              }
          
                              
          
                              <div className="d-flex justify-content-start">
                                <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                                <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                                <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                              </div>
                            </MDBCardBody>
                          </MDBCol>
                        </MDBRow>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBContainer>
              </section>)
: (
                <div>
                  <div className="text-center py-4">
                    No suits data available.
                  </div>
                </div>
              )}
        </div>
      </div>
  );
}

