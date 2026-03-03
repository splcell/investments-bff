import type { Company } from '../../../../types/company';
import type { Dividend } from '../../../../types/dividends';
import styles from './DividendsTable.module.scss'

interface DividendsTableProps{
  dividends: Dividend[];
  profile: Company;
}

export const DividendsTable = ({ dividends, profile }: DividendsTableProps) => {
  // const reversedDividends = [...dividends].reverse()

  return (
    <table className={styles.dividendsTable}>
      <thead>
        <tr>
          <th>Pay Date</th>
          <th>Record Date</th>
          <th>Ex-Dividend Date</th>
          <th>Cash Amount</th>
        </tr>
      </thead>
      <tbody>{dividends.map(dividend => (
        <tr key={dividend?.id}>
          <td>{dividend?.pay_date}</td>
          <td>{dividend?.record_date}</td>
          <td>{dividend?.ex_dividend_date}</td>
          <td>{dividend?.cash_amount}  {profile?.currency}</td>
        </tr>
      ))}</tbody>
    </table>
  );
};