let UserAvatar = null;
let userInfo={};
let originAvatarSrc= null;
function updateUserinfo(){
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
        userInfo.username=$(this).val();
    })
    $("#input-change-gender-male").bind("click",function(){
        userInfo.gender=$(this).val();
    })
    $("#input-change-gender-female").bind("change",function(){
        userInfo.gender=$(this).val();
    })
    $("#input-change-adress").bind("change",function(){
        userInfo.adress=$(this).val();
    })
    $("#input-change-phone").bind("change",function(){
        userInfo.phone=$(this).val();
    })
   
}
$(document).ready(()=>{
    updateUserinfo();
    originAvatarSrc = $("#user-modal-avatar").attr("src");
    $("#input-btn-update-user").bind("click",function(){
        if($.isEmptyObject(userInfo) && !UserAvatar){
            alertify.notify("Bạn Phải Thay Đổi Thông Tin Trước Khi Cập Nhật Dữ Liệu","error",7);
            console.log("phong");
            return false;
        }
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
    })
    $("#input-cancel-btn-update-user").bind("click",function(){
        let UserAvatar = null;
        let userInfo={};
        $("#user-model-avatar").attr("src",originAvatarSrc);
        $("#input-change-avatar").val(null);
    })
})