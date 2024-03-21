const cleanDistrictName = (cityName) => {
  const exception = [
    "Ortenaukreis",
    "Ostalbkreis",
    "Rems-Murr-Kreis",
    "Rhein-Neckar-Kreis",
    "Schwarzwald-Baar-Kreis",
    "Zollernalbkreis",
    "Neckar-Odenwald-Kreis",
    "Oberbergischer Kreis",
    "Rheinisch-Bergischer Kreis",
    "Hochsauerlandkreis",
    "Märkischer Kreis",
    "Rhein-Erft-Kreis",
    "Bördekreis",
    "Saalkreis",
  ];

  const regex = new RegExp(`[- ]?Landkreis|[- ]?kreis$|^Kreisfreie`, 'i');

  const isException = exception.includes(cityName);

  if (isException) {
    return cityName;
  }

  return cityName.replace(regex, '').trim();
}

module.exports = {
  cleanDistrictName
}