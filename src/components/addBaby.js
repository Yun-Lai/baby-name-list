import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIndexedDB } from "react-indexed-db";
import { addBaby, setSort } from "../redux/babies/action";
import { toast } from 'react-toastify';
import { babySelector } from '../redux/babies/selector';

import Select from 'react-select';

const options = [
  { value: 'custom', label: 'User' },
  { value: 'alphabet-1', label: 'Alphabet ASC' },
  { value: 'alphabet-2', label: 'Alphabet DESC' },
  { value: 'length-1', label: 'Length ASC' },
  { value: 'length-2', label: 'Length DESC' },
  { value: 'createdAt-1', label: 'Added Time ASC' },
  { value: 'createdAt-2', label: 'Added Time DESC' },
];

const AddBaby = () => {
  const dispatch = useDispatch();
  const [elementName, setElementName] = React.useState("");
  const { add } = useIndexedDB("baby");
  const [orderBy, setOrderBy] = useState({ value: 'custom', label: 'User' });

  const handleOnSubmit = () => {
    if (!elementName || elementName.trim().length === 0) {
      toast("You must Input Name!");
    } else if (elementName.trim().split(' ').length > 2) {
      toast("You can input only 1 space!");
    } else {
      // document.getElementById('baby-add-name').setAttribute('value',"");
      const newBaby = {fullName: elementName.trim(), createdAt: new Date()}
      add(newBaby);
      dispatch(addBaby(newBaby));
      setElementName('');
    };
  }

  const { sort } = useSelector(babySelector)

  useEffect(() => {
    if (sort) {
      setOrderBy(options.find((item) => item.value === sort));
    }
  }, [sort])

  const handleChange = (selectedOption) => {
    setOrderBy(selectedOption);
    dispatch(setSort(selectedOption.value));
  };

  return (
    <div className="add-baby-input">
      <div className="add-baby-name" style={{display: 'flex'}}>
        <input
          type="text"
          id="baby-add-name"
          value={elementName}
          placeholder="New Name"
          onChange={e => setElementName(e.target.value)}
        />
        <button onClick={handleOnSubmit}>
          Add
        </button>
      </div>
      <div style={{display: 'flex'}}>
        <span style={{lineHeight: '37px', marginRight: 5}}>Sort By</span>
        <Select
          value={orderBy}
          onChange={handleChange}
          options={options}
        />
      </div>
    </div>
  );
};

export default AddBaby;