module.exports = function(app, passport) {

	// rute dasar
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	// PROFILE
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	// LOGOUT
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// Auth local
		// LOGIN - tampilkan login form
		app.get('/login', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// proses login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect ke halaman profile
			failureRedirect : '/login', // redirect ke halaman signup jika ada error
			failureFlash : true
		}));

		// SIGNUP tampilkan halaman signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// proses signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect ke halaman profile
			failureRedirect : '/signup', // redirect ke halaman signup jika ada error
			failureFlash : true
		}));

		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect ke halaman profile
			failureRedirect : '/connect/local', // redirect ke halaman signup jika ada error
			failureFlash : true
		}));

	// digunakan untuk menghapus user
	app.get('/unlink/local', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

};

// middleware untuk memastikan user sudah login
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/'); //jika belum login, redirect ke home
}
