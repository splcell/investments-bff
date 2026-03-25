export const convertToPercent = (data: string) => {
  if (data) {
    const convertResult = Math.ceil(Number(data) * 100) + "%";
    return convertResult;
  }

  return "-";
};
