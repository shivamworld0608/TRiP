import React, { useState } from 'react';

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
      username:name,
      amount: amounts[name] || ''
    }));

    setpaid(result);
     // reset();
     var form = document.getElementById("form1");
     form.reset();
     onclose();
    onclose();
  };




  return (
    <dialog open={isopen} className="fixed inset-0 z-10 w-[100vw] h-[100vh] bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg md:w-[30vw] w-[90vw] m-auto p-[2rem] mt-48 rounded-lg">
        <button className="absolute top-0 right-0 m-4 text-xl" onClick={onclose}>&times;</button>
        <form id="form1" onSubmit={handleSubmit}>
          {names.map((name, index) => (
            <div key={index} className="flex justify-between items-center m-2">
              <div>
                <input
                  type="checkbox"
                  id={`name${index}`}
                  name="names"
                  value={name}
                  // defaultChecked={true}
                  onChange={handleCheckboxChange}
                  className=" mr-2  form-checkbox h-4 w-4 text-blue-600 border-blue-600 rounded focus:ring-blue-500 "
                />
                <label htmlFor={`name${index}`}>{name}</label>
              </div>
              <input
                id={`name${index}`}
                type="number"
                placeholder="Amount"
                onChange={(event) => handleAmountChange(index, event)}
                className="ml-2 border border-gray-300 rounded px-2 py-1"
              />
            </div>
          ))}
          <input type="button" onClick={handleSubmit} value="Submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </form>
      </div>
    </dialog>
  );
};

export default Transdialog;
