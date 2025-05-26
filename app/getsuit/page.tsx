

"use client";
import { useEffect, useState } from "react";
import { getSuit } from "../utils/actions";
import { useAuth } from "../utils/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';


export default function GetSuit() {
  const [suitData, setSuitData] = useState<any>(null); // State to store suits data
  const [modificationData, setModifcationsData] = useState<any>(null); // State to store suits data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth(); // Access the global auth state
  const router = useRouter()
  const APP_URL = process.env.NEXT_PUBLIC_APP_LIVE_URL || process.env.NEXT_PUBLIC_APP_URL || '';
  
  let searchParams = useSearchParams()
  let id = searchParams.get('id')
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      // Fetch user data
      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        try {
          // Save token to localStorage and update global state
          let token =localStorage.getItem("token");
          const fetchSuit = async () => {
            try {
              let fetchdata = await getSuit(APP_URL,id, token)
              
              if (!fetchdata?.data?.SuitsById) {
                console.error("No data found for the given filters");
                setError("No data found for the given filters.");
                return;
              }
              if(fetchdata?.data?.SuitsById){
                setSuitData(fetchdata?.data?.SuitsById)

              }else{
                setError("No suits data found.");
                setSuitData([]);
              }
              setModifcationsData(fetchdata?.data?.SuitsById.functional_modifications.slice(-1))
            } catch (err) {
              console.error("Error fetching suits data:", err);
              setError("Failed to fetch suits data.");
            } finally {
              setLoading(false);
            }
          };
      
          fetchSuit();
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
        setLoading(false)
      } else {
        console.warn("No user data found in localStorage.");
      }
      setLoading(false);
    }
    
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-2 rounded shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-10 text-center">Suit details</h2>
         { suitData?
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
                            
                            <MDBTypography tag="h5">{suitData?.model}</MDBTypography>
                            <MDBCardText>{suitData?.serial_number}</MDBCardText>
                            <MDBIcon far icon="edit mb-5" />
                          </MDBCol>
                          <MDBCol md="8">
                            <MDBCardBody className="p-4">
                              <MDBTypography tag="h6">Model details</MDBTypography>
                              <hr className="mt-0 mb-4" />
                              <MDBRow className="pt-1">
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Size</MDBTypography>
                                  <MDBCardText className="text-muted">{suitData?.size}</MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Manufactured in</MDBTypography>
                                  <MDBCardText className="text-muted">{suitData?.manufactured}</MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Recent maintainance</MDBTypography>
                                  <MDBCardText className="text-muted">{suitData?.last_maintainance}</MDBCardText>
                                </MDBCol>
                              </MDBRow>
                              <MDBTypography tag="h6">Functional modification's Information</MDBTypography>
                              <hr className="mt-0 mb-4" />
                              {
                                suitData?.functional_modifications?.length>0 ?(
                                    suitData.functional_modifications?.map((func_modification: any, index: number) => (
                                    <MDBRow className="pt-1" key={index}>
                                    <MDBCol size="12" className="mb-3">
                                    <MDBTypography tag="h6" className="text-primary">
                                        Medical Record #{index + 1}
                                    </MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Module</MDBTypography>
                                      <MDBCardText className="text-muted">{func_modification?.module}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Installed on</MDBTypography>
                                      <MDBCardText className="text-muted">{func_modification?.installed_on}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Photo</MDBTypography>
                                      <MDBCardImage src={func_modification?.photo}
                                      alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Name</MDBTypography>
                                      <MDBCardText className="text-muted">{func_modification?.name}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="12" className="mb-3">
                                      <MDBTypography tag="h6">Description</MDBTypography>
                                      <MDBCardText className="text-muted">{func_modification?.description}</MDBCardText>
                                    </MDBCol>
                                  </MDBRow>))   
                                ):(
                                    <MDBRow className="pt-1">
                                        No latest modifications found
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

