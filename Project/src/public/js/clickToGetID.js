$(document).ready(function () {
  $(".getWorkID").click(function (e) {
    let getID = $(this).attr("id");
    let showdetail = $("#col-centent2-right-scroll");
    $.ajax({
      type: "GET",
      url: `http://localhost:3000/work/detail/${getID}`,
      dataType: "json",
      data: { action: "fetch" },

      success: function (data) {
		const dataDescription = data.description;
		const dataBenefit = data.benefit;
		const dataJobrequirement = data.job_requirement;

		const liDescription = renderLi(dataDescription);
		const liBenefit = renderLi(dataBenefit);
		const liJobrequirement = renderLi(dataJobrequirement);

        let html = `

				<div class="row">
					<div class="col-sm-12 col-content2-right-above">
						<div class="card-mota">
							<div class="body">
								<div class="row">
									<div class="col-sm-12">
										<h5 class="card-title format-text-bold work">${data.name_job}</h5>
										<h6 class="card-subtitle mb-2 work">${data.tendoanhnghiep}</h6>
									</div>

									<div class="col-sm-12 col-money">
										<span><i class="fa fa-eur" aria-hidden="true"></i></span>
										<p class="card-text p-money work">${data.salary} VND/Tháng</p>
									</div>
									<div class="col-md-12 col-lg-7 col-diadiem">
										<span><i class="fa fa-map-marker" aria-hidden="true"></i><span>
										<p class="card-text p-diadiem work">${data.diachi}</p>
									</div>
									<div class="col-md-12 col-lg-5 col-ungtuyenngay">
									<a class="btn btn-dark btn-outline-light btn-ungtuyenngay applyfor" tabindex="-1" role="button"  href="/tv/ungtuyen/${data._id}"> Ứng tuyển ngay</a>
										<a href="/tv/like/${data._id}" class="btn-luuyeu-thich" id="btn-luuyeuthich" aria-haspopup="true" aria-expanded="false">
											<span>
												<svg class="img-ungtuyenngay" width="50" height="40" role="img" aria-label="biểu tượng-lưu" focusable="false" viewBox="0 0 18 18">
													<g>
														<path d="M12.38,2.25A4.49,4.49,0,0,0,9,3.82,4.49,4.49,0,0,0,5.63,2.25,4.08,4.08,0,0,0,1.5,6.38c0,2.83,2.55,5.15,6.41,8.66L9,16l1.09-1C14,11.52,16.5,9.21,16.5,6.38A4.08,4.08,0,0,0,12.38,2.25ZM9.08,13.91L9,14l-0.08-.08C5.35,10.68,3,8.54,3,6.38A2.56,2.56,0,0,1,5.63,3.75,2.93,2.93,0,0,1,8.3,5.52H9.7a2.91,2.91,0,0,1,2.67-1.77A2.56,2.56,0,0,1,15,6.38C15,8.54,12.65,10.68,9.08,13.91Z"></path>
													</g>
												</svg>
											</span>
										</a>
									</div>

								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-motacongviecdaydu">
						<div class="card-motacongviecdaydu">
							<div class="body">
								<div class="row">
									<div class="col-sm-12">
										<h5 class="card-title format-text-bold">Mô tả công việc đầy đủ</h5>
									</div>
									<div class="col-sm-12 mgl-col-content2-right-below">
										<h6 class="card-title format-text-bold">Mô tả công việc:</h6>
										<ul class="ul-motacongviec work">
											<li>${liDescription}</li>
										</ul>
									</div>
									<div class="col-sm-12 mgl-col-content2-right-below">
										<h6 class="card-title format-text-bold">Chức vụ:</h6>
										<p class="p-chucvu work">${data.position}</p>
									</div>
									<div class="col-sm-12 mgl-col-content2-right-below">
										<h6 class="card-title format-text-bold">Quyền lợi được hưởng:</h6>
										<ul class="ul-quyenloiduochuong work">
											<li>${liBenefit}</li>
										</ul>

									</div>
									<div class="col-sm-12 mgl-col-content2-right-below">
										<h6 class="card-title format-text-bold">Yêu cầu bằng cấp (tối thiểu):</h6>
										<p class="p-yeucaubangcap work">${data.degree}</p>
									</div>
									<div class="col-sm-12 mgl-col-content2-right-below">
										<h6 class="card-title format-text-bold">Yêu cầu công việc:</h6>
										<ul class="ul-yeucaucongviec work">
											<li>${liJobrequirement}</li>
										</ul>
									</div>
									<div class="col-sm-12 mgl-col-content2-right-below">
										<h6 class="card-title format-text-bold">Ngành nghề:</h6>
										<p class="p-nganhnghe work">${data.career}</p>
									</div>
									<div class="col-sm-12 col-thongtintuyendung  mgl-col-content2-right-below">
										<div class="col-sm-12">
											<h5 class="card-title format-text-bold">Thông tin tuyển dụng</h5>
										</div>
										<div class="col-sm-12 col-img-user">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 23.564 23.564">
												<path id="ic_person_24px" d="M15.782,15.782A5.891,5.891,0,1,0,9.891,9.891,5.889,5.889,0,0,0,15.782,15.782Zm0,2.945C11.85,18.727,4,20.7,4,24.618v2.945H27.564V24.618C27.564,20.7,19.714,18.727,15.782,18.727Z" transform="translate(-4 -4)" />
											</svg>
											<p class="p-tuyendung1 work">${data.information}</p>
										</div>
										<div class="col-sm-12 col-img-time">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 27.939 27.939">
												<path id="ic_watch_later_24px" d="M15.969,2A13.969,13.969,0,1,0,29.939,15.969,14.01,14.01,0,0,0,15.969,2Zm5.867,19.836-7.264-4.47V8.985h2.1v7.264l6.286,3.772-1.118,1.816Z" transform="translate(-2 -2)" />
											</svg>
											<p class="p-tuyendung2 work">Tuyển dụng đến hết ngày ${data.date}</p>

										</div>
									</div>
								</div>
								
							</div>
						</div>
					</div>
				</div>
		
        `;

        showdetail.html(html);
      },
    });
  });
});


