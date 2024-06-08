import React, { useState } from "react";

const Transdialog = ({ isopen, onclose, names, setpaid }) => {
  const [checkedNames, setCheckedNames] = useState([]);
  const [amounts, setAmounts] = useState({});

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedNames((prev) =>
      checked ? [...prev, value] : prev.filter((name) => name !== value)
    );
  };

  // Handle amount change
  const handleAmountChange = (index, event) => {
    const { value } = event.target;
    const name = names[index];
    setAmounts((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const result = checkedNames.map((name) => ({
      username: name,
      amount: amounts[name] || "",
    }));

    setpaid(result);
    // reset();
    var form = document.getElementById("form1");
    form.reset();
    onclose();
    onclose();
  };

  return (
    <dialog open={isopen} className="modal">
      <div className="modal-box dark:bg-slate-800 shadow-md border dark:border-slate-800 rounded-lg shadow-md">
        <button
          type="button"
          className="absolute top-0 right-0 m-2 text-xl"
          onClick={onclose}
        >
          &times;
        </button>
        <form id="form1" onSubmit={handleSubmit}>
          {names.map((name, index) => (
            <div key={index} className="flex justify-between items-center m-2">
              <div className=" flex m-[10px]">
                <input
                  type="checkbox"
                  id={`name${index}`}
                  name="names"
                  value={name}
                  // defaultChecked={true}
                  onChange={handleCheckboxChange}
                  className="form-checkbox h-4 w-4 mr-[5px] sm:mr-[20px] text-blue-600 border-blue-600 rounded focus:ring-blue-500  "
                />
                <label htmlFor={`name${index}`}>{name}</label>
              </div>
              <input
                id={`name${index}`}
                type="number"
                placeholder="How much"
                onChange={(event) => handleAmountChange(index, event)}
                className=" border  overflow-hidden border-gray-300 rounded px-2 py-1"
              />
            </div>
          ))}
          <input
            type="button"
            onClick={handleSubmit}
            value="Submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
        </form>
      </div>
    </dialog>
  );
};

export default Transdialog;
