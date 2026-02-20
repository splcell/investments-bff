import type { ReactNode } from 'react'
import styles from './Error.module.scss'

export const Error = ({children}: {children: ReactNode}) => {
  return(
    <div className={styles.errorWrapper}>
      {children}
    </div>
  )
}