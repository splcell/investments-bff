/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useAddToCollectionMutation, useGetUserCollectionQuery } from "../../../redux/investmentsApi";
import type { Company } from "../../../types/company";
import { FaBriefcase } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import styles from "./Collection.module.scss";

interface CollectionProps {
  userId: string;
  profile: Company;
}

export const Collection = ({ userId, profile }: CollectionProps) => {
  const { data, isLoading, error } = useGetUserCollectionQuery({ id: userId });
  const [add] = useAddToCollectionMutation()
  const [isCollected, setIsCollected] = useState(false);

  const addToCollection = () => {
    add({symbol: profile.symbol, companyName: profile.companyName, currency: profile.currency}).then(() => {
      setIsCollected(true)
    })
  }

  useEffect(() => {
    if (data && !data?.userCollection?.some((item) => item.symbol === profile.symbol)) {
      setIsCollected(true);
    } else {
      setIsCollected(false);
    }
  }, [data]);

  console.log(isCollected, 'collection')

  return (
    <>
      {!isCollected ? (
        <button onClick={addToCollection}>
          <FaBriefcase />
        </button>
      ) : (
        <button>
          <MdDelete />
        </button>
      )}
    </>
  );
};
