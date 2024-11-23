//POST
let hiddenPOst = document.getElementById("posts");
posts.innerHTML = "";
// API Axios
const URL = "https://tarmeezacademy.com/api/v1" ;
axios.get(`${URL}/posts`).then((response) => {
  //handle success
  const posts = response.data.data;
  // loop on Posts
  for (post of posts) {
    // varrable in Post Author
    const author = post.author;
    // PostTittle
    let postTitle = "";
    if (post.title != null) {
      postTitle = post.title;
    }
    let content = `
<div class="card shadow my-5">
    <div class="card-header">
        <img class="rounded-circle border border-3" src="${author.profile_image}" alt="" style="height: 40px; width: 40px;">
        <b>${author.username}</b>
    </div>
    <div class="card-body">
            <img class="w-100" src="${post.image}" alt="">
            <h6 style="color: rgb(185, 184, 184);" class="mt-2">${post.created_at} </h6>
            <h5>${postTitle}</h5>
            <p>${post.body}</p>
            <hr>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
            <span>${post.comments_count} Comments
              <span id="Post-tags">
              
              </span>
            </span>
    </div>
</div>
    `;
    document.getElementById("posts").innerHTML += content;
   
    for (tag of post.tags)
    {
      let tagContent = `
         document.getElementById("Post-tags").innerHTML+= <button  class ="btn btn-small rounded" style="background-color:gray; color:white;"-gray>${tag.name}</button>
      `
    }
    
  }
});

// Reguest Login

function loginBtn() {
  const username = document.getElementById("userName-input").value;
  const password = document.getElementById("password-input").value;

const params = {
    "username": username,
    "password": password,
  };

  // Reguest Login
axios.post(`${URL}/login`, params).then((response) => {


    // localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // Hidde Modale
    const modal = document.getElementById("exampleModal");
    const instances = bootstrap.Modal.getInstance(modal);
    instances.hide();
      // alert("You Login successful")
      showAlert()
    setupUI()
  });

}
// For Logout
function logOut () {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  alert("You logout Successful")
  setupUI()
}

function showAlert() {
  var alertPlaceholder = document.getElementById('successAlert')

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}
alert('Nice, you triggered this alert message!', 'success')
setTimeout( ()=>{
  let alertNode = document.getElementById('successAlert')
  let alertHide = bootstrap.Alert.getInstance(alertNode)
  alertHide.close()

},2000)
  }


// setup Login an register 
function setupUI() {
  let token = localStorage.getItem("token")

  let loginDiv = document.getElementById("loginDiv")
  // let registerBtn = document.getElementById("register-btn")
  let logoutDiv = document.getElementById("logoutDiv")


  if (token == null) {
    loginDiv.style.setProperty("display", "flex", "important");
    // registerBtn.style.setProperty("display", "block", "important");
    logoutDiv.style.setProperty("display" ,"none" , "important")
  }else 
  {
    // loginBtn.style.visibility = "hidden";
    loginDiv.style.setProperty("display", "none", "important");
    // registerBtn.style.visibility = "hidden";
    logoutDiv.style.setProperty("display" ,"flex" , "important")
    // logoutBtn.style.visibility = "visible"

}
}
setupUI()


//infinity Scroll

// window.addEventListener("scroll", function() {
//   const endPage = window.
// })