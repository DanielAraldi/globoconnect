export function formatNumbersToShowInProfile(value: number): string {
  const valueAsString = value.toString();
  const amountDigits = valueAsString.length;

  if (amountDigits <= 3) return valueAsString;

  const valueFormatted =
    {
      4: valueAsString[0],
      5: valueAsString.slice(0, 2),
      6: valueAsString.slice(0, 3),
      7: valueAsString[0],
      8: valueAsString.slice(0, 2),
      9: valueAsString.slice(0, 3),
    }[amountDigits] || valueAsString;

  return `${valueFormatted}${amountDigits < 7 ? 'mil' : 'mi'}`;
}
