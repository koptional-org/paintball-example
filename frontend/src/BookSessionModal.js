import React, { useState } from "react";

import { format } from "date-fns";
import { getTime } from "date-fns";

const BookSessionModal = ({ bookingTimeSelected, onClose, addEvent }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 flex z-50 ">
        <div className="fixed w-full h-full overflow-y-auto bg-white bg-cover pb-12">
          <div className="fixed justify-start p-2 border-b border-solid border-gray-300 bg-gray-100 w-full">
            <button
              className="text-secondary background-transparent font-bold text-lg outline-none focus:outline-none"
              type="button"
              onClick={onClose}
            >
              <span>Cancel</span>
            </button>
          </div>
          <div className="py-24 container mx-auto h-auto text-left pb-4 text-center">
            <div className="text-lg font-medium px-3 text-neutral">
              Confirm your booking for{" "}
              <strong className="text-primary">
                {format(new Date(bookingTimeSelected), "MMMM do yyyy")} at{" "}
                {format(new Date(bookingTimeSelected), "p")}
              </strong>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addEvent({
                  name,
                  email,
                  phone,
                  address,
                  city,
                  state,
                  date: getTime(new Date(bookingTimeSelected)),
                });
                onClose();
              }}
            >
              <div className="my-12">
                <div className="my-4">
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="px-3 py-3 placeholder-gray-600 text-gray-800 bg-gray-100 rounded focus:shadow-outline focus:outline-none w-full"
                  />
                </div>
                <div className="my-4">
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="px-3 py-3 placeholder-gray-600 text-gray-800 bg-gray-100 rounded focus:shadow-outline focus:outline-none w-full"
                  />
                </div>
                <div className="my-4">
                  <input
                    required
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="px-3 py-3 placeholder-gray-600 text-gray-800 bg-gray-100 rounded focus:shadow-outline focus:outline-none w-full"
                  />
                </div>
                <div className="my-4 grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div className="md:col-span-3">
                    <input
                      required
                      type="address"
                      name="address"
                      id="address"
                      placeholder="Address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      className="px-3 py-3 placeholder-gray-600 text-gray-800 bg-gray-100 rounded focus:shadow-outline focus:outline-none w-full"
                    />
                  </div>
                  <div className="">
                    <input
                      required
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      className="px-3 py-3 placeholder-gray-600 text-gray-800 bg-gray-100 rounded focus:shadow-outline focus:outline-none w-full"
                    />
                  </div>
                  <div className="">
                    <input
                      required
                      type="text"
                      name="state"
                      id="state"
                      maxLength={2}
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                      className="px-3 py-3 placeholder-gray-600 text-gray-800 bg-gray-100 rounded focus:shadow-outline focus:outline-none w-full"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-primary hover:bg-secondary text-white font-bold py-6 px-4 w-full"
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSessionModal;
