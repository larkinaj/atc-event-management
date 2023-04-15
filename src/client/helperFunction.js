const dateConverter = (date) => {
  const year = date.slice(11, 15)
  let month = date.slice(4, 7);
  const day = date.slice(8, 10)
  const months = {
    Jan: '01', 
    Feb: '02', 
    Mar: '03', 
    Apr: '04', 
    May: '05', 
    Jun: '06', 
    Jul: '07', 
    Aug: '08', 
    Sep: '09', 
    Oct: '10', 
    Nov: '11', 
    Dec: '12'
  }
  month = months[month]
  const newDate = year + '-' + month + '-' + day
  return newDate
}

const dateConverter2 = (date) => {
  const year = date.slice(11, 15)
  let month = date.slice(4, 7);
  const day = date.slice(8, 10)
  const months = {
    Jan: '01', 
    Feb: '02', 
    Mar: '03', 
    Apr: '04', 
    May: '05', 
    Jun: '06', 
    Jul: '07', 
    Aug: '08', 
    Sep: '09', 
    Oct: '10', 
    Nov: '11', 
    Dec: '12'
  }
  month = months[month]
  const newDate = year + '-' + month + '-' + day
  return newDate
}

export default dateConverter;