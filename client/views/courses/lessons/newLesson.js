Template.newLessonModal.events({
    "click .addLesson2": function(e, template) {
        e.preventDefault();
    },
    "click .addLesson": function (e, template) {
        var _result = false;
        e.preventDefault();
        Meteor.validations.clearErrors();
        $(e.target).attr("disabled", true).html("Adding...");
        if (validateNewLesson()) {
            newLesson = createNewLesson();
            Meteor.call('newLesson', newLesson, function (error, id) {
                console.log("_result before ", _result);
                if (error) {
                    Meteor.popUp.error("TheBrain is confused", "Lesson adding server error: " + error.reason);
                }
                else {
                    Meteor.popUp.success("Lesson added", "TheBrain prepared new neural path you asked for.");
                    console.log("are we hiding it from the else");
                    $("#newLessonModal").modal("hide");

                    _result = true;
                    console.log("_result meanwhile ", _result);
                }
            });
//            console.log("_result after ", _result);
//            if (_result === true) {
//                console.log("Are we hiding it from the result");
//                //$("#newLessonModal").modal("hide");
//            }
        }
        else {
            Meteor.validations.markInvalids();
            Meteor.popUp.error("TheBrain is confused", "Lesson adding error. Make sure you provided all the required information!");
        }
        $(e.target).removeAttr("disabled").html("Add Lesson");
    }
});

validateNewLesson = function() {
    invalids = [];
    Meteor.validations.checkIfEmpty("#newLessonName");
    return !!(invalids.length === 0);
}
createNewLesson = function() {
    var _newLesson = {
        name: $("#newLessonName").val(),
        shortDescription: $("#newLessonShortDescription").val(),
        courseId: Session.get("selectedCourse")
    };
    return _newLesson;
};