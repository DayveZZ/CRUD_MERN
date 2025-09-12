import React, { useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  function fetchAllUsers() {
    fetch("http://localhost:8000/api/users")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log(data);
        setUsers(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   toast.success("Successfully toasted!", {
  //     style: {
  //       borderRadius: "10px",
  //       background: "#242424",
  //       color: "#F0F0F0",
  //     },
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          gender,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Error creating user", {
          style: {
            borderRadius: "10px",
            background: "#242424",
            color: "#F0F0F0",
          },
        });
        return;
      }

      toast.success("User created successfully!", {
        style: {
          borderRadius: "10px",
          background: "#242424",
          color: "#F0F0F0",
        },
      });

      // Clear inputs
      setFirstName("");
      setLastName("");
      setEmail("");
      setGender("");

      // Refresh user list
      fetchAllUsers();
    } catch (err) {
      console.error("Post error:", err);
      toast.error("Failed to create user", {
        style: {
          borderRadius: "10px",
          background: "#242424",
          color: "#F0F0F0",
        },
      });
    }
  };

  function handleDelete(id) {
    fetch(`http://localhost:8000/api/users/${id}`, {
      method: "DELETE",
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        fetchAllUsers();
      })
      .catch((err) => console.error("Delete error:", err));
  }

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
          <input
            type="text"
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name (optional)"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          {/* <select className="outline-0 cursor-pointer">
            <option value="Select Gender" className="gender">
              Select Gender
            </option>
            <option value="Male" className="gender">
              Male
            </option>
            <option value="Female" className="gender">
              Female
            </option>
            <option value="Other" className="gender">
              Other
            </option>
          </select> */}

          <button type="submit" className="cursor-pointer hover:text-[#ea2e00]">
            Submit
          </button>
          <Toaster />
        </form>
      </div>

      <div className="p-4 m-4 border rounded">
        <h1 className="mb-4 uppercase text-center text-xl">User Card</h1>
        <div className="grid grid-cols-4 gap-4">
          {users?.map((ele) => {
            return (
              <ul className="userCard" key={ele._id}>
                <li>UID: {ele._id}</li>
                <li>
                  Name: {ele.first_name} {ele.last_name}
                </li>
                <li>Email: {ele.email}</li>
                <li>Gender: {ele.gender}</li>
                <li className="flex justify-evenly">
                  <button
                    onClick={() => {
                      handleDelete(ele._id);
                    }}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
