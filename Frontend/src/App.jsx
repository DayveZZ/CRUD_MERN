import React from "react";
import "./App.css";

const App = () => {
  return (
    <>
      <h1 className="text-center text-xl p-8 uppercase">
        User Management MERN App
      </h1>
      <form>
        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Email" required />

        <select class="rounded-md px-3 py-2 border-none outline-none focus:ring-0">
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
      </form>
    </>
  );
};

export default App;
