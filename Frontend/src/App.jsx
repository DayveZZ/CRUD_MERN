import React, { useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Successfully toasted!", {
      // icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#242424",
        color: "#F0F0F0",
      },
    });
  };

  return (
    <>
      <div className="sticky top-0 bg-[#F0E7D6] p-4">
        <h1 className="text-center text-xl p-8 uppercase">
          User Management MERN App
        </h1>
        <form
          onSubmit={handleSubmit}
          className="input flex justify-between border-b px-4 py-2"
        >
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name (optional)" />
          <input type="text" placeholder="Email" required />

          <select class="outline-0 cursor-pointer">
            <option value="Select Gender" class="gender">
              Select Gender
            </option>
            <option value="Male" class="gender">
              Male
            </option>
            <option value="Female" class="gender">
              Female
            </option>
            <option value="Other" class="gender">
              Other
            </option>
          </select>

          <button type="submit" className="cursor-pointer hover:text-[#ea2e00]">
            Submit
          </button>
          <Toaster />
        </form>
      </div>

      <div className="p-4 m-4 border rounded">
        <h1 className="mb-4 uppercase text-center text-xl">User Card</h1>
        <div className="grid grid-cols-4 gap-4">
          <ul className="userCard">
            {/* <li>UID: ###</li> */}
            <li>Name: First Last</li>
            <li>Email: a@a.com</li>
            <li>Gender: Male</li>
            <li className="flex justify-evenly">
              <button>Delete</button>
              {/* <button>Edit</button> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
