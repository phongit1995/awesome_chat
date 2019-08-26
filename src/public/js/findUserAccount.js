function callFindUser(){
    
    let content = $("#input-find-users-contact").val();
    if(content===""){
        $("#result-find-contact").html("");
    }
    $.get(`/user/searchInfo/${content}`,function(data){
        
       var result =  data.map((user)=>{
            var result = `<li class="_contactList" data-uid="${user._id}">
            <div class="contactPanel">
               <div class="user-avatar">
                  <img src="../../images/users/${user.avatar}" alt="">
               </div>
               <div class="user-name">
                  <p>
                     ${user.username}
                  </p>
               </div>
               <br>
               <div class="user-address">
                  <span>&nbsp ${user.address}</span>
               </div>
               <div class="user-add-new-contact" data-uid="${user._id}">
                  Thêm vào danh sách liên lạc
               </div>
               <div class="user-remove-request-contact action-danger" data-uid="${user._id}">
                  Hủy yêu cầu
               </div>
            </div>
         </li>`
         return result;
        })
        var content = result.join();
   
        $("#result-find-contact").html(content);
        addContact();
        removeContactRequest();

    })
}
function addContact(){
   $(".user-add-new-contact").bind("click",function(){
       let targerId = $(this).data("uid") ;
       $.post("/contact/add-new",{id:targerId},function(data){
          if(data.sucess){
             $("#find-user").find(`div.user-add-new-contact[data-uid = ${targerId}]`).hide();
             $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targerId}]`).css("display","inline-block");
          }
       })
   })
}
function removeContactRequest(){
   $(".user-remove-request-contact").bind("click",function(){
      let targerId = $(this).data("uid") ;
      $.post("/contact/remove-contact",{id:targerId},function(data){
         if(data.sucess){
            $("#find-user").find(`div.user-add-new-contact[data-uid = ${targerId}]`).css("display","inline-block");
            $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targerId}]`).hide();
         }
      })
   })
}
$(document).ready(function(){
    $("#btn-find-users-contact").bind("click",callFindUser);
    $("#input-find-users-contact").bind("keypress" ,callFindUser);
  
})