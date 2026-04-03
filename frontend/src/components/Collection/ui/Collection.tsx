/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import {
  useAddToCollectionMutation,
  useDeleteToCollectionMutation,
  useGetUserCollectionQuery,
} from "../../../redux/investmentsApi";
import type { Company } from "../../../types/company";
import { FaBriefcase } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import styles from "./Collection.module.scss";
import { Button } from "../../Button";
import { toast } from "react-toastify";
import { Toast } from "../../Toast";
import { Skeleton } from "../../Skeleton";
import { Preloader } from "../../Preloader";

interface CollectionProps {
  userId: string;
  profile: Company;
}

const successNotify = () => toast.success("Company add to collection");
const deleteNotify = () => toast.warn("Company delete from collection");
const errorNotify = () => toast.error("Something went wrong");

export const Collection = ({ userId, profile }: CollectionProps) => {
  const { data, isLoading, error } = useGetUserCollectionQuery({ id: userId });
  const [add, { error: addError, isLoading: addLoading }] =
    useAddToCollectionMutation();
  const [
    deleteFromUserCollection,
    { error: deleteErrror, isLoading: deleteLoading },
  ] = useDeleteToCollectionMutation();
  const [isCollected, setIsCollected] = useState(
    data &&
      data?.userCollection?.some((item) => item.symbol === profile.symbol),
  );

  const addToCollection = () => {
    add({
      symbol: profile.symbol,
      companyName: profile.companyName,
      currency: profile.currency,
      userId,
    }).then(() => {
      console.log(data, "then collection");
      setIsCollected(true);
      successNotify();
    });
  };

  const deleteFromCollection = () => {
    deleteFromUserCollection({ symbol: profile.symbol, id: userId }).then(
      () => {
        setIsCollected(false);
        deleteNotify();
      },
    );
  };

  useEffect(() => {
    if (
      data &&
      data?.userCollection?.some((item) => item.symbol === profile.symbol)
    ) {
      setIsCollected(true);
    } else {
      setIsCollected(false);
    }
  }, [data, profile.symbol]);

  useEffect(() => {
    if (addError || deleteErrror) {
      errorNotify();
    }
  }, [addError, deleteErrror]);

  if (isLoading) {
    return <Skeleton width={640} height={25} />;
  }

  return (
    <div className={styles.collectionWrapper}>
      {!isCollected ? (
        <Button variant="yellow" onClick={addToCollection} disabled={addLoading}>
          {addLoading ? (
            <Preloader variant="black" />
          ) : (
            <>
              Add to collection
              <FaBriefcase />
            </>
          )}
        </Button>
      ) : (
        <Button
          variant="black"
          className={styles.deleteBtn}
          disabled={deleteLoading}
          onClick={deleteFromCollection}
        >
          {deleteLoading ? (
            <Preloader variant="white" className={styles.collectionPreloader} />
          ) : (
            <>
              Delete from collection <MdDelete />
            </>
          )}
        </Button>
      )}
      <Toast closeTime={3000} position="bottom-right" theme="dark" />
    </div>
  );
};
