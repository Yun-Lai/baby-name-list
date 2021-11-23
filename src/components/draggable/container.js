import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db";
import { useDispatch, useSelector } from "react-redux";
import Card from "./card";
import update from "immutability-helper";
import { clearBabies, setBabies } from "../../redux/babies/action";
import { babySelector } from '../../redux/babies/selector';

const style = {
  width: 534,
};

const Container = () => {
  const [localBabies, setLocalBabies] = useState([]);
  const { getAll } = useIndexedDB("baby");
  const dispatch = useDispatch();
  const [canDrag, setEnableDrag] = useState(true)
  const { babies, sort } = useSelector(babySelector)

  useEffect(() => {
    dispatch(clearBabies());
  }, [dispatch]);

  useEffect(() => {
    setLocalBabies(babies)
  }, [babies]);

  useEffect(() => {
    if (!localBabies.length)
      if (sort === "alphabet-1") {
        setLocalBabies(
          babies.sort((a, b) => (a.fullName < b.fullName ? -1 : 1))
        );
      } else if (sort === "alphabet-2") {
        setLocalBabies(
          babies.sort((a, b) => (a.fullName > b.fullName ? -1 : 1))
        );
      }
      else if (sort === "length-2") {
        setLocalBabies(
          babies.sort((a, b) => (a.fullName.length > b.fullName.length ? -1 : 1))
        );
      }
      else if (sort === "length-1") {
        setLocalBabies(
            babies.sort((a, b) => (a.fullName.length < b.fullName.length ? -1 : 1))
        );
      }
      else if (sort === "createdAt-1") {
        setLocalBabies(
          babies.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
        );
      }
      else if (sort === "createdAt-2") {
        setLocalBabies(
          babies.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        );
      }
  }, [sort, babies, localBabies]);

  useEffect(() => {
    if (sort && sort === "custom") {
      setEnableDrag(true);
    } else {
      setEnableDrag(false);
      setLocalBabies([]);
    }
  }, [sort]);

  useEffect(() => {
    getAll().then((res) => {
      if (!babies || !babies.length) {
        dispatch(setBabies(res));
      }
    });
  }, [babies, dispatch, getAll]);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = localBabies[dragIndex];
    setLocalBabies(
      update(localBabies, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      })
    );
  };
  return (
    <div style={style}>
      {localBabies.map((baby, i) => (
        <Card key={baby.id} index={i} card={baby} moveCard={moveCard} forbidDrag={canDrag} />
      ))}
    </div>
  );
};

export default Container
