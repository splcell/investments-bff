import { toast, ToastContainer } from "react-toastify";
import {
  useDeleteToCollectionMutation,
  useGetFullUserCollectionQuery,
} from "../../../redux/investmentsApi";
import type { FullCollect } from "../../../types/collect";
import styles from "./FullCollection.module.scss";
import { MdDelete } from "react-icons/md";
import { Toast } from "../../Toast";
import { useNavigate } from "react-router-dom";

const deleteNotify = () => toast.warn("Company delete from collection");

export const FullCollection = ({ userId }: { userId: string }) => {
  const { data, isLoading, error } = useGetFullUserCollectionQuery({
    id: userId,
  });

  const navigate = useNavigate();

  const [
    deleteFromUserCollection,
    { isLoading: deleteLoading, error: deleteEror },
  ] = useDeleteToCollectionMutation();

  const deleteFromCollection = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, symbol: string) => {
    e.stopPropagation()
    deleteFromUserCollection({ symbol, id: userId }).then(() => {
      deleteNotify();
    });
  };

  return (
    <>
      <table className={styles.collectionTable}>
        <tbody>
          {data?.map((item: FullCollect) => (
            <tr
              key={item.symbol}
              className={styles.colllectItem}
              onClick={() => navigate(`/company/${item.symbol}`)}
            >
              <td>
                <img src={item.companyLogo} alt={item.companyName} />
              </td>
              <td>{item.symbol}</td>
              <td>
                {item.companyName?.length <= 10 ? (
                  item.companyName
                ) : (
                  <abbr title={item.companyName}>
                    {item.companyName.slice(0, 10) + "..."}
                  </abbr>
                )}
              </td>
              <td>{item.price + " " + item.currency}</td>
              <td>{item.change}</td>
              <td>{Number(item.changePercentage).toFixed(2) + "%"}</td>
              <td>
                <button onClick={(e) => deleteFromCollection(e,item.symbol)}>
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toast closeTime={3000} position="bottom-right" />
    </>
  );
};
