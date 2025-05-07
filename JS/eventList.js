document.querySelectorAll('button').forEach(button =>{
    button.addEventListener('click', function(){
        const parent = this.parentElement;
        const lines = parent.textContext.split('\n').map(line => line.trim()).filter(line => line);

        const eventName =lines[0].replace('Event:', '').trim();
        const eventDate =lines[1].replace('Date:', '').trim();
        const eventTime =lines.length > 2 ? lines[2].replace('Time:', '').trim(): '12:00'; // default to 12:00 if time is missing

        const eventStart = new Date(`${eventDate}T${eventTime}`);
        const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000);

        const pad = n => (n < 10 ? '0' + n:n);
        const formatDate = d =>
            `${d.getUTCFullYear()}${pad(d.getUTCMonth() +1 )}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

        const icsContent =`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventName}
DISTART:${formatDate(eventStart)}
DTEND:${formatDate(eventEnd)}
END:VEVENT
END:VCALENDAR`

        const blob = new Blob([icsContent], {type: 'text/calendar'});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${eventName.replace(/\s+/g, '_')}.ics`;
        link.click();
    });
});