$(document).ready(function () {
	$(".getUserTVID").click(function (e) {
	  let getID = $(this).attr("id");
	  console.log(getID);
	  let showdetail = $("#content");
	  $.ajax({
		type: "GET",
		url: `http://localhost:3000/user/detail/${getID}`,
		dataType: "json",
		data: { action: "fetch" },
  
		success: function (data) {	
			const skills = data.skills;
			const tagpSkills = rendertagp(skills);
		
		  let html = `
		  <div class="col-content-pageinfouser">
		  <div class="row ds-row-pageinfouser">
			  <div class="col-sm-12 infor-userxinviec col-pageinfouserabove">
				  <div class="card-info-userxinviec">
					  <div class="body">
						  <div class="row">
							  <div class="col-sm-12 img-userxinviec-right">
								  <button title="Thay ảnh đại diện" id="avatarInfo" type="button" data-bs-toggle="modal"
									  data-bs-target="#exampleModal" style="border:none;background-color: transparent;">
									  <span><img style="border-radius:100%; margin-top:30px" src="/img/18-F3.png" class="format-img-userxinviec-right" alt="Đây là avatar người tìm việc"></span>
								  </button>
							  </div>
							  <div class="col-sm-12">
								  <h5 class="card-title format-text-bold">${data.hoten}</h5>
								  <h6 class="card-subtitle mb-2">${data.congviec}</h6>
							  </div>
						  </div>
					  </div>
				  </div>
			  </div>
			  <div class="col-sm-12 format-col-basicInfo">
				  <div class="card-basicinfo">
					  <div class="body">
						  <div class="row">
							  <div class="col-sm-12 mgl-col-content2-right-below">
								  <h5 class="card-title format-text-bold">Thông tin cơ bản</h5>
							  </div>
							  <div class="col-sm-12 mgl-col-content2-right-below format-mt-item">
								  <span class="format-span-img-cake"><img class="format-img-cake" src="/img/ic_cake_24px.png"
										  alt="">${data.ngaysinh}</span>
								  <span class="format-span-img-gender"><img class="format-img-gender"
										  src="/img/ic_wc_24px.png" alt="">${data.gioitinh}</span>
							  </div>
	  
							  <div class="col-sm-12  mgl-col-content2-right-below format-mt-item">
								  <span class="format-span-img-call"><img class="format-img-call" src="/img/ic_call_24px.png"
										  alt="">${data.sdt}</span>
								  <span class="format-span-img-letter"><img class="format-img-letter"
										  src="/img/ic_markunread_24px.png" alt="">${data.email}</span>
							  </div>
	  
							  <div class="col-sm-12  mgl-col-content2-right-below format-mt-item">
								  <span><img class="format-img-place" src="/img/ic_place_24px.png" alt="">${data.diachi}</span>
							  </div>
	  
							  <div class="col-sm-12 mgl-col-content2-right-below col-muctieu">
								  <h5 class="card-title format-text-bold">Mục tiêu nghề nghiệp</h5>
								  <span>
									  <p class="p-muctieu">${data.muctieunghenghiep} </p>
								  </span>
							  </div>
	  
							  <div class="col-sm-12 mgl-col-content2-right-below col-hocvan">
								  <h5 class="card-title format-text-bold">Học vấn</h5>
								  <span>
									  <p class="p-hocvan">
									  ${data.hocvan}
									  </p>
								  </span>
							  </div>
	  
							  <div class="col-sm-12 mgl-col-content2-right-below col-kynang">
								  <h5 class="card-title format-text-bold">Kỹ năng</h5>
								  <span>

									  <p class="p-kynang">
									  ${tagpSkills}
									  </p>
									 
								  </span>
							  </div>
							  <div class="col-sm-12 mgl-col-content2-right-below col-kinhnghiem">
								  <h5 class="card-title format-text-bold">Kinh nghiệm làm việc</h5>
								  <span>
									  <p class="p-kinhnghiem">
										  ${data.kinhnghiemlamviec}
									  </p>
								  </span>
							  </div>
							  <div class="col-sm-12 mgl-col-content2-right-below col-chitiet">
								  <h5 class="card-title format-text-bold">Chi tiết</h5>
								  <span>
									  <p class="p-chitiet">
									  ${data.chitiet}
									  </p>
								  </span>
							  </div>
							  
							  <div class="col-md-12 col-tuyenngay">
								  <a class="btn btn-dark btn-outline-light btn-tuyenngay" tabindex="-1" role="button"
								  	href="/dn/invite/${data._id}">Ứng tuyển ngay</a>
								  <button class="btn-luuyeu-thich" id="btn-luuyeuthich" aria-haspopup="true"
									  aria-expanded="false">
									  <span>
										  <svg class="img-ungtuyenngay" width="50" height="40" role="img"
											  aria-label="biểu tượng-lưu" focusable="false" viewBox="0 0 18 18">
											  <g>
												  <path
													  d="M12.38,2.25A4.49,4.49,0,0,0,9,3.82,4.49,4.49,0,0,0,5.63,2.25,4.08,4.08,0,0,0,1.5,6.38c0,2.83,2.55,5.15,6.41,8.66L9,16l1.09-1C14,11.52,16.5,9.21,16.5,6.38A4.08,4.08,0,0,0,12.38,2.25ZM9.08,13.91L9,14l-0.08-.08C5.35,10.68,3,8.54,3,6.38A2.56,2.56,0,0,1,5.63,3.75,2.93,2.93,0,0,1,8.3,5.52H9.7a2.91,2.91,0,0,1,2.67-1.77A2.56,2.56,0,0,1,15,6.38C15,8.54,12.65,10.68,9.08,13.91Z">
												  </path>
											  </g>
										  </svg>
									  </span>
								  </button>
							  </div>
						  
						  </div>
					  </div>
				  </div>
			  </div>
		  </div>
	  </div>
		  `;
		  showdetail.html(html);
		},
	  });
	});
  });

$(document).on("click", ".card-body", function (e) {
  $(".card-body").each(function (a, b) {
    $(b).attr("style", "box-shadow: none;");
  });
  $(this).attr("style", "box-shadow: 0 0 4px black;");
});
function renderLi(b){
	let a = b[0];
	if (b.length != 0)
	{
		for ( j = 1; j < b.length; j++ )
		{
			  a += `<li>${b[j]}</li>`;
		}
	}
	return a;
}
function rendertagp(b){
	let a = b[0];
	if (b.length != 0)
	{
		for ( j = 1; j < b.length; j++ )
		{
			  a += `<p class="p-kynang">${b[j]}</p>`;
		}
	}
	return a;
}
