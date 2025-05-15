import {roles} from './../utils/constants'

exports.checkRole = async function(userRole:string, req_role:string){
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

export function getParsedLocalStorageItem(key: string) {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item); // Automatically parses the data
    } catch (error) {
      console.error(`Error parsing localStorage item "${key}":`, error);
      return null; // Return null if parsing fails
    }
  }
  return null; // Return null if the item doesn't exist
}
