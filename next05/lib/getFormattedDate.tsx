export default function getFormattedDate(dateString: string): string {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(dateString));
}

/*
Exports a function (getFormattedDate) to format date strings using Intl.DateTimeFormat.
*/