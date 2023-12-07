export const formatDateToMMDDYYYY = (date: Date, format = 'MM/DD/YYYY') => {
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    // Combine the day, month, and year in DD/MM/YYYY format
    // const formattedDate = `${month}/${day}/${year}`;
    const formattedDate = format
        .replace('DD', day)
        .replace('MM', month)
        .replace('YYYY', year.toString());
    return formattedDate;
};
