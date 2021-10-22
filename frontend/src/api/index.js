const endpointUrl = "http://localhost:8000/registrations";

export const fetchEvents = (setEvents) => {
  fetch(endpointUrl)
    .then((response) => response.json())
    .then((data) => setEvents(data.rows));
};

export const postEvent = (values) => {
  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  };
  fetch(endpointUrl, requestOptions)
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      alert("Booking Confirmed! Please check your email for your waiver.");
    })
    .catch((error) => {
      alert("There was an error!", error);
    });
};
