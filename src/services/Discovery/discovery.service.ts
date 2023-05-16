import axios from "axios"
import { HttpStatus } from "http-status-ts"
import { APItoken, APIurl, APPlanguage, responseSuccess } from "../GlobalVariable"
import { media_type,time_window } from "../Movie/model/trending.model"
import type { paramDiscovery } from "./model/discovery.model"

// : Promise<responseSuccess<any>>
export const ShowDiscovery = async (media: media_type, discovery: paramDiscovery, page: number) => {
    let dataRes: responseSuccess<any>
    let queryParam: string = ''

    Object.entries(discovery).forEach(([key,val]) => { queryParam+= optionnalDiscoveryParam(key,val)}); 
    console.log(`${APIurl}/discover/${media}?api_key=${APItoken}&language=${APPlanguage}&page=${page}${queryParam}`);
    
    const res = await axios.get(`${APIurl}/discover/${media}?api_key=${APItoken}&language=${APPlanguage}&page=${page}${queryParam}`)
    res.status === HttpStatus.OK ? dataRes = { success: true, data: res.data.results } : dataRes = { success: false, codeError: res.status, error: res.statusText }
    return dataRes;
}


export const optionnalDiscoveryParam = (att: string, data: any): string => {
    switch (att) {
        case 'genres': return  data.length > 0 ?`&with_genres=${data.toString()}` : ''
        case 'sort_by': return  `&sort_by=${data}` 
        case 'include_adult': return  `&include_adult=${data}` 
        case 'include_video': return `&include_video=${data}` 
        case 'with_watch_monetization_types': return  `&with_watch_monetization_types=${data}`
        default: return ''
    }
}



export const MovieTrend = async (mediaType?: media_type, time_window?: time_window) : Promise<responseSuccess<any>> => {
    let dataRes: responseSuccess<any>
    const media: media_type = mediaType ? mediaType : 'all'
    const time: time_window = time_window ? time_window : 'week'
    const res = await axios.get(`${APIurl}/trending/${media}/${time}?api_key=${APItoken}&language=${APPlanguage}`)
    res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
    return dataRes;
}
