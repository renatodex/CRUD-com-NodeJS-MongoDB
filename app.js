// -------------------------
// Includes and Requires
// -------------------------

var express = require('express');
var app = require('express').createServer();
var mongoose = require('mongoose');
var ejs = require('ejs');

// -------------------------
// Bootstraping application
// -------------------------
app.set('view engine', 'ejs');
app.set("view options", { layout: false });
app.use(express.bodyParser());

// -------------------------
// Configuração de Banco
// -------------------------
mongoose.connect('mongodb://localhost/lab');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
  ref     : ObjectId,
  author    : String,
  title     : String, 
  body      : String
});

var Post = mongoose.model('Post', PostSchema);

// -------------------------
// Application Routes
// -------------------------

// -- Listagem de Posts

app.get('/', function(req,res) {
	existemPosts = false;
	Post.find({}, function (err, rs) {

	  totalPosts = rs.length;
	  if(totalPosts) 
	  	existemPosts = true;

      console.log("Abrindo listagem de posts.");
	  res.render('list.ejs',{existemPosts: existemPosts, posts: rs});
	});
});

// -- Formulario de Criação de Novo Post

app.get('/newpost', function(req,res) {
	console.log("Abrindo formulario de cadastro.");
	res.render('new.ejs');
});

// -- Postback de inserção de Novo Post

app.post('/newpost', function(req,res) {
	post = new Post();
	post.author = req.body.author;
	post.title = req.body.title;
	post.body = req.body.body;
	post.save(function(err) {
		console.log("Novo post cadastrado com sucesso!");
		res.redirect('/');
	});
});

// -- Formulário de edição de posts existentes

app.get('/editpost/:id', function(req, res) {
	Post.find({_id: req.params.id}, function(err, docs) {
		console.log("Abrindo formulario de edicao de post: "+req.params.id);
		res.render('edit.ejs', {posts: docs[0]});	
	});
});

// -- Postback de edição de post existente

app.post('/editpost', function(req, res) {
	Post.find({_id: req.body.objid}, function(err, docs) {
		docs[0].author = req.body.author;
		docs[0].title = req.body.title;
		docs[0].body = req.body.body;
		docs[0].save(function(err) {
			console.log("Documento atualizado com sucesso!");
			res.redirect('/');
		});
	});
});

// -- Action de remoção de post pelo ObjectId

app.get('/deletepost/:id', function(req, res) {
	Post.find({_id: req.params.id}, function(err, docs) {
		docs[0].remove(function() {
			console.log("Documento removido com sucesso!");
			res.redirect('/');
		});
	});
});

// -------------------------
// Dispatching application
// -------------------------

app.listen(3000);
console.log("Server running at 127.0.0.1:3000");

// TRASH CODE
// Abaixo estão alguns testes que fiz com o Mongo para me certificar
// que eu sabia o que estava fazendo rs
// ------

// Exemplo de CREATE
// myPost = new Post();
// myPost.author = 'Renato2';
// myPost.title = 'Teste';
// myPost.body = 'Estou fazendo um teste';
// myPost.save(function(err) {
// 	console.log(err);
// 	console.log("Dados salvos com sucesso.");
// });

// EXEMPLO DE READ E UPDATE
// myRow = BlogPost.find({author: 'Renato'}, function(err, docs) {
// 	firstRow = docs[0];
// 	firstRow.author = 'Renatao';
// 	firstRow.save(function(err) {
// 		console.log("Dados salvos com sucesso!");
// 	});
// });

// EXEMPLO DE DELETE
// myRow = BlogPost.find({author: 'Renato'}, function(err, docs) {
// 	firstRow = docs[0];
// 	firstRow.remove();
// 	firstRow.save(function(err) {
// 		console.log("Linha deletada com sucesso");
// 	})
// });

// EXEMPLO DE READ
// myRow = BlogPost.find({author: 'Renatao'}, function(err, docs) {
// 	console.log(docs);
// });

// EXEMPLO DE COUNT
// BlogPost.count({}, function(err, data) {
// 	console.log(data);
// });


// EXEMPLO DE DELETE MASSIVO
// myRow = BlogPost.find({}, function(err, docs) {
// 	for(i in docs) {
// 		docs[i].remove();
// 		docs[i].save(function(err) {
// 			console.log("Deleting...");
// 		});
// 	}
// });

// EXEMPLO DE DELETE MASSIVO DIRETO
// Post.remove({}, function() {});