import { jwtDecode } from "jwt-decode"

export function JWTTOken(){
    const AccessToken = sessionStorage.getItem('AccessToken')
    const decoded = jwtDecode(AccessToken)
    return decoded
}