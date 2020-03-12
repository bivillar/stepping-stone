export const sayHello = async () => {
  const response = await fetch('/api/mensagem')
  const body = await response.json()
  if (response.status !== 200) throw Error(body.message)

  return body
}
