"use server";
import axios from "axios";
import gql from "graphql-tag";
import { print } from "graphql";
const APP_URL =
  process.env.NEXT_PUBLIC_APP_LIVE_URL || process.env.NEXT_PUBLIC_APP_URL || "";

export async function getSuits(suitsByFeature: any, token: string) {
  const query = gql`
    query SuitsByFeature($feature: fetchfeature) {
      SuitsByFeature(feature: $feature) {
        suits {
        id
        generation
        last_maintainance
        lifetime {
          days
          months
          years
        }
        functional_modifications {
          description
          installed_on
          photo
          module
          name
        }
        manufactured
        model
        serial_number
        size
      }
      page
      limit
      total_pages
      count   
     }
    }
  `;
  const gqlModifiedQuery = print(query); // If using a string, print just returns the string

  const payload = {
    query: gqlModifiedQuery,
    variables: {
      feature: await suitsByFeature
    }
  };
  const config = {
    method: 'post',
    url: APP_URL,
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
    data: JSON.stringify(payload)
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response) {
    console.error('Server responded with non-2xx status:', error.response.status);
    console.error('Headers:', error.response.headers);
    console.error('Response Data:', error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Axios error setting up request:', error.message);
  }
  throw error;    
  }
}
export async function getAstronauts(token: string) {
  const query = `query Persons {
  Persons {
    id
    firstName
    lastName
    specialisation
    photos {
      id
      url
    }
    phone
    alternate_phone
    email
    age
    height
    weight
    experience
    training
    medical_history {
      id
      disease
      medication
      medication_date
      medication_duration
      medication_dosage
      medication_frequency
      medication_reason
      medication_side_effects
      medication_side_effects_date
      medication_side_effects_duration
      medication_side_effects_dosage
      medication_side_effects_frequency
      medication_side_effects_reason
    }
  }
}`;
  try {
  const response = await axios.post(
    APP_URL,
    JSON.stringify({
      query,
      cache: "no-store",
    }),
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}` // Include the token in the Authorization header
      },
    }
  );
  if (response && response.data) {
    return await response?.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return { data: null, errors: [{ message: "Empty or invalid response from server" }] };
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
return {
    data: null,
    errors: [
      {
        message: error?.message || "Unknown error",
        ...(error?.response?.data?.errors?.[0] || {}),
      },
    ],
  };  }
}

export async function getSuit(id: any, token: string) {
  const query = `
    query SuitsById($id: ID!) {
  SuitsById(id: $id) {
    id
    model
    serial_number
    size
    manufactured
    last_maintainance
    functional_modifications {
      module
      name
      description
      installed_on
      usage
      photo
      type
    }
    age
    updatedAt
  }
}`;
  try {
  const response = await axios.post(
    APP_URL,
    JSON.stringify({
      query,
      variables: { id: await id },
    }),
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}` // Include the token in the Authorization header
      },
    }
  );

  if (response && response.data) {
    return await response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return { data: null, errors: [{ message: "Empty or invalid response from server" }] };
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
return {
    data: null,
    errors: [
      {
        message: error?.message || "Unknown error",
        ...(error?.response?.data?.errors?.[0] || {}),
      },
    ],
  };  }
}
export async function getAstronaut(id: any, token: string) {
  const query = `query PersonById($personById: ID!) {
  PersonById(id: $personById) {
    id
    firstName
    lastName
    specialisation
    photos {
      id
      url
      type
    }
    phone
    alternate_phone
    email
    age
    height
    weight
    experience
    training
    medical_history {
      id
      disease
      medication
      medication_date
      medication_duration
      medication_dosage
      medication_frequency
      medication_reason
      medication_side_effects
      medication_side_effects_date
      medication_side_effects_duration
      medication_side_effects_dosage
      medication_side_effects_frequency
      medication_side_effects_reason
    }
  }
}`;

  try {
  const response = await axios.post(
    APP_URL,
    JSON.stringify({
      query,
      variables: { personById: await id },
    }),
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}` // Include the token in the Authorization header
      },
    }
  );

  if (response && response.data) {
    return await response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return { data: null, errors: [{ message: "Empty or invalid response from server" }] };
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    return {
      data: null,
      errors: [
        {
          message: error?.message || "Unknown error",
          ...(error?.response?.data?.errors?.[0] || {}),
        },
      ],
    };
  }
}

export async function getAttachments(
  attachementsPayload: any,
  token: string,
  page: any,
  limit: any
) {
  const query = `query Attachements($feature: attachment_by_feature, $page: Int, $limit: Int) {
    Attachements(feature: $feature, page: $page, limit: $limit) {
      page
      limit
      attachment {
        id
        module
        serial_number
        manufactured
        is_damaged
        damage {
          type
          description
          photo
          severity
          is_repairable
          is_repaired
          repairMeta {
            cost
            repaired_by
            repaired_on
          }
        }
        type
        is_active
        is_default
        body_part_belongs
        description
        equipped_details {
          equipped_at
          equipped_by
          equipped_on
          equipped_under
        }
      }
      total
      pages
    }
  }
`;
  try {
    const response = await axios.post(
      APP_URL,
      JSON.stringify({
        query,
        variables: { feature: await attachementsPayload, page:await page, limit:await limit },
      }),
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}` // Include the token in the Authorization header
        },
      }
    );
    if (response && response.data) {
      return await response.data; // Return the data directly if it's valid
    } else {
      console.error("Empty or invalid response:", response);
    return { data: null, errors: [{ message: "Empty or invalid response from server" }] };
    }
  } catch (err) {
    console.log(err);
    return {
      data: null,
      errors: [
        {
          message: err?.message || "Unknown error",
          ...(err?.response?.data?.errors?.[0] || {}),
        },
      ],
    };  
  }
}

