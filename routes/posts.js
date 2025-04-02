const express = require('express');
const Posts = require('../models/model');
const router = express.Router();

// Save post
router.post('/post/save', async (req, res) => {
    try {
        let newPost = new Posts(req.body);
        await newPost.save();
        return res.status(200).json({
            success: "Post Saved Successfully"
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


router.get('/posts', async (req, res) => {
    try {
        let posts = await Posts.find({});
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    } catch (err) {
        return res.status(400).json({
            error: err.message
        });
    }
});


//update post
router.put('/post/update/:id', async (req, res) => {
    try {
        const updatedPost = await Posts.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json({
            success: "Post Updated Successfully",
            updatedPost
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});



//delete post
router.delete('/post/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Posts.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json({
            message: "Post Deleted Successfully",
            deletedPost
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


//get a specific post
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        return res.status(200).json({
            success: true,
            post
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


module.exports = router;
