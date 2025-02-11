import { useEffect, useRef, useState } from "react";
import data from "/DataAPI/Country.json?url";
import indiadata from "/DataAPI/State.json?url";
import axios from "axios";

const URL = import.meta.env.VITE_API_PINCODE;

const Checkout_Address = ({ Token, setToken }) => {
  const [CountryData, setCountryData] = useState([]);
  const [State, setState] = useState([]);
  const [ActiveState, setActiveState] = useState("");
  const [Pincode, setPincode] = useState("");
  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    PhoneNumber: "",
    Country: "",
    State: "",
    City: "",
    Area: "",
    Street: "",
    Pincode: "",
  });

  const CurrentState = useRef();

  // Fetch Country Data
  useEffect(() => {
    const GetData = async () => {
      try {
        const Response = await axios.get(data);
        setCountryData(Response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    GetData();
  }, []);

  // Fetch State Data when Country is India
  useEffect(() => {
    if (ActiveState === "India") {
      const GetState = async () => {
        try {
          const response = await axios.get(indiadata);
          setState(response.data);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      };
      GetState();
    } else {
      setState([]);
    }
  }, [ActiveState]);

  // Fetch Address from Pincode API
  const GetAddress = async () => {
    if (Pincode && Pincode.length === 6) {
      try {
        const response = await axios.get(`${URL}/${Pincode}`);
        if (response.data && response.data.length > 0) {
          const { District, Block, Name, State, Country } =
            response.data[0].PostOffice[0];

          setFormData((prev) => ({
            ...prev,
            City: District,
            Street: Block,
            Area: Name,
            Country: Country,
            State: State,
            Pincode: Pincode,
          }));

          if (CurrentState.current) {
            CurrentState.current.value = State;
          }
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }
  };

  useEffect(() => {
    GetAddress();
  }, [Pincode]);

  // Handle Input Change & Update Token
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setToken((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <form className="p-5">
        <div className="grid mb-3 w-2/3">
          <label>Full Name</label>
          <input
            type="text"
            name="FullName"
            className="h-[40px] border border-gray-300 p-2"
            value={formData.FullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid mb-3 w-2/3">
          <label>Email</label>
          <input
            type="email"
            name="Email"
            className="h-[40px] border border-gray-300 p-2"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid mb-3 w-2/3">
          <label>Country</label>
          <select
            name="Country"
            value={formData.Country}
            onChange={(e) => {
              setActiveState(e.target.value);
              handleChange(e);
            }}
            className="h-[40px] border border-gray-300 p-2"
            required
          >
            <option value="">Select a Country</option>
            {CountryData.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {ActiveState === "India" && (
          <div className="grid mb-3 w-2/3">
            <label>State</label>
            <select
              name="State"
              className="h-[40px] border border-gray-300 p-2"
              ref={CurrentState}
              value={formData.State}
              onChange={handleChange}
              required
            >
              <option value="">Select your state</option>
              {State.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid mb-3 w-2/3">
          <label>Area</label>
          <input
            type="text"
            name="Area"
            value={formData.Area}
            className="h-[40px] border border-gray-300 p-2"
            readOnly
          />
        </div>

        <div className="grid mb-3 w-2/3">
          <label>Street Address</label>
          <input
            type="text"
            name="Street"
            value={formData.Street}
            className="h-[40px] border border-gray-300 p-2"
            readOnly
          />
        </div>

        <div className="grid mb-3 w-2/3">
          <label>Town/City</label>
          <input
            type="text"
            name="City"
            value={formData.City}
            className="h-[40px] border border-gray-300 p-2"
            readOnly
          />
        </div>

        <div className="grid mb-3 w-2/3">
          <label>Pincode</label>
          <input
            type="number"
            name="Pincode"
            className="h-[40px] border border-gray-300 p-2"
            value={formData.Pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              handleChange(e);
            }}
            required
          />
        </div>

        <div className="grid mb-3 w-2/3">
          <label>Phone Number</label>
          <input
            type="number"
            name="PhoneNumber"
            className="h-[40px] border border-gray-300 p-2"
            value={formData.PhoneNumber}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Checkout_Address;
