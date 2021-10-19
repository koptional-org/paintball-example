import React, { useState, useEffect } from "react";
import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import BookSessionModal from "./BookSessionModal";

const backgroundUrl = "/assets/mainHeader.jpg";
const aboutImageOne = "/assets/exampleImage1.jpg";
const aboutImageTwo = "/assets/exampleImage2.jpg";

function App() {
  const [bookingTimeSelected, setBookingTimeSelected] = useState();
  const [events, setEvents] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  const addEvent = (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
      mode: "no-cors",
    };
    fetch("http://localhost:8000/", requestOptions)
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

  return (
    <>
      {bookingTimeSelected && (
        <>
          <BookSessionModal
            bookingTimeSelected={bookingTimeSelected}
            onClose={() => setBookingTimeSelected()}
            addEvent={addEvent}
          />
        </>
      )}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("${backgroundUrl}")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center flex justify-center align-center text-neutral w-full container">
          <div className="md:w-8/12 lg:6/12 bg-white shadow-xl rounded p-3 h-auto">
            <FullCalendar
              initialView="timeGridWeek"
              firstDay={1}
              slotMinTime="09:00:00"
              slotMaxTime="18:00:00"
              slotLabelInterval="00:20:00"
              slotDuration="00:20:00"
              dateClick={(info) => {
                setBookingTimeSelected(info.dateStr);
              }}
              allDaySlot={false}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              events={events}
            />
          </div>
        </div>
      </div>
      <section className="bg-gray-100 border-b py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="w-full my-2 text-5xl font-black leading-tight text-center text-gray-800">
            Title
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>

          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                Lorem ipsum dolor sit amet
              </h3>
              <p className="text-gray-600 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                at ipsum eu nunc commodo posuere et sit amet ligula.
              </p>
            </div>
            <div className="w-full sm:w-1/2 p-6">
              <img
                className="mx-auto"
                src={aboutImageOne}
                alt="Example paintball"
              />
            </div>
          </div>

          <div className="flex flex-wrap flex-col-reverse sm:flex-row">
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <img
                className="mx-auto"
                src={aboutImageTwo}
                alt="Example paintball"
              />
            </div>
            <div className="w-full sm:w-1/2 p-6 mt-6">
              <div className="align-middle">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Lorem ipsum dolor sit amet
                </h3>
                <p className="text-gray-600 mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-base text-primary p-3">
          Photos by{" "}
          <a href="https://www.pexels.com/@bulat?utm_content=attributionCopyText&amp;utm_medium=referral&amp;utm_source=pexels">
            Bulat Khamitov
          </a>{" "}
          from{" "}
          <a href="https://www.pexels.com/photo/a-person-holding-a-paintball-gun-5619640/?utm_content=attributionCopyText&amp;utm_medium=referral&amp;utm_source=pexels">
            Pexels
          </a>
        </div>
      </section>
    </>
  );
}

export default App;
