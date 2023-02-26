const mongoose = require('mongoose');

// returns a promise
mongoose.connect('mongodb://localhost:27017')
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.error('Couldnt connect db', err));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    category: {
        type: String,
        required: true,
        enum: ['course', 'node', 'mosh'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length > 0;
            },
            message: 'A course must have atleast one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    published: Boolean,
    price: {
        type: Number,
        required: function(){ return(this.published) },
        min: 10, 
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
    
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'options',
        category: 'Node',
        author: 'hmd',
        tags: [node],
        published: true,
        price: 15
    });

    try{
        const result = await course.save();
        console.log('result:\n', result);
    }catch(ex){
        for (field in ex.errors){
            console.log(ex.errors[field].message)
        }
    }
}

async function getCourses(){
    // eq
    // ne
    // gt
    // gte
    // lt
    // lte
    // in
    // nin 
    const courses = await Course
        // .find({published: true})
        .find({ price: {$lt: 2} })// documents with price greater than 10
        // .find({price: { $in: [10, 15] }})// documents with prices of only 10 and 15
        .limit(10) // limit to 10 documents only
        .sort({ price: 1 }) // sort by key values in given object. 1 ascending and -1 descending order
        .count();
        // .select({name: 1, tags: 1, price: 1}); // selecting which attributes to show
    console.log('courses:\n', courses);
}

async function updateQueryFirst(id){
    const course = await Course.findById(id)
    if(!course) return;
    
    course.set({
        published: false,
        author: "new author",
        price: 20,
        name: 'Query first'
    });
    
    const result = await course.save()
    console.log(course);    
}                                                                                                                                                                                                                                                                                                                                              

async function updateFirst(id){
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: 'mosh',
            published: false,
            name: 'update first'
        }
    });

    console.log(result);
}

async function updateFirst2(id){
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'mosh',
            published: true,
            name: 'find by id and update'
        }
    }, { new: true });

    console.log(course);
}

async function deleteCourse(){
    const result = await Course.deleteMany({ price: null });
    console.log(result);
}
async function deleteCourse(id){
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

createCourse(); 
// getCourses();
// updateQueryFirst('636f701c21898537b2591c48');
// updateFirst('636f72da6352a30bd37539a7');
// updateFirst2('636f72da6352a30bd37539a7');
// deleteCourse();
// deleteCourse('637b49ba79d1b8dda8cd95af');
