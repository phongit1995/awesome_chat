export const transValidation={
    email_incorrect:"email có dạng example@phong.com",
    gender_incorrect:"Đừng Nghịch Nữa Anh",
    password_incorrect:"Mật Khẩu Phải Chứa Ít Nhất 8 Ký tự bao gồm Chứ Hoa Số Và Ký tự đặc biệt",
    password_confirm_incorrect:"Nhập Lại Mật Khẩu Chưa Chính Xác"
   
}
export const transErrors={
    account_in_use: "Email Này Đã Được Sử Dụng",
    account_removed:"Tài Khoản Này Đã Bị Xóa",
    account_not_active:"Tài Khoản Chưa Được Kich Hoạt"
}
export const transSucces={
    Usercreated:(userEmail)=>{
        return `Tài Khoản <strong>${userEmail} </strong> đã được tạo . Vui Lòng Kiểm Tra Email Của Bạn`
    }
}