const ErrorLogger = require('../models/ErrorLogger');

exports.middlewareGlobal = (req, res, next) => { 
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.usuario = req.session.usuario;
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err){
        ErrorLogger.logError(err);
    }

    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.usuario){
        req.flash('errors', 'Você precisa fazer login');
        req.session.save(() => {
            res.redirect('/');
        })
        return;
    }
    
    next();
};