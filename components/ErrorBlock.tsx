export default function ErrorBlock({
  errorMessage
}: {
  errorMessage: string
}) {

  return (
    <div className="error-xl flex flex-row justify-center bg-red-100 p-5">
      {errorMessage}
    </div>
  )
}