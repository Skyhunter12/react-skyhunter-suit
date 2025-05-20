

"use client";
import { useEffect, useState } from "react";
import { getAttachment, getSuit } from "../utils/actions";
import { useAuth } from "../utils/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';


export default function GetAttachment() {
  const [attachmentData, setAttachmentData] = useState<any>(null); // State to store suits data
  const [modificationData, setModifcationsData] = useState<any>(null); // State to store suits data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn } = useAuth(); // Access the global auth state
  const router = useRouter()
  let searchParams = useSearchParams()
  let id = searchParams.get('id')
  let token =localStorage.getItem("token");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    } else {
      // Fetch user data
        try {
          // Save token to localStorage and update global state
          fetchAttachment();
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      setLoading(false);
    }
    
  }, [isLoggedIn, ]);
  
  const fetchAttachment = async () => {
    try {
      let fetchdata = await getAttachment(id, token||"")
      
      if (!fetchdata?.data?.SuitsById) {
        console.error("No data found for the given filters");
        setError("No data found for the given filters.");
        return;
      }
      if(fetchdata?.data?.SuitsById){
        setAttachmentData(fetchdata?.data?.SuitsById)
      }else{
        setError("No suits data found.");
        setAttachmentData([]);
      }
      setModifcationsData(fetchdata?.data?.SuitsById.functional_modifications.slice(-1))
    } catch (err) {
      console.error("Error fetching suits data:", err);
      setError("Failed to fetch suits data.");
    } finally {
      setLoading(false);
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
        <h2 className="text-2xl font-bold mb-10 text-center">Suit details</h2>
         { attachmentData?
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
                            
                            <MDBTypography tag="h5">Module</MDBTypography>
                            <MDBCardText>{attachmentData?.module}</MDBCardText>
                            <MDBIcon far icon="edit mb-5" />
                          </MDBCol>
                          <MDBCol md="8">
                            <MDBCardBody className="p-4">
                              <MDBTypography tag="h6">Information</MDBTypography>
                              <hr className="mt-0 mb-4" />
                              <MDBRow className="pt-1">
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">serial number</MDBTypography>
                                  <MDBCardText className="text-muted">{attachmentData?.serial_number}</MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Manufactured in</MDBTypography>
                                  <MDBCardText className="text-muted">{attachmentData?.manufactured}</MDBCardText>
                                </MDBCol>
                                <MDBCol size="6" className="mb-3">
                                  <MDBTypography tag="h6">Damage condition</MDBTypography>
                                  <MDBCardText className="text-muted">{attachmentData?.last_maintainance}</MDBCardText>
                                </MDBCol>
                              </MDBRow>
                              <MDBTypography tag="h6">Damage condition</MDBTypography>
                              <hr className="mt-0 mb-4" />
                              {
                                attachmentData?.damage?.length>0 ?(
                                    attachmentData.damage.map((damg: any, index: number) => (
                                    <MDBRow className="pt-1" key={index}>
                                    <MDBCol size="12" className="mb-3">
                                    <MDBTypography tag="h6" className="text-primary">
                                        Damage Record #{index + 1}
                                    </MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Type</MDBTypography>
                                      <MDBCardText className="text-muted">{damg?.type}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Description</MDBTypography>
                                      <MDBCardText className="text-muted">{damg?.description}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Photo</MDBTypography>
                                      <MDBCardImage src={damg?.photo}
                                      alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                    </MDBCol>
                                    <MDBCol size="4" className="mb-3">
                                      <MDBTypography tag="h6">Repairable condtion</MDBTypography>
                                      <MDBCardText className="text-muted">{damg?.is_repairable ? "Can be repaired":"Dismantled"}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="12" className="mb-3">
                                      <MDBTypography tag="h6">Whether repaired</MDBTypography>
                                      <MDBCardText className="text-muted">{damg?.is_repaired? true:false}</MDBCardText>
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

