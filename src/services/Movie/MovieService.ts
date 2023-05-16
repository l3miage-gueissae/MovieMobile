import axios from "axios"
import { HttpStatus } from "http-status-ts"
import { APItoken, APIurl, APPlanguage, LocationUser, responseSuccess } from "../GlobalVariable"



export const GetAllMovieAffiche = async (idMovie:number) => {
    let dataRes: responseSuccess<any>   
    const res = await axios.get(`${APIurl}/movie/${idMovie}/images?api_key=${APItoken}`)
    res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
    return dataRes;
}


export const GetMovieDetail = async (idMovie:number) => {
    let dataRes: responseSuccess<any>   
    const res = await axios.get(`${APIurl}/movie/${idMovie}?api_key=${APItoken}&language=${APPlanguage}`)
    res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
    return dataRes;
}

export const GetMovieVideos = async (idMovie:number) => {
    let dataRes: responseSuccess<any>   
    const res = await axios.get(`${APIurl}/movie/${idMovie}/videos?api_key=${APItoken}&language=${APPlanguage}`)
    res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data.results} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
    return dataRes;
}

export const GetMovieProvider = async (idMovie:number) => {
    let dataRes: responseSuccess<any>   
    const res = await axios.get(`${APIurl}/movie/${idMovie}/watch/providers?api_key=${APItoken}`)
    res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data.results[LocationUser] || []} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
    return dataRes;
}

export const GetMovieCredit = async (idMovie:number) => {
    let dataRes: responseSuccess<any>   
    const res = await axios.get(`${APIurl}/movie/${idMovie}/credits?api_key=${APItoken}&language=${APPlanguage}`)
    res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data.cast || []} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
    return dataRes;
}


