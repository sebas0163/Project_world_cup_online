import http from "../http-common"

class MatchDataService {
    get(){
        return http.get('/tournament')
    }
}