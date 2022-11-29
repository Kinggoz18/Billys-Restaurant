export function ConnectMongoDB(){
    //Mongoose Connection setup
    const url = "mongodb+srv://chigozie_M:raphael2002@cluster0.1xu9qqp.mongodb.net/Ish_haircut"
    mongoose.Promise = global.Promise;
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{console.log('Connected to MongoDB');})
    .catch((err)=>{if(err){console.log(err);}})
}

export function ConnectMYSQL(){

    var con = mysql.createConnection({
    host: "localhost",
    user: "id19929212_billysrestaurant2022",
    password: "^H8Em9UaDkFUXOE9",
    database: 'id19929212_billysrestaurant',
    });

    con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
}