export const formatDate = (dateString: string) => {

  if(!dateString) return

  const transformDate = dateString.replace("-", "").replace("-", '').split("T")[0]

  const year = transformDate.substring(0, 4);
  const month = transformDate.substring(4, 6);
  const day = transformDate.substring(6, 8);

  return `${year}-${month}-${day}`;
};