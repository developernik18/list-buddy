export default function getErrorMessage(statusCode: number, statusText: string) {
  let errorMessage = '';

  if(statusCode === 0) {
    return errorMessage = 'Request not completed. Check your Internet Connection.'
  }
  return errorMessage;
}