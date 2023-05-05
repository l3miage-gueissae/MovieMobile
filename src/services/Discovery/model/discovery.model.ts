import { media_type } from "../../Movie/model/trending.model"

export type paramDiscovery  = {
    genres? : number[]
    sort_by? : sort_by
    include_adult : boolean
    include_video : boolean
    with_watch_monetization_types ? : with_watch_monetization_types
}


export type sort_by = "popularity.asc" | "popularity.desc" | "release_date.asc" | "release_date.desc" | "revenue.asc" | "revenue.desc" | "primary_release_date.asc" | "primary_release_date.desc" | "original_title.asc" | "original_title.desc" | "vote_average.asc" | "vote_average.desc" | "vote_count.asc" | "vote_count.desc"
export type with_watch_monetization_types = "flatrate" | "free" | "ads" |  "rent" | "buy"

