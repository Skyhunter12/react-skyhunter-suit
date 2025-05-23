import {roles} from './../utils/constants'

export async function checkRole(userRole:string, req_role:string){
    const userRoleIndex = roles.indexOf(userRole);
        const requestedRoleIndex = roles.indexOf(req_role);

        if(userRoleIndex < 0 || requestedRoleIndex < 0){
            // mpdify custom error in better manner with status code
            throw new Error('Invalid role', {});
        }
        if(userRoleIndex < requestedRoleIndex){
            throw new Error('You are not authorized to view this page', { });
        }
        return true;
}

export async function normalizeToJsonObject(input: any): Promise<Record<string, any>> {
  // If input is a string, try to parse it
  if (typeof input === "string" ) {   
    
    try {
      if(input.trim() !== ""){
      input = await JSON.parse(input);
      }else{
        return {};
      }
    } catch {
      // If not valid JSON, wrap as object
      return { value: input };
    }
  }
  // If input is an array, wrap in an object
  if (Array.isArray(input)) {
    return { value: input };
  }
  // If input is already an object, return as is
  if (typeof input === "object" && input !== null) {
    return input;
  }
  // For other types, wrap as object
  return { value: input };
}
