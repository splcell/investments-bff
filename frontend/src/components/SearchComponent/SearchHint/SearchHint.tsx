import { useNavigate } from 'react-router-dom'
import type { SearchInfo } from '../../../types/search'
import styles from './SearchHint.module.scss'

export const SearchHint = ({results}: {results: SearchInfo[]}) => {
  const navigate = useNavigate()

  return(
    <div className={styles.hintWrapper}>
      <ul className={styles.hintList}>
        <li className={styles.fixedList}>
          <span>Ticker</span>
          <span>Name</span>
          <span>Exchange</span>
          <span>Currency</span>
        </li>
        {results.slice(0, 10).map(res => (
          <li key={res.ticker} onClick={() => navigate(`/company/${res.ticker}`)}>
            <span>{res.ticker}</span>
            <span>{res.name}</span>
            <span>{res.primary_exchange}</span>
            <span>{res.currency_name.toUpperCase()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}