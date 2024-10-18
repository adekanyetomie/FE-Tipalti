export const dateFormatter = (unformattedDate: string): string => {
  const dateObject = new Date(unformattedDate);
  const formattedDate = dateObject.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  });

  const [date, time] = formattedDate.split(", ");
  // Rearranging into the desired format
  return `${time} - ${date}`;
};
