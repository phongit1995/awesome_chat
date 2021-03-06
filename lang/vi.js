export const transValidation={
    email_incorrect:"email có dạng example@phong.com",
    gender_incorrect:"Đừng Nghịch Nữa Anh",
    password_incorrect:"Mật Khẩu Phải Chứa Ít Nhất 8 Ký tự bao gồm Chứ Hoa Số Và Ký tự đặc biệt",
    password_confirm_incorrect:"Nhập Lại Mật Khẩu Chưa Chính Xác",
    update_username:"Người Dùng 3 Tới 17 Ký Tự Và Không Được Phép Chứa Ký Tự Đặc Biệt",
    update_gender:"Dữ Liệu Giới Tính Có Vấn Đề",
    update_adress:"Địa Chỉ Giới Hạn Trong Khoảng 3 tới 30 Ký Tự",
    update_phone:"Số Điện Thoại Sai",
    update_password:"Mật Khẩu Mới Phải Từ 8 Tới 17 Ký Tự",
    update_password_confirm:"2 Mật Khẩu Chưa Giống Nhau"
   
}
export const transErrors={
    account_in_use: "Email Này Đã Được Sử Dụng",
    account_removed:"Tài Khoản Này Đã Bị Xóa",
    account_not_active:"Tài Khoản Chưa Được Kich Hoạt",
    token_undefine:"Token Không Tồn Tại",
    login_failed:"Sai Tài Khoản Hoặc Mật Khẩu",
    server_erro:"Có Lỗi Ở Phía Server",
    avatar_type:"Kiểu File Không Hợp Lệ Chỉ Chấp Nhận Jpg & Png",
    avatar_size:"Ảnh Upload Tối Đa Là 1 MB",
    account_undefined:"Tải Khoản Này Không Tồn Tại",
    account_password_fail:"Mật Khẩu Bạn Nhập Chưa Đúng"
}
export const transSucces={
    Usercreated:(userEmail)=>{
        return `Tài Khoản <strong>${userEmail} </strong> đã được tạo . Vui Lòng Kiểm Tra Email Của Bạn`
    },
    Account_active:"Kích Hoạt Tải Khoản Thành Công . Bây Giờ Bạn Có Thể Đăng Nhập Vào Ứng Dụng",
    Avatar_updated:"Cập Nhật Thông Tin Thành Công",
    login_succes:(username)=>{
        return `Xin Chào ${username} Chúc Bạn 1 Ngày Tốt Lành`;
    },
    change_pass_sucess:"Cập Nhật Mật Khẩu Thành Công"
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