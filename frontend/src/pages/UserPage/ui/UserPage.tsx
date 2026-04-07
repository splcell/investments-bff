/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useOutletContext } from "react-router-dom"
import { Container } from "../../../components/Container"
import { ContentBox } from "../../../components/ContentBox"
import { FullCollection } from "../../../components/FullCollection";

export const UserPage = () => {
  //@ts-ignore
  const { data } = useOutletContext();

  return(
    <Container>
      <ContentBox title="Your Stocks Collection">
       <FullCollection userId={data._id}/>
      </ContentBox>
    </Container>
  )
}