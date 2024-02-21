

const express = require('express');
const Course = require('../models/maymodel'); 

const router = express.Router();

//select course
router.get('/course/description/:firstWord', async (req, res) => {
    try {
        const firstWord = req.params.firstWord;
       
        const regex = new RegExp(`^${firstWord}`, 'i'); 

        const course = await Course.findOne({ description: { $regex: regex } })
            .select('description program tags -_id');
        
        if (!course) {
            return res.status(404).send({ message: "Course not found based on the description's first word" });
        }
        
        const courseDetail = {
            Name: course.description,
            Specialization: course.program,
        };

        res.json(courseDetail);
    } catch (error) {
        res.status(500).send(error);
    }
});

//retrieve backend courses alphabetical
router.get('/courses/tags/back', async (req, res) => {
    try {
     
        const regex = new RegExp(`^Back`, 'i');

        const backendCourses = await Course.find({ tags: { $regex: regex } })
            .sort('description') 
            .select('description program year -_id');

        const coursesOutput = backendCourses.map(course => ({
            Name: `${course.description} - ${course.program} - ${course.year}`
        }));

        res.json(coursesOutput);
    } catch (error) {
        res.status(500).send(error);
    }
});


//all bsis courses
router.get('/bsis/sum', async (req, res) => {
    try {
        // Fetch BSIS courses and sort them by year and then code
        const bsisCourses = await Course.find({ program: 'BSIS' })
            .sort({ year: 1, code: 1 })
            .select('year code description -_id');

        // Format the response to include the program and courses categorized by year
        const formattedResponse = {
            program: 'BSIS',
            courses: bsisCourses.map(course => ({
               
                course: `${course.description} - ${course.year} - ${course.code}`,
                
            }))
        };

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).send(error);
    }
});
//all bsit courses
router.get('/bsit/sum', async (req, res) => {
    try {
       
        const bsitCourses = await Course.find({ program: 'BSIT' })
            .sort({ year: 1, code: 1 })
            .select('year code description -_id');

        
        const formattedResponse = {
            program: 'BSIT',
            courses: bsitCourses.map(course => ({
               
                course: `${course.description} - ${course.year} - ${course.code}`,
                
            }))
        };

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
