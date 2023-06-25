import axios from "axios"
import { HttpStatus } from "http-status-ts"
import { APItoken, APIurl, APPlanguage, LocationUser, responseSuccess } from "../GlobalVariable"


export class MovieService {

    public static GetAllMovieAffiche = async (idMovie:number) => {
        let dataRes: responseSuccess<any>   
        const res = await axios.get(`${APIurl}/movie/${idMovie}/images?api_key=${APItoken}`)
        res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
        return dataRes;
    }
    
    
    public static GetMovieDetail = async (idMovie:number) => {
        let dataRes: responseSuccess<any>   
        const res = await axios.get(`${APIurl}/movie/${idMovie}?api_key=${APItoken}&language=${APPlanguage}`)
        res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
        return dataRes;
    }
    
    public static GetMovieVideos = async (idMovie:number) => {
        let dataRes: responseSuccess<any>   
        const res = await axios.get(`${APIurl}/movie/${idMovie}/videos?api_key=${APItoken}&language=${APPlanguage}`)
        res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data.results} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
        return dataRes;
    }
    
    public static GetMovieProvider = async (idMovie:number) => {
        let dataRes: responseSuccess<any>   
        const res = await axios.get(`${APIurl}/movie/${idMovie}/watch/providers?api_key=${APItoken}`)
        res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data.results[LocationUser] || []} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
        return dataRes;
    }
    
    public static GetMovieCredit = async (idMovie:number) => {
        let dataRes: responseSuccess<any>   
        const res = await axios.get(`${APIurl}/movie/${idMovie}/credits?api_key=${APItoken}&language=${APPlanguage}`)
        res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data.cast || []} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
        return dataRes;
    }
    
    public static GetMovieRecommendations = async (idMovie:number) => {
        let dataRes: responseSuccess<any>   
        const res = await axios.get(`${APIurl}/movie/${idMovie}/recommendations?api_key=${APItoken}&language=${APPlanguage}`)
        res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data || []} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
        return dataRes;
    }
    
    public static GetMovieSimilar = async (idMovie:number) => {
        let dataRes: responseSuccess<any>   
        const res = await axios.get(`${APIurl}/movie/${idMovie}/similar?api_key=${APItoken}&language=${APPlanguage}`)    
        res.status === HttpStatus.OK ?  dataRes = {success:true,data:res.data || []} :  dataRes = {success:false,codeError: res.status , error: res.statusText} 
        return dataRes;
    }
}
