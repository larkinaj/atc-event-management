const dateConverter = (date) => {
  date = 'Sat Sep 9 2023 16:00'
  // date = date.slice()
  const month = date.slice(5, 10 - 3);
  const day = date.slice(8)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const newDate = months[Number(month) - 1] + ' ' + day
  return newDate
}