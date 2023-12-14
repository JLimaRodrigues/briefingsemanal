const Briefing = require('../models/BriefingModel');

exports.inicio = async (req, res) => {
    //const briefings = await Briefing.buscaBriefings()

    res.render('index');
};