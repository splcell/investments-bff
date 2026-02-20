/* eslint-disable @typescript-eslint/no-explicit-any */
export const createError = (error: any) => {
  if(error && 'data' in error){
    return (error.data as { message?: string })?.message
  }
    
  return null
}