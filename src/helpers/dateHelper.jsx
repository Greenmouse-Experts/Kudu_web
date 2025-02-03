import { parseISO, format } from 'date-fns';

export const dateFormat = (dateString, formatType) => {
    const parsedDate = parseISO(dateString);
    const formattedDate = format(parsedDate, formatType);

    return formattedDate;
}

export const todayDate = () => {
    // Get today's date
    const today = new Date();

    // Format the date as "MMM dd, yyyy"
    const formattedDate = format(today, "MMM dd, yyyy");

    return formattedDate;
};

export const getDateDifference = (startDate) => {
    const formattedDate = new Date(startDate);
    const formattedEndDate = new Date();

    // Calculate initial differences
    let years = formattedEndDate.getFullYear() - formattedDate.getFullYear();
    let months = formattedEndDate.getMonth() - formattedDate.getMonth();
    let days = formattedEndDate.getDate() - formattedDate.getDate();

    // If days difference is negative, borrow days from the previous month
    if (days < 0) {
        const previousMonth = new Date(formattedEndDate.getFullYear(), formattedEndDate.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }

    // If month difference is negative, adjust years and months
    if (months < 0) {
        months += 12;
        years--;
    }

    // Return only the highest non-zero unit
    if (years > 0) {
        return `${years} ${years === 1 ? "year" : "years"}`;
    } else if (months > 0) {
        return `${months} ${months === 1 ? "month" : "months"}`;
    } else if (days > 0) {
        return `${days} ${days === 1 ? "day" : "days"}`;
    } else {
        return `0 days`;
    }
};
