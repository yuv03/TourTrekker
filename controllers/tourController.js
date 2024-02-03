const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


exports.getAllTours = (req, res)=>{
    console.log(req.requestTime)

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data : {
            tours
        }
    })
}

exports.getTour = (req, res)=>{

    const id = req.params.id*1; // Here converting the string to number
    // if(id > tours.length){
    const tour = tours.find(el => el.id === id)
    if(!tour){
        return res.status(404).json({
            status: 'fail',
            message : 'invalid id'
        })
    }


    res.status(200).json({
        status: 'success',
        data : {
            tour
        }
    })
}

exports.createTour = (req, res)=>{
    console.log(req.body)

    const newId = tours[tours.length-1].id + 1;

    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours) , err =>{
        res.status(201).json({
            status: 'success',
            data : {
                tour : newTour
            }
        })
    })

}

exports.updateTour = (req,res)=>{
    const id = req.params.id*1; // Here converting the string to number
    if(id > tours.length){
        return res.status(404).json({
            status: 'fail',
            message : 'invalid id'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour here>'
        }
    })
}

exports.deleteTour = (req, res)=>{
    const id = req.params.id*1; // Here converting the string to number
    if(id > tours.length){
        return res.status(404).json({
            status: 'fail',
            message : 'invalid id'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}
