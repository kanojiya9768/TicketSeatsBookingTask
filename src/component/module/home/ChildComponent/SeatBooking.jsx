import React, { useState } from "react";

export const SeatBooking = () => {
  const seatsArrangement = [
    {
      name: "VIP",
      Rows: 5,
      columns: 5,
    },
    {
      name: "General",
      Rows: 6,
      columns: 6,
    },
    {
      name: "Economy",
      Rows: 8,
      columns: 8,
    },
  ];

  const [SeatsBooking, setSeatsBooking] = useState([{}]);

  const handleBooking = (name, rowId, colId) => {
    if (
      SeatsBooking?.some(
        (data) =>
          data?.name === name && data?.rowId === rowId && data?.colId === colId
      )
    ) {
      let allBookingSeats = SeatsBooking?.filter(
        (data) => data?.name !== undefined
      );
      let foundIndex = SeatsBooking?.findIndex(
        (data) =>
          data?.name === name && data?.rowId === rowId && data?.colId === colId
      );
      allBookingSeats?.splice(foundIndex, 1);
      setSeatsBooking(allBookingSeats);
    } else {
      if (SeatsBooking?.length < 5) {
        let allBookingSeats = SeatsBooking?.filter(
          (data) => data?.name !== undefined
        );
        allBookingSeats?.push({ name, rowId, colId });
        setSeatsBooking(allBookingSeats);
      } else {
        alert("You can book only 5 tickets at a time.");
      }
    }
  };

  const handleconfirm = () => {
    let allBookingSeats = SeatsBooking?.filter(
      (data) => data?.name !== undefined
    );
    console.log(allBookingSeats);
    
    if (allBookingSeats?.length > 0 && allBookingSeats?.length <= 5) {
      alert(
        `Booking Seats Are \n ${SeatsBooking?.map(
          (data) => `${data?.name} : ${data?.rowId}-${data?.colId} \n`
        )}`
      );
    }else{
        alert("Book At Least 1 Seats.")
    }
  };

  return (
    <div>
      {seatsArrangement?.map((data, index) => {
        return (
          <div key={index}>
            <h3>{data?.name}</h3>
            {/* //seats  */}
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {new Array(data?.Rows)?.fill(0)?.map((row, rowId) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "space-between",
                    }}
                  >
                    {new Array(data?.columns)?.fill(0)?.map((column, colId) => {
                      return (
                        <button
                          className={`${
                            SeatsBooking?.some(
                              (seats) =>
                                seats?.name === data?.name &&
                                seats?.rowId === rowId + 1 &&
                                seats?.colId === colId + 1
                            )
                              ? "ActiveButton"
                              : "NonActiveButton"
                          }`}
                          onClick={() =>
                            handleBooking(data?.name, rowId + 1, colId + 1)
                          }
                        >{`${rowId + 1} ${colId + 1}`}</button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <button
        onClick={handleconfirm}
        style={{
          marginBlock: "20px",
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
};
