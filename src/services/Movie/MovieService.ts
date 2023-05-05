import axios from "axios"
import { HttpStatus } from "http-status-ts"
import { APItoken, APIurl, APPlanguage, responseSuccess } from "../GlobalVariable"
import { media_type, time_window } from "./model/trending.model"

export const MovieTrend = async (mediaType?: media_type, time_window?: time_window) : Promise<responseSuccess<any>> => {
    let dataRes: responseSuccess<any>
    const media: media_type = mediaType ? mediaType : 'all'
    const time: time_window = time_window ? time_window : 'week'
    const res = await axios.get(`${APIurl}/trending/${media}/${time}?api_key=${APItoken}&language=${APPlanguage}`)
    res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
    return dataRes;
}

