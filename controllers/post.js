const web = require('../model/web');

// creatin a web
const createWeb = async (req, res) => {
    console.log(req.user);
    const { userId } = req.user;
    req.body.createdby = userId;
    try {
        const web = await web.create(req.body)
        res.status(201) .json({success: true, message: "created successfully"});
    } catch (error) {
        res.json({ error });
    }
};

// get all access for users
const getWebs = async (req, res) => {
       const { userId } = req.user;
       try {
        const  webs = await webs.find({ createdby : userId})
        res.status(200).json({success: true, webs });
       } catch (error) {
        res.json({ error })
       }
     
}


//get a single info
const getWeb = async (req, res) => {
    const { userId } = req.user;
    const {webId} = req.params; 
    try {
        const web = await web.findOne({createdby: userId, _id: webId })
    } catch (error) {
        res.json({error});
    }
};
// update
const updateWeb = async (req, res) => {
    const { userId } = req.user;
    const { webId } = req.params;
    try {
       const web = await web.findOneAndUpdate(
        {  createdby: userId, _id: webId },
    req.body,
     { new: true, runValidators: true}
       );
       res.status(200).json({ success: true, web});
    } catch (error) {
        res.json({error});
    }
};
// delete a blog
const deleteWeb = async (req, res) => {
    const { userId } = req.user;
    const { webId } = req.params;
    try {
        const web = await web.findOneAndDelete({
        createdby: userId,
        _Id: webId,
        })
        res.status(200).json({success: true, message: 'web page deleted successfully' })
    } catch (error) {
        res.json({error})
    }
};

module.exports = { createWeb,getWeb,getWebs,updateWeb,deleteWeb };  