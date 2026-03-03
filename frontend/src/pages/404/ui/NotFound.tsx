import { Chart } from "../../../assets/icons/Chart";
import { Container } from "../../../components/Container";
import styles from './NotFound.module.scss'

export const NotFound = () => {
  return(
    <Container>
      <div className={styles.notFoundWrapper}>
        <h2>This page not Found</h2>
        <Chart />
        <h2>404</h2>
      </div>
    </Container>
  )
}