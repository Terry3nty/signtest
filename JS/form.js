document.querySelector('form').addEventListener('submit',function (e){
    const eventName = document.getElementById('haha').value.trim();
    const eventDate = document.getElementById('no').value;
    const eventTime = document.getElementById('clock').value;

    if (!eventName || !eventDate || !eventTime){
        alert('Please fill in all fields. ');
        return;
    }


    const eventData = {
        name: eventName,
        date: eventDate,
        time: eventTime
    };

    fetch('https://localhost:3000/events',{
        method: 'POST',
        headers:{ 'Content-Type': 'application/json'},
        body:JSON.stringify(eventData)
    })
    .then(response => {
        if (!response.ok) throw new Error("failed to save event");
        return response.json();
    })
    .then(data =>{
        alert("Event saved successfully!");
        console.log(data);
    })
    .catch(err => {
        console.error(err);
        alert("Error saving event.")
    })
    // alert ('Event recorded! (Data not yet saved - Backend integration incoming');
});