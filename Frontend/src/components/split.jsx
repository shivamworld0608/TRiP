import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Splitdialog = ({
  isopen,
  onclose,
  names,
  setSplit,
  setword1,
  setword2,
}) => {
  const [headform, setHeadform] = useState("form1");
  const handleClick = () => {
    setHeadform("form1");
    setword1();
  };

  const handleClick1 = () => {
    setHeadform("form2");
    setword2();
  };

  return (
    <dialog open={isopen} className="modal">
      <div className="modal-box dark:bg-slate-800 shadow-md border dark:border-slate-800 rounded-lg shadow-md">
        <button
          type="button"
          className="absolute  top-0 right-0 m-2 text-xl"
          onClick={onclose}
        >
          &times;
        </button>
        <div className="flex flex-col  justify-center items-center">
          <div>
            <button
              type="button"
              className={`px-4 py-2 mx-2 border border-[#1a43bf] rounded ${
                headform === "form1" ? "underline" : ""
              } ${headform === "form1" ? "underline-offset-2" : ""}`}
              onClick={handleClick}
            >
              Equally
            </button>{" "}
            <button
              type="button"
              className={`px-4 py-2 mx-2 border border-[#1a43bf] rounded ${
                headform === "form2" ? "underline" : ""
              } ${headform === "form2" ? "underline-offset-2" : ""}`}
              onClick={handleClick1}
            >
              Unequally
            </button>
          </div>
          <div>
            {headform === "form1" ? (
              <Form1
                names={names}
                setSplit={setSplit}
                isopen={isopen}
                onclose={onclose}
              />
            ) : (
              <Form2
                setSplit={setSplit}
                isopen={isopen}
                onclose={onclose}
                names={names}
              />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Splitdialog;

//forms
function Form2({ names, setSplit, isopen, onclose }) {
  const [checkedNames, setCheckedNames] = useState([]);
  const [amounts, setAmounts] = useState({});

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedNames((prev) =>
      checked ? [...prev, value] : prev.filter((name) => name !== value)
    );
  };
  const { reset } = useForm();

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

    setSplit(result);
    console.log(result);
    // reset();
    var form = document.getElementById("form2");
    form.reset();
    onclose();
  };
  return (
    <>
      <form id="form2">
        {names.map((name, index) => (
          <div key={index} className="flex  justify-between items-center m-2">
            <div className="m-[10px]">
              <input
                type="checkbox"
                id={`${index}`}
                name="names"
                value={name}
                // defaultChecked={"You" === name}
                onChange={handleCheckboxChange}
                className="mr-[10px] mb-[-4px] form-checkbox h-4 w-4 text-blue-600 border-blue-600 rounded focus:ring-blue-500 "
              />
              <label htmlFor={`${index}`}>{name}</label>
            </div>
            <input
              id={`name${index}`}
              type="number"
              placeholder="How much"
              onChange={(event) => handleAmountChange(index, event)}
              className="border border-gray-300 px-4 py-2 mb-4 rounded-md w-[8rem]"
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
    </>
  );
}

// 2nd form
function Form1({ names, setSplit, isopen, onclose }) {
  const { reset } = useForm();
  const [checkedNames, setCheckedNames] = useState([]);
  const [amounts, setAmounts] = useState({});

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCheckedNames((prev) =>
      checked ? [...prev, value] : prev.filter((name) => name !== value)
    );
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const result = checkedNames.map((name) => ({
      username: name,
      amount: 0,
    }));

    setSplit(result);
    console.log(result);
    // reset();
    var form = document.getElementById("form1");
    form.reset();
    onclose();
  };
  return (
    <>
      <form id="form1">
        {names.map((name, index) => (
          <div key={index} className="flex  justify-between items-center m-2">
            <div>
              <input
                type="checkbox"
                id={`${index}`}
                name="names"
                value={name}
                // defaultChecked={true}
                onChange={handleCheckboxChange}
                className=" mr-2 mb-[-4px] form-checkbox h-4 w-4 text-blue-600 border-blue-600 rounded focus:ring-blue-500 "
              />
              <label htmlFor={`${index}`}>{name}</label>
            </div>
          </div>
        ))}
        <input
          type="button"
          onClick={handleSubmit}
          value="Submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </>
  );
}
