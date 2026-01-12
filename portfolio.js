$(document).ready(function () {
  // 1. 로딩 및 첫 화면 강제 고정
  $(window).on("load", function () {
    // 새로고침 시 주소창에 #about 같은 게 남아있어도 무시하고 top으로 보냄
    $("html, body").animate({ scrollTop: 0 }, 10);

    setTimeout(function () {
      $("#loading").fadeOut(600, function () {
        // (1) 메인 타이틀 펼치기
        $("#section1").addClass("active");

        // (2) 헤더(메뉴) 등장
        setTimeout(() => {
          $(".header_wrap").animate({ opacity: 1, top: "30px" }, 800);
        }, 500);
      });
    }, 2000);
  });

  // 2. FullPage.js 설정
  $("#fullpage").fullpage({
    anchors: ["main", "about", "skill", "work", "contact"],
    scrollingSpeed: 1000,
    // 중요: 초기화 직후에는 애니메이션 없이 첫 섹션에 있게 설정
    afterRender: function () {
      // 초기 로드 시 1페이지 active 확인
      $(".section").eq(0).addClass("active");
    },
    onLeave: function (index, nextIndex) {
      // 섹션 클래스 수동 제어 (애니메이션 트리거용)
      $(".section").removeClass("active");
      $(".section")
        .eq(nextIndex - 1)
        .addClass("active");

      // 헤더 색상 (1번 섹션 탈출 시 active 추가)
      if (nextIndex !== 1) $(".header_wrap").addClass("active");
      else $(".header_wrap").removeClass("active");

      // GNB 메뉴 이미지/텍스트 활성화
      $(".nav_menu li").removeClass("active");
      $(".nav_menu li")
        .eq(nextIndex - 1)
        .addClass("active");

      // 스킬 게이지 실행
      if (nextIndex === 3) setTimeout(activeSkillGauge, 500);
      else resetSkillGauge();
    },
  });

  // 3. 스킬 원형 게이지 (사각형 방지 로직 포함)
  function activeSkillGauge() {
    $(".circle_svg_box").each(function () {
      let $this = $(this);
      let per = $this.find("h3").data("per");
      let circle = $this.find(".bar");
      let r = 70; // 반지름 (CSS와 일치해야 함)
      let c = Math.PI * (r * 2); // 둘레 계산 (약 439)

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

  // 4. Work 스와이퍼 (고양이 닷 포함)
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

  // 스크롤 다운 클릭 시 이동
  $(".scroll_down_icon_wrap").click(function () {
    $.fn.fullpage.moveSectionDown();
  });
});
