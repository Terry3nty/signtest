document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/api/events') // or http://localhost:5000 if you're not using HTTPS
        .then(response => {
            if (!response.ok) throw new Error("Failed to load events");
            return response.json();
        })
        .then(events => {
            const listContainer = document.querySelector('.ord ul');
            listContainer.innerHTML = ''; // Clear static content

            events.forEach(event => {
                const li = document.createElement('li');
                li.style.marginBottom = '1.5rem';
                li.innerHTML = `
                    <strong>Event:</strong> ${event.title}<br>
                    <strong>Date:</strong> ${event.date}<br>
                    <strong>Time:</strong> ${event.time || '12:00'}<br>
                    <button>Add to Calendar</button>
                `;
                listContainer.appendChild(li);
            });

            // Now attach calendar download functionality
            attachCalendarButtons();
        })
        .catch(error => {
            console.error(error);
            alert('Could not load events.');
        });
});

function attachCalendarButtons() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function () {
            const parent = this.parentElement;
            const lines = parent.textContent.split('\n').map(line => line.trim()).filter(line => line);

            const eventName = lines[0].replace('Event:', '').trim();
            const eventDate = lines[1].replace('Date:', '').trim();
            const eventTime = lines.length > 2 ? lines[2].replace('Time:', '').trim() : '12:00';

            const eventStart = new Date(`${eventDate}T${eventTime}`);
            const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000);

            const pad = n => (n < 10 ? '0' + n : n);
            const formatDate = d =>
                `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;

            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${formatDate(eventStart)}
DTEND:${formatDate(eventEnd)}
END:VEVENT
END:VCALENDAR`;

            const blob = new Blob([icsContent], { type: 'text/calendar' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${eventName.replace(/\s+/g, '_')}.ics`;
            link.click();
        });
    });
}
