
function getDateString(fromDate)
{
  var dd = fromDate.getDate();
  var mm = fromDate.getMonth()+1; //January is 0!
  var yyyy = fromDate.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  return  mm + '/' + dd + '/' + yyyy;
}


export getDateString
