var exampleModal = document.getElementById("deletePost");
let postId;
let deleteForm = document.forms["delete-post-form"];
let btnDeletePost = document.getElementById("btn-delete-post");

// When Dialog Confirm Clicked
exampleModal.addEventListener("show.bs.modal", function (event) {
  let button = event.relatedTarget;
  postId = button.getAttribute("data-id");
});

// When Delete Post Button Clicked
btnDeletePost.addEventListener("click", function () {
  deleteForm.action = "/blog/" + postId + "?_method=DELETE";
  deleteForm.submit();
});
