export const transValidation={
    email_incorrect:"email có dạng example@phong.com",
    gender_incorrect:"Đừng Nghịch Nữa Anh",
    password_incorrect:"Mật Khẩu Phải Chứa Ít Nhất 8 Ký tự bao gồm Chứ Hoa Số Và Ký tự đặc biệt",
    password_confirm_incorrect:"Nhập Lại Mật Khẩu Chưa Chính Xác"
   
}
export const transErrors={
    account_in_use: "Email Này Đã Được Sử Dụng",
    account_removed:"Tài Khoản Này Đã Bị Xóa",
    account_not_active:"Tài Khoản Chưa Được Kich Hoạt",
    token_undefine:"Token Không Tồn Tại",
    login_failed:"Sai Tài Khoản Hoặc Mật Khẩu",
    server_erro:"Có Lỗi Ở Phía Server"
}
export const transSucces={
    Usercreated:(userEmail)=>{
        return `Tài Khoản <strong>${userEmail} </strong> đã được tạo . Vui Lòng Kiểm Tra Email Của Bạn`
    },
    Account_active:"Kích Hoạt Tải Khoản Thành Công . Bây Giờ Bạn Có Thể Đăng Nhập Vào Ứng Dụng",
    login_succes:(username)=>{
        return `Xin Chào ${username} Chúc Bạn 1 Ngày Tốt Lành`;
    }
}
export const transEmail = {
    subject:"Xác Nhận Kich Hoạt Tài Khoản",
    template: (link)=>{
        return ` 
            <h2> Bạn Nhận Được Email Này Vì Đã Đăng Ký Tài Khoản Chat Của Chúng Tôi</h2>
            <h3>Vui Lòng Click Vào Liên Kết Bên Dưới Để Xác Nhận Tải Khoản</h3>
            <h3><a href="${link}" target="_blank"> ${link}</a></h3>
            `
    },
    send_mail_fail:"Có Lỗi Trong Quá Trình Gửi Email"
}