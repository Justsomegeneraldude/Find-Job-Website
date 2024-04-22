

let tags = [];
function addTag(e) {
  console.log(e);
  //let tag = e.target.value.trim();
  let tag = document.getElementById("tag-ip").value.trim();
  if (tag.length < 1 || tags.includes(tag)) {
    e.target.value = "";
    return;
  }
  let index = tags.push(tag);
  let tagItem = document.createElement("div");
  tagItem.classList.add("item");
  tagItem.innerHTML = `
            <span class="delete-btn" onclick ="deleteTag(this,'${tag}')"><i class="fa fa-times" aria-hidden="true"></i>
            </span>
            <span class="contentTag">${tag}</span>
        `;
  document.querySelector(".tag-list").appendChild(tagItem);
  e.target.value = "";
  let ele = $(".tag-list").children();
  let res = [];
  ele.each(function (a, b) {
    console.log($(b).find(".contentTag"));
    res.push($(b).find(".contentTag").html());
  });
  res = res.join(",");
  $("#skills").val(res);
  console.log($("#skills").val());
}

function deleteTag(ref, tag) {
  let parent = ref.parentNode.parentNode;
  parent.removeChild(ref.parentNode);
  let index = tags.indexOf(tag);
  tags.splice(index);
  let ele = $(".tag-list").children();
  let res = [];
  ele.each(function (a, b) {
    console.log($(b).find(".contentTag"));
    res.push($(b).find(".contentTag").html());
  });
  res = res.join(",");
  $("#skills").val(res);
  console.log($("#skills").val());
}
document.querySelector(".material-icons").addEventListener("click", addTag);

(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Get the forms we want to add validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
