$(document).ready(function () {
  // 1. 로딩 제어: window load 대신 바로 실행하거나 짧은 지연 후 실행
  function hideLoading() {
    $("#loading").fadeOut(600, function () {
      $("#section1").addClass("active");
      $(".header_wrap").animate({ opacity: 1, top: "30px" }, 800);
    });
  }

  setTimeout(hideLoading, 2500);

  $("#fullpage").fullpage({
    anchors: ["main", "about", "skill", "work", "contact"],
    scrollingSpeed: 1000,
    afterRender: function () {
      $(".section").eq(0).addClass("active");
    },
    onLeave: function (index, nextIndex) {
      $(".section").removeClass("active");
      $(".section")
        .eq(nextIndex - 1)
        .addClass("active");

      if (nextIndex !== 1) $(".header_wrap").addClass("active");
      else $(".header_wrap").removeClass("active");

      $(".nav_menu li").removeClass("active");
      $(".nav_menu li")
        .eq(nextIndex - 1)
        .addClass("active");

      if (nextIndex === 3) setTimeout(activeSkillGauge, 500);
      else resetSkillGauge();
    },
  });

  function activeSkillGauge() {
    $(".circle_svg_box").each(function () {
      let $this = $(this);
      let per = $this.find("h3").data("per");
      let circle = $this.find(".bar");
      let r = 70; 
      let c = Math.PI * (r * 2);

      circle.css("stroke-dasharray", c);
      let offset = c - (c * per) / 100;

      circle.css("stroke-dashoffset", offset);

      $({ val: 0 }).animate(
        { val: per },
        {
          duration: 1500,
          step: function () {
            $this.find("h3").text(Math.floor(this.val) + "%");
          },
        }
      );
    });
  }

  function resetSkillGauge() {
    $(".bar").css("stroke-dashoffset", 439);
    $(".circle_svg_box h3").text("0%");
  }

  var workSwiper = new Swiper(".section_work_swiper", {
    loop: true,
    centeredSlides: true,
    pagination: {
      el: ".custom_cat_pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  $(".scroll_down_icon_wrap").click(function () {
    $.fn.fullpage.moveSectionDown();
  });
});
