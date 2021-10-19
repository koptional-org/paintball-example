const BookSessionModal = ({ bookingTimeSelected, onClose }) => {
  return (
    <>
      <div className="fixed w-full h-full top-0 left-0 flex z-50 ">
        <div className="fixed w-full h-full overflow-y-auto bg-white bg-cover pb-12">
          <div className="fixed justify-start p-2 border-b border-solid border-gray-300 bg-gray-100 w-full">
            <button
              className="text-blue-500 background-transparent font-bold text-sm outline-none focus:outline-none"
              type="button"
              onClick={onClose}
            >
              <span>Cancel</span>
            </button>
          </div>
          <div className="pt-14 container mx-auto h-auto text-left pb-4 text-center">
            <div className="text-lg font-medium px-3 text-neutral">
              Confirm your booking for {bookingTimeSelected}!
            </div>
            <button
              type="button"
              className="bg-green-400 hover:bg-green-900 text-white font-bold py-6 px-4 w-full"
              onClick={() => {
                console.log("hello");
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSessionModal;
