class error{
    error404(req, res){
        res.render('404',{layout: 'Error'});
    }
    error500(req, res){
        res.render('500',{layout: 'Error'});
    }
}

module.exports =  new error;
