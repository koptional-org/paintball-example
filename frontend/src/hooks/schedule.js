import React, { useEffect, useState, useCallback } from "react";

const ENDPOINT = "http://localhost:8000";

export const useSchedule = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${ENDPOINT}/registrations`)
      .then((response) => response.json())
      .then(({ rows }) => {
        setError(null);
        setEvents(rows);
      })
      .catch((err) => {
        setError(err);
      })
      .then(() => setLoading(false));
  }, []);

  const addEvent = useCallback(
    (evt) => {
      setLoading(true);
      return fetch(`${ENDPOINT}/registrations`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evt),
      })
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            Promise.reject(data?.message ?? response.status);
          }
          setEvents([...events, evt]);
        })
        .catch((error) => {
          setError("There was an error!", error);
        })
        .then(() => setLoading(false));
    },
    [events]
  );

  return { loading, events, error, addEvent };
};
