const getCode = () => {
  // get code from query param
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('code')
}
export default getCode
