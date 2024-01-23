const cleanDistrictName = (cityName) => {
  const exception = [
    'Ortenaukreis',
    'Ostalbkreis',
    'Rems-Murr-Kreis',
    'Rhein-Neckar-Kreis',
    'Schwarzwald-Baar-Kreis',
    'Zollernalbkreis',
    'Neckar-Odenwald-Kreis',
  ];

  const regex = new RegExp(`[- ]?Landkreis|[- ]?kreis$`, 'i');

  const isException = exception.includes(cityName);

  if (isException) {
    return cityName;
  }

  return cityName.replace(regex, '').trim();
}

module.exports = {
  cleanDistrictName
}