export async function getAttachment(id: any, token: string) {
  const query = `query PersonById($personById: ID!) {
  PersonById(id: $personById) {
    id
    firstName
    lastName
    specialisation
    photos {
      id
      url
      type
    }
    phone
    alternate_phone
    email
    age
    height
    weight
    experience
    training
    medical_history {
      id
      disease
      medication
      medication_date
      medication_duration
      medication_dosage
      medication_frequency
      medication_reason
      medication_side_effects
      medication_side_effects_date
      medication_side_effects_duration
      medication_side_effects_dosage
      medication_side_effects_frequency
      medication_side_effects_reason
    }
  }
}`;
  
try {
  const response = await axios.post(
    APP_URL,
    JSON.stringify({
      query,
      variables: { personById: await id },
    }),
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}` // Include the token in the Authorization header
      },
    }
  );

  if (response && response.data) {
    return await response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return { data: null, errors: [{ message: "Empty or invalid response from server" }] };
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    return {
      data: null,
      errors: [
        {
          message: error?.message || "Unknown error",
          ...(error?.response?.data?.errors?.[0] || {}),
        },
      ],
    };  
  }
}

export async function getCurrentAstronautResults(
  feature: any,
  token: string,
  page: any,
  limit: any
) {
  let query = `query Query( $page: Int, $limit: Int, $feature: attachment_results_by_feature) {
  AttachementResults(page: $page, limit: $limit, feature: $feature) {
    page
    limit
    total
    pages
    attachmentResult {
      attached_to
      belongs_to
      catagory
      description
      effect
      id
      is_live
      name
      severity
      values
    }
  }
}`;

  try {
  const response = await axios.post(
    APP_URL,
    JSON.stringify({
      query,
      variables: { feature: await feature, page:await page, limit: await limit },
    }),
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Content-Type": "application/json",
        Authorization:`Bearer ${token}` // Include the token in the Authorization header
      },
    }
  );
  if (response && response.data) {
    return await response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return { data: null, errors: [{ message: "Empty or invalid response from server" }] };
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    return {
      data: null,
      errors: [
        {
          message: error?.message || "Unknown error",
          ...(error?.response?.data?.errors?.[0] || {}),
        },
      ],
    };  
  }
}
