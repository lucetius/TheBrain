
Template.courseEvents.courseEvent = function () {
    return CourseEvents.find({courseId: Session.get("selectedCourse")}, {sort: {"lastModified.on" : -1}});
}

Template.courseEvents.eventData = function (e) {
    //console.log("this event" + this.type);
    var _event = {};
                       //    console.log("this ", this);
    switch (this.type) {
        case 'created':

            _event = {
                color: "blue",
                icon: "icon-bullhorn",
                message: "TheBrain hopes you will enjoy!",
                event: "created the course!"
            };
            break;
        case 'newLesson':
            _course = Courses.findOne({_id: Session.get("selectedCourse")});
            _lessonIndex = _.indexOf(_.pluck(_course.lessons, '_id'), this.lessonId);
            _lesson = _course.lessons[_lessonIndex];
            _event = {
                color: "blue",
                icon: "icon-bullhorn",
                message: "Lesson description: " + _lesson.shortDescription,
                event: "created the " + _lesson.name + " lesson!"
            }

    }
    _event.date = new moment(this.created.on).fromNow();
//    _event.date = _date.format("MMM Do");
    _user = Meteor.users.findOne(this.created.by);
    if (_user) {
        _event.user = _user.identity.firstName + " " + _user.identity.lastName;
    }
    else {
        _event.user = "deleted user";
    }
    return _event;
}
