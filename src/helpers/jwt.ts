import jwt from 'jsonwebtoken'

export const generarJWT = (uid:string, name:string) => {

    return new Promise((resolve, reject) => {
        const payload = { uid, name }
        const secret = process.env.SECRET_JWT_SEED;

        if (!secret) {
            return reject(new Error('Error en la clave secreta'));
        }

        jwt.sign(payload, secret, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                reject(err);
                console.log('No se pudo generar el token');
            }

            resolve(token);
        })
    })

}
