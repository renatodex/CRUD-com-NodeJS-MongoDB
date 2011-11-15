# Introduction

This is a small sample to demonstrate how to build a simple CRUD application using MongoDB (mongoose) and NodeJS.

# Templates

For this sample im not using Jade (because i dont like it). Instead of it, im using EJS (Embedded Javascript) for template logic.
Im using express to setup the Route rules, like get/post pages, PREG url and etc.

# Database

The mod "mongoose" was used to instantiate a MongoDB connection at server side.
Theres only one Entity used in this sample called: Post.
For this one, the following definition was chosed:

var PostSchema = new Schema({
  ref     : ObjectId,
  author    : String,
  title     : String, 
  body      : String
});

# Contact

For any doubts, sugestions and improvments, my contact:
MSN: renato_alves_2.0@hotmail.com
Mail/Gtalk: renatodex@gmail.com
