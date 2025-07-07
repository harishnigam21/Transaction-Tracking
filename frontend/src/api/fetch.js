const fetchData = async (to, method, id, obj) => {
  console.log("fetching");
  const createResponse = (message) => {
    const response = {
      Message: message,
    };
    return response;
  };
  if (to && method) {
    const url = `${process.env.REACT_APP_BACKEND_HOST}/${to}`;
    if (method === "GET") {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
        });
        return response;
      } catch (error) {
        return createResponse(error.message);
      }
    } else if (method === "POST") {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(obj),
        });
        return response;
      } catch (error) {
        return createResponse(error.message);
      }
    } else if (method === "DELETE") {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ id: id }),
        });
        return response;
      } catch (error) {
        return createResponse(error.message);
      }
    }
  } else {
    return createResponse(
      "Unable to fetch url, because target and method is missing"
    );
  }
};
module.exports = fetchData;
