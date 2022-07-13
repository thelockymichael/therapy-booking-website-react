const palindrome = (str: string) => str.split('').reverse().join('')

const average = (array: number[]) => {
  const reducer = (sum: number, item: number) => sum + item

  return array.reduce(reducer, 0) / array.length
}

export { palindrome, average }
