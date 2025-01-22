export class APIREsponse {
    constructor(message = "Success !!" , data , statuscode = 201) {
        this.message = message;
        this.data = data
        this.statuscode = statuscode ;   
    }
}


export const Response = (res , message , data = null , statuscode = 203 )=>{
res
.status(200)
.json(
    new APIREsponse(message , data = null , statuscode = 203 )
)

}