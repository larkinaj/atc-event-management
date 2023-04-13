// implement encryption of passwords here 

import bcrypt from 'bcryptjs';

const SALT_FACTOR = 8;  // bcrypt salt factor

const userPass = {

    hashPass: (newPass:string):Promise<string | Error> => {

        return bcrypt.genSalt(SALT_FACTOR)
            .then((salt: string | number):Promise<string> => {return bcrypt.hash(newPass, salt)})
                .then((hashed: string):string => {return hashed;})
                    .catch((err:Error):Error => {return err;});

    },

    comparePass: async (strInput: string, hashedPass:string):Promise<boolean | Error> => {

        return bcrypt.compare(strInput, hashedPass)
            .then((bool: boolean):boolean => {return bool;})
                .catch((err:Error):Error => {return err;});
                
    },

};

export default userPass; 