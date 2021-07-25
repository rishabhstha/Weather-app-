const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast') 

const app=express()

//Define paths for Express configuration
const publicDirectoryPath=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rishabh Shrestha'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rishabh Shrestha'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpful message",
        title:'Help',
        name:'Rishabh Shrestha'

    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:"You must provide an address!"
        })
    }
    
    address=req.query.address
    geocode(address,(error, {latitude, longitude, location}={})=>{  //destructuring data returned to latitude, longitude, location
        
        if(error){
            return res.send({
               error
            })
        }
      
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast:forecastData,
                address
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if (!req.query.search) {
            return res.send({
                error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('error',{
        title:"Error 404",
        errorText:"Help article not found",
        name:"Rishabh Shrestha"
    })
    
})

app.get('*',(req, res)=>{
    res.render('error',{
        title:"Error 404",
        errorText:"Page not found",
        name:"Rishabh Shrestha"
    })
})




//app.get('/help',(req, res)=>{
//     res.send([{
//         name:'Rishabh',
//         age:22
//     },{
//         name:'Andrea',
//         age:20
//     }])
// })



// app.get('/about', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../public/about.html'))
// })
 


//app.com
app.listen(3000,()=>{
    console.log("Server is up on port 3000.")
})