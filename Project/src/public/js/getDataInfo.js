$(document).ready(function () {
  $(".getDescription").click(function (e) {
    let getID = $(this).attr("id");
        let showdetail = $("#content-2");
        $.ajax({
        type: "GET",
        url: `http://localhost:3000/dn/info/${getID}`,
        dataType: "json",
        data: { action: "fetch" },

      success: function (data) {
        let html = `
            <div id="gioithieu" class="container-fluid container-content-2">
                <ul class="list-group list-group-flush">
                <h3 class="mt-3">Tên Công Ty</h3>
                <li class="list-group-item">${data.tendoanhnghiep}</li>
                <h3 class="mt-3">Mô Tả Công Ty</h3>
                <li class="list-group-item">${data.description_company}</li>
                <h3 class="mt-3">Website Công Ty</h3>
                <li class="list-group-item">${data.website}</li>
                <h3 class="mt-3">Lĩnh Vực</h3>
                <li class="list-group-item">${data.linhvuc}</li>
                <h3 class="mt-3">Địa chỉ</h3>
                <li class="list-group-item">
                <ul>
                  <li>${data.diachi}</li>
                </ul>
                </li>
                <h3 class="mt-3">Liên hệ</h3>
                <li class="list-group-item">
                <ul>
                    <li>Số điện thoại: ${data.sdt}</li>
                    <li>Email: ${data.email}</li>
                </ul>
                </li>
                </ul>
            </div>
		
        `;

        // showdetail.html(html);
        $("#toggle").html(html);
      },
    });
  });
});

$(".getBenefit").click(function (e) {
  let getID = $(this).attr("id");

  let showdetail = $("#content-2");
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/dn/info/${getID}`,
    dataType: "json",
    data: { action: "fetch" },

    success: function (data) {
      let html = `
            <div id="phucloi" class="container-fluid container-content-2" >
                <ul class="list-group list-group-flush">
                <h3 class="mt-3">Phúc lợi</h3>
                 ${data.phucloi}
                </ul>
            </div>
      
      `;
      $("#toggle").html(html);
    },
  });
});
$("#navAdmin").click(function (e) {
  $(this)
    .children()
    .each(function (a, b) {
      $(b).removeClass("active");
    });
  $(e.target).addClass("active");
});
function vieclam() {    

    $("#gioithieu").attr("style", "display: none;");
    $("#phucloi").attr("style", "display: none;");
      let change = $("#content-2").children().first();
      change.attr("style", "display: block;");
    }

    function Gioithieu() {    
        let change = $("#content-2").children().first();
        change.attr("style", "display: none;");
        $("#Phucloi").attr("style", "display: none;");
    }

    function Phucloi() {    
        let change = $("#content-2").children().first();
        $("#gioithieu").attr("style", "display: none;");
        change.attr("style", "display: none;");
    }

