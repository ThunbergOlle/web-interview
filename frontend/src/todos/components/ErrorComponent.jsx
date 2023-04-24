export default function ErrorComponent({ errorMessage, statusCode }) {
  return (
    <div className="bg-red-400 p-10">
      <h1>{statusCode}</h1>
      <p>Something went wrong.{errorMessage}</p>
    </div>
  )
}
