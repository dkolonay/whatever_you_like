import "./InfoSidebar.css";

const InfoSidebar = ({ show, closeSidebar, addressData, confirmPark }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    confirmPark();
  };

  return (
    <div className={`info-sidebar ${show ? "show-sidebar" : "hide-sidebar"}`}>
      <div onClick={closeSidebar} className={"close-sidebar"}>
        X
      </div>
      <h2>Spot Info</h2>
      <h3>Location</h3>
      {addressData && (
        <>
          <p>{`${addressData.street_num} ${addressData.street_name}`}</p>
          <p>{`${addressData.city}, ${addressData.state} ${addressData.zip}`}</p>
        </>
      )}

      <h3>Parking Laws</h3>
      <p>Street Cleaning: Mon, Thurs 9:30-11:00am</p>

      <h3>Status:</h3>
      <p>Safe until 9:30am this Thursday</p>

      <button className={"submit-park"} onClick={handleSubmit}>
        Park My Car Here
      </button>
    </div>
  );
};

export default InfoSidebar;
