import { NewsList } from "../../../components/News";
import { useGetNewsQuery } from "../../../redux/investmentsApi";

export const HomePage = () => {
  const { data, error, isLoading } = useGetNewsQuery();

  return (
    <NewsList news={data} isLoading={isLoading} error={error}/>
  );
};
