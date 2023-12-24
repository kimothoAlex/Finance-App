import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enqueueSnackbar } from "notistack";
import { useSelector } from "react-redux";
const Incomes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const { date } = formData;
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/income/add-income", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        enqueueSnackbar("An Error occured", { variant: "error" });
      }
      enqueueSnackbar(data, { variant: "success" });
      setError(null);
    } catch (error) {
      setError(error.message);
      enqueueSnackbar("An Error occured", { variant: "error" });
    }
  };
  return (
    <div className="p-5 shadow-lg bg-slate-100 max-w-lg mx-auto rounded-lg border mt-6">
      <h1 className="text-4xl font-semibold text-center py-7">Add Income</h1>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-7  flex-1">
        <input
          type="text"
          className="p-3 border rounded-lg"
          id="title"
          required
          maxLength={50}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="number"
          required
          className="p-3 border rounded-lg"
          id="amount"
          maxLength={20}
          placeholder="Amount"
          onChange={handleChange}
        />
        <DatePicker
          className="p-3 border rounded-lg"
          required
          selected={date}
          id="date"
          placeholderText="Enter a date"
          dateFormat="dd/MM/yyyy"
          onChange={(date) => {
            setFormData({
              ...formData,
              date: date,
            });
          }}
        />
        <select
          className="p-3 border rounded-lg"
          name="category"
          id="category"
          required
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investiments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">Youtube</option>
          <option value="other">Other</option>
        </select>

        <textarea
          onChange={handleChange}
          required
          className="p-3 border rounded-lg"
          name="description"
          id="description"
          cols="30"
          rows="4"
          placeholder="Add a Reference"
        ></textarea>
        <button className="bg-blue-600 p-3 rounded-lg text-white">
          Add Income
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default Incomes;
