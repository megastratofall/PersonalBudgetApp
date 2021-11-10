import React, { useState, useEffect } from "react";
import "../assets/css/BudgetForm.css";

const initialform = {
  amount: "",
  concept: "",
  currentOption: "Income",
};

const BudgetForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialform);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialform);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.concept) {
      alert("Datos incompletos");
      return;
    }

    if (!form._id) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialform);
    setDataToEdit(null);
  };

  return (
    <div>
      <h3>{dataToEdit ? "EDIT" : "ADD TRANSACTION"}</h3>
      <form onSubmit={handleSubmit}>
        <label>AMOUNT</label>
        <br />
        <input
          type="number"
          name="amount"
          placeholder="amount"
          onChange={handleChange}
          value={form.amount}
        />
        <br />
        <br />
        <label>CONCEPT</label>
        <input
          type="text"
          name="concept"
          placeholder="concept"
          onChange={handleChange}
          value={form.concept}
        />
        <label>TYPE</label>
        <select
          name="currentOption"
          onChange={handleChange}
          value={form.currentOption}
        >
          <option defaultValue="Income">Income</option>
          <option>Withdraw</option>
        </select>

        <input type="submit" value="Send" />
        <input type="reset" value="Clean" onClick={handleReset} />
      </form>
    </div>
  );
};

export default BudgetForm;
