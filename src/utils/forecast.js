const request=require('postman-request')

const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=3c69126f7ffa05d942195ec41ace6627&query='+lat+','+long+'&units=f'

    request({url,json:true},(error,{body}={})=>{  //destructuring resposne to body
       // const {body}=response
        if(error){
            callback('Unable to connect to weather services!', undefined)

        }else if(body.error){
            callback('Unable to find the location!', undefined)
        }else{
            callback(undefined,               
                body.current.weather_descriptions[0]+`. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidiy is ${body.current.humidity}%`
            )
        }
    })
}

module.exports=forecast
