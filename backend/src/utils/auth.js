
export function isUserlog(req, res) {
    if(!req.session.get('user')) 
        throw new Error("Utilisateur non connecter")
    return (1);
}