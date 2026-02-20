/* eslint-disable @typescript-eslint/no-explicit-any */
export const convertData = (data: any) => {
  if(data && data !== undefined && Number(data)>= 0 || Number(data) <= 0){
      const result = Math.round(Number(data) / 1000000).toLocaleString();
      return result;
  } else {
      return '-';
  }
}