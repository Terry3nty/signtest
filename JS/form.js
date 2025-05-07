document.querySelector('input[type="button"]').addEventListener('click',function (){
    const eventName = document.getElementById('haha').value.trim();
    const eventDate = document.getElementById('no').value;
    const eventTime = document.getElementById('time').value;

    if (!eventName || !eventDate || !eventTime){
        alert('Please fill in all fields. ');
        return;
    }


    //display event info (backend storage coming later)
    console.log("Event:", eventName);
    console.log("Date:", eventDate);
    console.log("Time:", eventTime);

    alert ('Event recorded! (Data not yet saved - Backend integration incoming');
});