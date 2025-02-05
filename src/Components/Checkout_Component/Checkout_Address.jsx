import axios from "axios";
import data from "/DataAPI/Country.json?url";
import statedata from "/DataAPI/State.json?url";
import { useEffect, useRef, useState } from "react";

const URL = import.meta.env.VITE_API_PINCODE;

const Checkout_Address = () => {
  const [CountryData, setCountryData] = useState([]);
  const [State, setState] = useState([]) || ""
  const [ActiveState, setActiveState] = useState("");
  const [Pincode, SetPincode] = useState("");
  const [City, setCity] = useState("");
  const [Area, setArea] = useState("");
  const [Street, setStreet] = useState("");
  const CurrentState = useRef()

  useEffect(() => {
    const GetData = async () => {
      const Response = await axios.get(data);
      setCountryData(Response.data);
    };

    GetData();
  }, []);

  useEffect(() => {
    if (ActiveState === "India") {
      const GetState = async () => {
        const response = await axios.get(statedata);
        setState(response.data);
      };
      GetState();
    }
  }, [ActiveState]);

  const GetAddress = async () => {
    if (Pincode && Pincode.length === 6) {
      try {
        const response = await axios.get(`${URL}/${Pincode}`);
        if (response.data && response.data.length > 0) {
          const { District, Block, Name, State, Country } =
            response.data[0].PostOffice[0];

          setCity(District); // Set City
          setStreet(Block); // Set Street
          setArea(Name); // Set Area
          setActiveState(Country); // Set Country
          CurrentState.current.value = State
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
  };

  useEffect(() => {
    GetAddress();
  }, [Pincode]);

  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="grid m-3 w-2/3">
          <label htmlFor="">FullName</label>
          <input
            type="text"
            className="h-[40px] w-auto border border-solid border-gray-300"
          />
        </div>

        <div className="grid m-3 w-2/3">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="h-[40px] w-auto border border-solid border-gray-300"
          />
        </div>

        <div className="grid m-3 w-2/3">
          <label htmlFor="">Country</label>
          <select
            name=""
            id=""
            value={ActiveState}
            onChange={(e) => setActiveState(e.target.value)}
            className="h-[40px] w-auto border border-solid border-gray-300"
          >
            <option
              value=""
              className="h-[40px] w-auto border border-solid border-gray-300"
            >
              Select the Country
            </option>
            {CountryData.map((item) => (
              <option
                key={item.name}
                value={item.name}
                className="h-[40px] w-auto border border-solid border-gray-300"
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid m-3 w-2/3">
          <label htmlFor="">Area</label>
          <input
            type="text"
            id="Area"
            value={Area}
            className="h-[40px] w-auto border border-solid border-gray-300"
            readOnly
          />
        </div>

        <div className="grid m-3 w-2/3">
          <label htmlFor="">Street Address</label>
          <input
            type="text"
            id="Street"
            value={Street}
            className="h-[40px] w-auto border border-solid border-gray-300"
            readOnly
          />
        </div>

        <div className="grid m-3 w-2/3">
          <label htmlFor="">Town/City</label>
          <input
            type="text"
            id="city"
            value={City}
            className="h-[40px] w-auto border border-solid border-gray-300"
            readOnly
          />
        </div>

        {ActiveState === "India" && (
          <>
            <div className="grid m-3 w-2/3">
              <label htmlFor="">State</label>
              <select
                name=""
                id=""
                className="h-[40px] w-auto border border-solid border-gray-300"
                ref={CurrentState}
                required
              >
                <option
                  value=""
                  className="h-[40px] w-auto border border-solid border-gray-300"
                >
                  Select your state
                </option>
                {State.map((item) => (
                  <option
                    key={item.name}
                    value={item.name}
                    className="h-[40px] w-auto border border-solid border-gray-300"
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="grid m-3 w-2/3">
          <label htmlFor="">Pincode</label>
          <input
            type="Number"
            className="h-[40px] w-auto border border-solid border-gray-300"
            value={Pincode}
            onChange={(e) => SetPincode(e.target.value)}
            required
          />
        </div>

        <div className="grid m-3 w-2/3">
          <label htmlFor="">PhoneNumber</label>
          <input
            type="Number"
            className="h-[40px] w-auto border border-solid border-gray-300"
            required
          />
        </div>

        <div className="grid m-3 w-2/3">
          <label htmlFor="">Email</label>
          <input
            type="Email"
            className="h-[40px] w-auto border border-solid border-gray-300"
            required
          />
        </div>
      </form>
    </>
  );
};

export default Checkout_Address;
