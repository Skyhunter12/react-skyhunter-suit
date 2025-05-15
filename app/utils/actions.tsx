"use server";
import axios from "axios";
const APP_URL =
  process.env.NEXT_PUBLIC_APP_LIVE_URL || process.env.NEXT_PUBLIC_APP_URL || "";

export async function getSuits(suitsByFeature: any, token: string) {
  const query = `
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
  try {
  const response = await axios.post(
    APP_URL,
    {
      query,
      variables: { feature: await suitsByFeature },
      cache: "no-store",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Include the token in the Authorization header
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  if (response && response.data) {
    return response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return {}; // Return an empty object as a fallback
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    throw new Error(`Failed to fetch suits: ${error.message}`);
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
    {
      query,
      cache: "no-store",
    },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token, // Include the token in the Authorization header
      },
    }
  );
  if (response && response.data) {
    return await response?.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return {}; // Return an empty object as a fallback
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    throw new Error(`Failed to fetch suits: ${error.message}`);
  }
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
    {
      query,
      variables: { id: id },
    },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token, // Include the token in the Authorization header
      },
    }
  );

  if (response && response.data) {
    return await response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return {}; // Return an empty object as a fallback
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    throw new Error(`Failed to fetch suits: ${error.message}`);
  }
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
    {
      query,
      variables: { personById: id },
    },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token, // Include the token in the Authorization header
      },
    }
  );

  if (response && response.data) {
    return await response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return {}; // Return an empty object as a fallback
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    throw new Error(`Failed to fetch suits: ${error.message}`);
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
      {
        query,
        variables: { feature: attachementsPayload, page: page, limit: limit },
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: token, // Include the token in the Authorization header
        },
      }
    );
    if (response && response.data) {
      return await response.data; // Return the data directly if it's valid
    } else {
      console.error("Empty or invalid response:", response);
      return {}; // Return an empty object as a fallback
    }
  } catch (err) {
    console.log(err);
    throw new Error(`${err}`);
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
  console.log("actions", token);
  try {
  const response = await axios.post(
    APP_URL,
    {
      query,
      variables: { personById: id },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Include the token in the Authorization header
      },
    }
  );

  if (response && response.data) {
    return await response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return {}; // Return an empty object as a fallback
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    throw new Error(`Failed to fetch suits: ${error.message}`);
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
    {
      query,
      variables: { feature: await feature, page: page, limit: limit },
    },
    {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: token, // Include the token in the Authorization header
      },
    }
  );
  if (response && response.data) {
    return await response.data; // Return the data directly if it's valid
  } else {
    console.error("Empty or invalid response:", response);
    return {}; // Return an empty object as a fallback
  }
  } catch (error) {
    console.error("Error fetching suits:", error);
    throw new Error(`Failed to fetch suits: ${error.message}`);
  }
}
