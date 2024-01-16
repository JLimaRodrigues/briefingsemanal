const Briefing = require('../models/BriefingModel');

exports.index = async (req, res) => {
    const briefings = await Briefing.buscaBriefings();

    res.render('index', { briefings });
};

exports.criar = (req, res) => {

    res.render('briefing');
};

exports.registrar = async (req, res) => {
    
    try {
        console.log(req.body);
        const briefingInstance = new Briefing(req.body);
        await briefingInstance.registrar();

        if (briefingInstance.errors.length === 0) {
            // req.flash('success', 'Briefing registrado com sucesso.');
            req.session.save(() => res.redirect(req.get('referer')));
            return;
          } else {
            // Lidar com os erros de validação
            //req.flash('errors', briefingInstance.errors);
            req.session.save(() => res.redirect('/briefing'));
            return;
          }
          
    } catch(e){
        console.log(e);
        res.render('404');
    }
};