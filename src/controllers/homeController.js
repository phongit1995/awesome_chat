let home = (req,res)=>{
    var obj={
        errors:req.flash("errors"),
        success:req.flash("success")
}
    res.render("main/home/home",obj);
}
module.exports = home;