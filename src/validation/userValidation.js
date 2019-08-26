import {check} from 'express-validator';
import {transValidation} from '../../lang/vi';
let updateInfo=[
    check("username",transValidation.update_username).optional().isLength({min:3,max:17}).matches(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/),
    check("gender",transValidation.update_gender).optional().isIn(["male","female"]),
    check("address",transValidation.update_adress).optional().isLength({min:3,max:30}),
    check("phone",transValidation.update_phone).optional().matches(/^(0)[0-9]{9,10}$/)



];
let updatePass=[
    check("newPass",transValidation.update_password).isLength({min:8,max:17}).matches(``),
    check("confirmPass",transValidation.update_password_confirm).custom((value,{req})=>
         value=== req.body.confirmPass
    )
]
module.exports = {updateInfo:updateInfo,updatePass};