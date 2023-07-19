import React,{useState} from "react";

export function useForm(inputValues={}) {
    const [values, setValues] = useState(inputValues);
  
    const handleChange = (event) => {
      const {value, name} = event.target;
      console.log(value)
      console.log(values)
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }
   