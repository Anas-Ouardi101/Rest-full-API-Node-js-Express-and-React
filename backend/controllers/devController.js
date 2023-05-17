


// @description GET Dev
// @route GET /api/dev
// @access Privet
const getDev = (req,res)=>{
    res.status(200).json({message:"get dev"});
}


// @description Post Dev
// @route GET /api/dev
// @access Privet
const postDev = (req,res)=>{
    if(!req.body.test){
        res.status(400)
        throw new Error("Please add text field")
    }
    res.status(200).json({message:"post dev"});
    
}


// @description PUT Dev
// @route GET /api/dev/:id
// @access Privet
const putDev = (req,res)=>{
    const id = req.params.id;
    res.status(200).json({message:`update dev ${id} `});
}


// @description DELETE Dev
// @route GET /api/dev/:id
// @access Privet
const deleteDev = (req,res)=>{
    const id = req.params.id;
    res.status(200).json({message:`delete dev ${id} `});
}


module.exports = {
    getDev,
    postDev,
    putDev,
    deleteDev
}