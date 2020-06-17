global.userSession = "";

var method = {
    auth: function () {
        const USERS = [['Fabien Lavielle', 'lavielle.fabien@orange.fr', 'fabien'],
            ['Christopher Cluck', 'christopher.cluck@orange.fr', 'christopher'],
            ['Baye Baye Sene', 'baybaysene@gmail.com', 'bayebaye']];

        var userCheck = false;

        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });

        passport.use(new LocalStrategy(
            function(username, password, done) {
                USERS.forEach(
                    user =>{
                        if(username == user[1] && password == user[2]){
                            userCheck = true;
                            userSession = user[0];
                        }
                    }
                )
                if(userCheck){
                    return done(null, username);
                }else{
                    return done(null, false, { message: 'Incorrect username or password.' });
                }
            }
        ));

        app.post('/',
            passport.authenticate('local', { successRedirect: '/tickets',
                failureRedirect: '/' }));
    }
};

module.exports = method;

