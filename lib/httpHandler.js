export const httpHandlr = () => {
  let error = null;
  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {}
  ) => {
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    } catch (err) {
      error = err.message;
      throw err;
    }
  };

  const clearError = () => {
    error = null;
  };

  return { error, sendRequest, clearError };
};
