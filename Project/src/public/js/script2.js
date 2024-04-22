function script2(){
    const dropdownUser = $(".filter-dropdown-container-user");
    const clearDropdownUser = (e) => {
    dropdownUser.each(function (item) {
      if ($(this).hasClass("dropped") && $(this) != e) {
        $(this).removeClass("dropped");
      }
    });
    };
    const clearAllDropdownUser = (e) => {
    dropdownUser.each(function (item) {
      if ($(this).hasClass("dropped")) {
        $(this).removeClass("dropped");
      }
    });
    };
    dropdownUser.each(function (item) {
    const dropItemUser = $(this);
    dropItemUser.on("click", function (e) {
      const target = e.target;
      e.stopPropagation();
      const dropListUser = dropItemUser.find(".filter-dropdownlist-user");
      if (dropItemUser.hasClass("dropped")) {
        dropItemUser.removeClass("dropped");
      } else {
        clearDropdownUser(dropItemUser);
        dropItemUser.addClass("dropped");
      }
    
      $(document).click(function (e) {
        // if the target of the click isn't the container nor a descendant of the container
        if (
          !dropItemUser.is(e.target) &&
          dropItemUser.has(e.target).length === 0
        ) {
          clearAllDropdownUser();
        }
      });
    });
    });
    }
    $(document).ready(function () {
    script2();
    })
    