const model = require('../models/feedback')
/*********************
 * Private functions *
 *********************/

// Add data to database
const addItem = async(req, model) => {
  try {
    // Create a new document
    const feedback = await model.create(req);
    //console.log('Feedback created:', feedback);
    return feedback;
} catch (error) {
    console.error('Error creating feedback:', error);
}
}

// Get all data from database

const getFeedbackItems =  async model => {
  try {
    // Create a new document
    const feedback = await model.find().sort({_id: -1})
    //console.log(feedback);
    //console.log('Feedback created:', feedback);
    return feedback;
} catch (error) {
    console.error('Error creating feedback:', error);
}
}

/********************
 * Public functions *
 ********************/



/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    res.status(200).json(await getFeedbackItems(model))
  } catch (error) {
    //utils.handleError(res, error)
  }
}



/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */

exports.createItem = async (req, res) => {
  try {
    const response = await addItem(req.body,model);
    res.status(200).json(response)
  } catch (error) {
    //console.log(error)
  }
}


