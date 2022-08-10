const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongoDB...'))
    .catch((err) => console.log('could not connet mongoDB..', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
async function CreateCourse() {

    const course = new Course({
        name: 'Angular Course',
        author: 'Nayan Raval',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

// CreateCourse();

async function getCourse() {
    const courses = await Course
        .find({author: 'Nayan Raval'})
        //.find({ price: { $gte: 10, $lte: 20 } })
        //.find({ price: { $in:[10,15,20] } })
        //logical operator.
        //.find()
        //.or([{author: 'Nayan Raval'}, {isPublished:  true}])
       // .find({author: /^Nayan/})
        .limit(10)
        .sort({ name: 1 })
        .count()+
       // .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourse();
