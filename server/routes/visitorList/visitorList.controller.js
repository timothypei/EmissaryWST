/**
 * Created by xxvii27 and DylanMoz(Dylan Mozlowski) on 2/27/15.
 */

'use strict';

//Import Resources and Libs

var Email = require('../../notification/email');
var TextModel = require('../../notification/text');

var VisitorList = require('../../models/VisitorList');
var Employee = require('../../models/Employee');
var Appointment = require('../../models/Appointment');

exports.getCompanyVisitorList = function(req, res){
    var company_id=req.params.id;
    if(!company_id)
        return res.status(400).json({error: "Please send company id."});
    VisitorList.findOne({company_id: company_id}, function(err, result){
        if(err) return res.status(400).json({error: "Getting Visitor List"});
        return res.status(200).json(result);
    });
}

/* delete visitor in the list*/
exports.deleteVisitor = function(req, res){
    var visitorId=req.params.visitor_id;
    var companyId=req.params.company_id;
    if(!companyId)
        return res.status(400).json({error: "Please send company id."});
    if(!visitorId)
        return res.status(400).json({error: "Please send visitorList id."});
    VisitorList.findOneAndUpdate(
        {company_id: companyId},
        {$pull: {visitors:{_id:visitorId}}},
        {safe: true, upsert: true, new:true}, function(err, data){
            if(err) return res.status(400).json({error: err});
            return res.status(200).json(data);
    });
}

/* clear the list */
exports.delete = function(req, res){
    var listId=req.params.id;
    if(!listId)
        return res.status(400).json({error: "Please send list id."});
    VisitorList.findOne({_id: listId}, function(err, list){
        if(err || list==null) return res.status(400).json({error: "Can't find company"});
        list.visitors=[];
        list.save(function(err){
            if(err) return res.status(400).json({error: "Can't save"});
            return res.status(200).json(list);
        });
    });
}
// This route will be called when a visitor checks in
exports.create = function(req, res) {
    //required fields
    var company_id = req.body.company_id;
    var name = req.body.name;
    var phone_number = req.body.phone_number;
    var checkin_time = req.body.checkin_time;

    //optional dic var
    var additional_info = req.body.additional_info;

    // find all the appointments for this visitor
    var query=
        {
            company_id:company_id,
            name: name,
            phone_number:phone_number
        };

    Appointment.find(query, function(err, appointments){
        var visitor =
        {
            company_id: company_id,
            name: name,
            phone_number: phone_number,
            checkin_time: checkin_time,
            additional_info: additional_info,
            appointments: appointments
        };
        VisitorList.findOne(
            {company_id: company_id},
            function(err, list) {
                if(err)
                    res.status(400).json({error: "an error occured while finding"});
                if(list==null) {
                    list = new VisitorList();
                    list.visitors=[];
                    list.company_id = company_id;
                }
                list.visitors.push(visitor);
                list.save(function(err){
                    if(err) res.status(400).json({error: "an error in saving"});
                    res.status(200).json(list);
                    /*Employee.find({company : req.body.company_id},
                        function(err, employees) {
                            var i = 0;
                            var respond = function() {
                                i++;
                                if(i == employees.length) {
                                    res.status(200).json(list);
                                }
                            };

                            Email.sendEmail(req.body.name, employees, function(){respond();});
                            TextModel.sendText(req.body.name, employees, function(){respond();});
                        }
                     );*/
                });
            }
        );
    });

};