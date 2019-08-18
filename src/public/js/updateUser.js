let UserAvatar = null;
let userInfo={};
let originAvatarSrc= null;
originUserInfo= {};
function updateUser(){
    $("#input-change-avatar").bind("change",function (){
        let fileData = $(this).prop("files")[0];
        let math =["image/png","image/jpg","imgae/jpeg"];
        let limit = 1048576 ; // 1 MB
        if( $.inArray(fileData.type,math)==='-1'){
            alertify.notify("Kiểu File Không Hợp Lệ Chỉ Chấp Nhận Jpg & Png","error",7);
            $this.val(null);
            return false;
        }
        if( fileData.size>limit){
            alertify.notify("Ảnh Upload Tối Đa Là 1 MB","error",7);
            $this.val(null);
            return false;
        }
        if(typeof FileReader != 'undefined'){
            let imagePreview = $("#image-edit-profile");

            imagePreview.empty();
            let filereader = new FileReader();
            filereader.onload = function(element){
           
                $("<img>",{
                    "src": element.target.result,
                    "class" : "avatar img-circle",
                    "id": "user-model-avatar",
                    "alt":"avatar"

                }).appendTo(imagePreview);
            }
          
            imagePreview.show();
            filereader.readAsDataURL(fileData);
            let formdata = new FormData();
            formdata.append("avatar",fileData);
            UserAvatar = formdata;
          
        }
        else{
            alertify.notify("Trình Duyệt Của Bạn Không Hỗ Trợ File Reader","error",7);
            $this.val(null);
            return false;
        }
    })
    $("#input-change-username").bind("change",function(){
        
        let username = $(this).val();
        let regexUsername= new RegExp("/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/");
        if(regexUsername.test(username)|| username.length <3 || username.length >17){
            alertify.notify("Người Dùng 3 Tới 17 Ký Tự Và Không Được Phép Chứa Ký Tự Đặc Biệt");
            $(this).val(originUserInfo.username);
            delete userInfo.username;
            return;
        }
        userInfo.username= username;
    })
    $("#input-change-gender-male").bind("click",function(){
        let gender= $(this).val();
        if(gender !=="male"){
            alertify.notify("Dữ Liệu Giới Tính Có Vấn Đề");
            delete userInfo.gender;
            return false;
        }
        userInfo.gender=gender;
    })
    $("#input-change-gender-female").bind("change",function(){
        let gender= $(this).val();
        if(gender !=="female"){
            alertify.notify("Dữ Liệu Giới Tính Có Vấn Đề");
            delete userInfo.gender;
            return false;
        }
        userInfo.gender=gender;
    })
    $("#input-change-adress").bind("change",function(){
        let address= $(this).val();
        if(address.length<3 || address >30){
            alertify.notify("Địa Chỉ Giới Hạn Trong Khoảng 3 tới 30 Ký Tự");
            $(this).val(originUserInfo.address);
            delete userInfo.address;
            return false;
        }
        userInfo.address=address;
    })
    $("#input-change-phone").bind("change",function(){
        let phone = $(this).val();
        let reguxPhone =  new RegExp("/^(0)[0-9]{9,10}$/");
        if(reguxPhone.test(reguxPhone)){
            alertify.notify("Địa Chỉ Giới Hạn Trong Khoảng 3 tới 30 Ký Tự");
            $this.val(originUserInfo.phone);
            delete userInfo.address;
            return false;
        }
        userInfo.phone=phone;
    })
   
}
function UpdateAvatar(){
    $.ajax({
        url:'/user/update-avatar',
        type:"put",
        cache:false,
        contentType:false,
        processData:false,
        data:UserAvatar,
        success:function(result){
           
            $(".user-modal-alert-succes").find("span").text(result.message);
            $(".user-modal-alert-succes").css("display","block");
            $("#navbar-user-avatar").attr("src",result.imageSrc);
            originAvatarSrc= result.imageSrc;
            $("#input-cancel-btn-update-user").click();
        },
        error:function(erro){
            $(".user-modal-alert-error").find("span").text(erro.responseText);
            $(".user-modal-alert-error").css("display","block");
            $("#input-cancel-btn-update-user").click();
        }
    })
}
function UpdateUserInfo(){
    console.log(userInfo);
    $.ajax({
        url:'/user/update-info',
        type:"put",
        data:userInfo,
        success:function(result){
           
            $(".user-modal-alert-succes").find("span").text(result.message);
            $(".user-modal-alert-succes").css("display","block");
            originUserInfo = Object.assign(originUserInfo,userInfo);
            $("#username").text(originUserInfo.username);
            $("#input-cancel-btn-update-user").click();
        },
        error:function(erro){
            console.log(erro);
            $(".user-modal-alert-error").find("span").text(erro.responseText);
            $(".user-modal-alert-error").css("display","block");
            $("#input-cancel-btn-update-user").click();
        }
    })
    
}
$(document).ready(()=>{
    
    originAvatarSrc = $("#user-modal-avatar").attr("src");
    originUserInfo={
        username :  $("#input-change-username").val(),
        gender:$("#input-change-gender-male").is("checked")? $("#input-change-gender-male").val():$("#input-change-gender-female").val(),
        address: $("#input-change-adress").val(),
        phone: $("#input-change-phone").val()

    }
    updateUser();
    
    $("#input-btn-update-user").bind("click",function(){
        
        if($.isEmptyObject(userInfo) && !UserAvatar){
            alertify.notify("Bạn Phải Thay Đổi Thông Tin Trước Khi Cập Nhật Dữ Liệu","error",7);
            return false;
        }
        if(UserAvatar){
            UpdateAvatar();
        }
        
        if(!$.isEmptyObject(userInfo)){
            console.log(userInfo);
            UpdateUserInfo();
        }
       
    })

    $("#input-cancel-btn-update-user").bind("click",function(){
        let UserAvatar = null;
        let userInfo={};
        $("#user-model-avatar").attr("src",originAvatarSrc);
        $("#input-change-avatar").val(null);
        $("#input-change-username").val(originUserInfo.username);
        (originUserInfo.gender ==="male")? $("#input-change-gender-male").click() :$("#input-change-gender-female").click();
        $("#input-change-adress").val(originUserInfo.address);
        $("#input-change-phone").val(originUserInfo.phone);

    })
})