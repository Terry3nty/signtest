const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const {title, date, time } = req.body;

    console.log('Recieved request', req.body);

    if(!title || !date || !time){
        console.log('Missing require fields');
        return res.status(400).json({ error: 'All field are required'});
    }

    try{
        const newEvent = new Event ({
             title,
             date: new Date(date),
             time
            });
        await newEvent.save();
        console.log('Event saved successfully: ', newEvent);
        res.status(201).json(newEvent);
    }catch(err){
        console.error('Error while saving event', err);
        res.status(500).json({ error : 'Failed to create event'});
    }
};

exports.getAllEvents = async (req, res) => {
    try{
        const events = await Event.find().sort({ date: 1, time: 1});
        res.json(events);
    }catch(err){
        res.status(500).json({error: 'Failed to retrieve events'});
    }
};

exports.getEventsByDate = async (req, res) => {
    const {date} = req.params;
    console.log('Incoming date parem', date);

    try {
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 1);

        console.log('Searching for events between:', start, 'and', end);

        const events = await Event.find({
            date: {
                $gte: start,
                $lt: end 
            }
        }).sort({ time: 1 });
        console.log('Found events:', events);
        // const events = await Event.find({date}).sort({time:1});
        res.json(events);
    }catch(err){
        console.error('Error getting events by date:', err)
        res.status(500).json({error : 'Failed to retrieve events for that date '});
    }
};