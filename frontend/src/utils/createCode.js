// generate random 5 letter code
export const createCode = () => Math.random().toString(36).substring(2, 7).toUpperCase()
