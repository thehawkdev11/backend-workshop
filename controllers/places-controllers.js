const HttpError = require('../models/http-error');
const Place = require('../models/place');

let DUMMY_PLACES = [{
    id:"p1",
    title:"paris",
    description:"",
    address:"",
    createrId:"u1"
},
{
    id:"p2",
    title:"atlanta",
    description:"",
    address:"",
    createrId:"u2"
},
{
    id:"p3",
    title:"arizona",
    description:"",
    address:"",
    createrId:"u2"
}
];



const getPlaceById = (req,res,next)=>{
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find(p=>{
        return p.id === placeId;
    })

    if(!place){
        throw new HttpError("Couldn't find a place with provided ID",404);
    }
    res.json({place});
}

const getPlacesByUserId = (req,res,next)=>{
    const userId = req.params.uid;

    const place = DUMMY_PLACES.filter(p=>{
        return p.createrId === userId;
    })

    res.json({place});

}

const createPlace = async (req,res,next)=>{
    console.log(req.body);
    const {title,description,address,createrId} = req.body;

    const createdPlace = new Place({
        title,
        description,
        address,
        createrId
    });

    try{
        await createdPlace.save();
    }catch(err){
        const error = new HttpError('creating Place Failed', 500);
        return next(error);
    }
    
    res.status(201).json({place:createdPlace});
    
}

const updatePlace = (req,res,next)=>{

    const {title, description} = req.body; //object destructuring

    const placeId = req.params.pid;

    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);

    updatedPlace.title = title;
    updatedPlace.description=description;

    DUMMY_PLACES[placeIndex]=updatedPlace;

    res.status(200).json({place:updatedPlace});


}

const deletePlace = (req,res,next)=>{

    const placeId = req.params.pid;

    DUMMY_PLACES = DUMMY_PLACES.filter(p=> p.id !== placeId);
    res.status(200).json({message:"Place Deleted"});

};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;