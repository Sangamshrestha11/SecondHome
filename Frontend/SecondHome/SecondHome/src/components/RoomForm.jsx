import React, { useState } from "react";
import "../styles/form.css";

function RoomForm() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Gender: "",
    RoomType: "",
    Duration: "",
    Address: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      // ✅ Show success message
      alert(result.message);

      // ✅ Reset form after submit
      setFormData({
        Name: "",
        Email: "",
        Phone: "",
        Gender: "",
        RoomType: "",
        Duration: "",
        Address: ""
      });

    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Second Home - Hostel Room Application</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          required
        />

        <label>Gender</label>
        <select
          name="Gender"
          value={formData.Gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <label>Room Type</label>
        <select
          name="RoomType"
          value={formData.RoomType}
          onChange={handleChange}
        >
          <option value="">Select Room</option>
          <option>Single Room</option>
          <option>Double Sharing</option>
          <option>Triple Sharing</option>
        </select>

        <label>Stay Duration</label>
        <select
          name="Duration"
          value={formData.Duration}
          onChange={handleChange}
        >
          <option value="">Select Duration</option>
          <option>3 Months</option>
          <option>6 Months</option>
          <option>12 Months</option>
        </select>

        <label>Address</label>
        <textarea
          name="Address"
          value={formData.Address}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Apply for Room</button>
      </form>
    </div>
  );
}

export default RoomForm;