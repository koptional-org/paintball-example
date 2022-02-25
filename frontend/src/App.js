import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import BarLoader from "react-spinners/BarLoader";
import BookSessionModal from "./BookSessionModal";
import { format } from "date-fns";
import { useSchedule } from "./hooks/schedule";

const backgroundUrl = "/assets/mainHeader.jpg";
const aboutImageOne = "/assets/exampleImage1.jpg";
const aboutImageTwo = "/assets/exampleImage2.jpg";

const override = "display: block;margin: 0 auto;";

function App() {
  const [bookingTimeSelected, setBookingTimeSelected] = useState();

  const { events, loading, error, addEvent, checkForSignatures } =
    useSchedule();

  useEffect(() => {
    if (error) {
      alert(`There was an error: ${error.message}`);
    }
  }, [error]);

  const formattedEvents = useMemo(() => {
    return (events || []).map((event) => ({
      title: event.name,
      start: format(event.date, "yyyy-MM-dd HH:mm"),
      id: event.date,
      backgroundColor: `${event.hasSignedWaiver ? "green" : "red"}`,
    }));
  }, [events]);

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
      {loading && (
        <div className="w-full h-full fixed block top-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-95 z-50">
          <div className="text-dark sweet-loading mt-32">
            <p className="text-5xl font-medium text-center text-white">
              Extreme Paintball
            </p>
            <p className="text-xl font-medium text-center mt-4 text-white">
              Loading...
            </p>
            <p className="mt-12">
              <BarLoader color="white" css={override} loading={75} />
            </p>
          </div>
        </div>
      )}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("${backgroundUrl}")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">
              Welcome to Extreme Paintball!
            </h1>
            <p className="my-8 text-white">
              Extreme Paintball provides fun for you, your friends, your family
              and even your co-workers!
            </p>
            <a
              href="#book"
              className="btn btn-primary text-white w-full shadow-lg"
            >
              View Availability
            </a>
          </div>
        </div>
      </div>
      <section className="bg-gray-100 border-b py-8" id="book">
        <div className="container max-w-5xl mx-auto m-8">
          <h2 className="my-2 text-5xl font-black leading-tight text-center text-gray-800">
            Select a date to book
          </h2>
          <div className="bg-white shadow-xl rounded-lg p-3 h-auto my-8">
            <h3 className="text-lg text-gray-800 font-bold leading-none mb-3">
              If your event is red please check your email to sign our waiver.
            </h3>
            <div>
              <button
                onClick={checkForSignatures}
                className="btn btn-primary text-white w-full shadow-lg"
              >
                Check for signed waivers
              </button>
            </div>
            <FullCalendar
              initialView="timeGridWeek"
              firstDay={1}
              slotMinTime="09:00:00"
              slotMaxTime="18:00:00"
              slotLabelInterval="00:30:00"
              slotDuration="00:30:00"
              dateClick={(info) => {
                var date = new Date(info.dateStr);
                var today = new Date();
                if (date < today) {
                  alert("Please select a future date.");
                } else {
                  setBookingTimeSelected(info.dateStr);
                }
              }}
              allDaySlot={false}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              events={formattedEvents}
            />
          </div>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-5/6 sm:w-1/2 p-6">
              <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                10+ Maps To Play!
              </h3>
              <p className="text-gray-600 mb-8">
                Over 50 acres of custom terrain, from WW2 battlegrounds to
                modern warfare.
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
                  Fun For The Whole Family
                </h3>
                <p className="text-gray-600 mb-8">
                  We offer all types of packages at any level of experience.
                  Book your experience today!
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
