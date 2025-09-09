import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <>
      <h1 className="text-center text-xl p-8 uppercase">
        User Management MERN App
      </h1>
      <form className="input flex justify-between m-4 border rounded px-4 py-2">
        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Last Name (optional)" />
        <input type="text" placeholder="Email" required />

        <select class="outline-0">
          <option value="Select Gender" class="gender uppercase">
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
        <button className="cursor-pointer hover:text-white/50">Submit</button>
      </form>

      <div className="p-4 m-4 border rounded">
        <h1 className="mb-4 uppercase text-center">Player Card</h1>

        <div className="flex flex-wrap justify-evenly gap-4">
          <ul className="userCard">
            <li>UID: ###</li>
            <li>Name: First Last</li>
            <li>Email: a@a.com</li>
            <li>Gender: Male</li>
            <li className="flex justify-evenly">
              <button>Delete</button>
              <button>Edit</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
