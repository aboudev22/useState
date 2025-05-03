import React, { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="w-screen h-screen bg-neutral-900 flex justify-center items-center">
      <form action="" className="flex bg-violet-200 p-5 w-sm flex-col gap-2">
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
          className="outline-1 p-2 focus:outline-2 rounded-2xl outline-amber-100"
        />
        <input
          type="text"
          placeholder="surname"
          name="surname"
          onChange={handleChange}
          className="outline-1 p-2 focus:outline-2 rounded-2xl outline-amber-100"
        />
        <p className="text-xl font-bold">
          Hello {formData.name + " " + formData.surname}
        </p>
        <button
          className="bg-neutral-900 p-2 font-bold w-fit text-white rounded-2xl"
          onClick={(e) => {
            e.stopPropagation();
            setFormData({ name: "", surname: "" });
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}
