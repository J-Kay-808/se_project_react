// export const processServerResponse = (res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Error: ${res.status}`);
//   };

  export const processServerResponse = (res) => {
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      return res.json();  // Return the parsed JSON data
    }
  
    // Attempt to parse error message from the body if available
    return res.json()
      .then((data) => {
        // Reject with detailed error message if found
        return Promise.reject(data.error || `Error: ${res.status}`);
      })
      .catch(() => {
        // If body can't be parsed (e.g., not JSON), return a generic error message
        return Promise.reject(`Error: ${res.status}`);
      });
  };