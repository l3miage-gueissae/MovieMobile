
import axios from "axios"
import { HttpStatus } from "http-status-ts"
import { APItoken, APIurl, APPlanguage, responseSuccess } from "../GlobalVariable"
import { media_type } from "../Movie/model/trending.model"
import { genre } from "./model/genre.model"




export const getAllGenre = async (mediaType?: media_type) : Promise<responseSuccess<genre[]>> => {
    let dataRes: responseSuccess<genre[]>
    const media: media_type = mediaType ? mediaType : 'movie'
    const res = await axios.get(`${APIurl}/genre/${media}/list?api_key=${APItoken}&language=${APPlanguage}`)
    res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data.genres} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
    return dataRes;
}