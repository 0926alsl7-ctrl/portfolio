$(document).ready(function () {

function hideLoading() {
  $("#loading").fadeOut(600, function () {
    $("#section1").addClass("active");
    $(".header_wrap").animate({ opacity: 1, top: "30px" }, 800);
      setTimeout(() => {
        const title = $(".portfolio_title")[0];
        if (title) {
          title.style.display = 'none';  // 숨김
          void title.offsetWidth;        // reflow
          title.style.display = 'inline-block';  // 다시 보이게 + 애니 시작
        }
      }, 100);
  });
}

  setTimeout(hideLoading, 2500);

  $("#fullpage").fullpage({
    anchors: ["main", "about", "skill", "work", "contact"],
    scrollingSpeed: 1000,
    afterRender: function () {
      
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
    
    // 반지름이 68일 때 둘레 계산 (C = 2 * π * r)
    let r = 68; 
    let c = Math.PI * (r * 2);

    circle.css("stroke-dasharray", c);
    let offset = c - (c * per) / 100;

    circle.css("stroke-dashoffset", offset);

    // 숫자 카운팅 애니메이션
    $({ val: 0 }).animate(
      { val: per },
      {
        duration: 1500,
        step: function () {
          $this.find("h3").text(Math.floor(this.val) + "%");
        },
        complete: function () {
          // 마지막에 정확한 퍼센트 박기 (1 차이 나는 거 해결)
          $this.find("h3").text(per + "%");
        }
      }
    );
  });
  }

  function resetSkillGauge() {
  // 리셋할 때도 둘레값 맞춰야 함
  let r = 68;
  let c = Math.PI * (r * 2);
  $(".bar").css("stroke-dashoffset", c);
  $(".circle_svg_box h3").text("0%");
  }


var workSwiper = new Swiper(".section_work_swiper", {
  slidesPerView: 1.2, // 기본 모바일 1개
  spaceBetween: 20,
  centeredSlides: true,
  loop: true,
  watchSlidesProgress: true, 
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".custom_cat_pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 }, // 태블릿 2개
    1024: { slidesPerView: 2.5 }, // 데스크탑 3개! 이제 안 넓음!
  },
});
emailjs.init("g0LSuQJdOwNbg8pBM"); 

  $('.send_btn').off('click').on('click', function() {
    // 입력값 가져오기 (클래스명 확인!)
    const name = $('.contact_input_name').val();
    const email = $('.contact_input_email').val();
    const message = $('.contact_input_message').val();

    // 유효성 검사
    if(!name || !email || !message) {
      alert("모든 항목을 작성해 주세요! 💌");
      return;
    }

    // 전송 확인창
    if (confirm("메일을 전송하시겠습니까?")) {
      const $btn = $(this);
      $btn.prop('disabled', true);

      let dotCount = 0;
      const loadingInterval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        const dots = '.'.repeat(dotCount);
        $btn.text('Sending' + dots);
      }, 400);

      const templateParams = {
        from_name: name,    
        reply_to: email,    
        message: message    
      };

      emailjs.send('service_qlr52qa', 'template_fd0heon', templateParams)
        .then(function(response) {
           clearInterval(loadingInterval);
           alert("메일이 무사히 전송되었습니다! 확인 후 연락드릴게요. 😊");

           $('.contact_form input, .contact_form textarea').val('');
           $btn.text('Send').prop('disabled', false);
        }, function(error) {
          clearInterval(loadingInterval);
           alert("전송에 실패했습니다. 다시 시도해 주세요! ");
           console.log('FAILED...', error);
           $btn.text('Send').prop('disabled', false);
        });
    }
  });

});

// 스킬 섹션에 귀여운 데코 아이템들 뿌리기
function createSkillDeco() {
    const icons = ['⭐', '✨', '💗', '🍭', '🎈', '☁️', '🌸','💕','🫧','💖','💫']; // 쓰고 싶은 이모지들
    const $decoWrap = $('.skill_deco');
    
    for (let i = 0; i < 15; i++) { // 15개 정도 뿌리기
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const randomX = Math.random() * 100; // 가로 위치 (0~100%)
        const randomY = Math.random() * 100; // 세로 위치 (0~100%)
        const randomDelay = Math.random() * 3; // 애니메이션 지연 시간
        const randomSize = 1 + Math.random() * 1.5; // 크기 랜덤 (1rem ~ 2.5rem)

        const $item = $(`<span class="deco_item">${randomIcon}</span>`).css({
            left: randomX + '%',
            top: randomY + '%',
            animationDelay: randomDelay + 's',
            fontSize: randomSize + 'rem',
            filter: `blur(${Math.random() * 1.5}px)` // 살짝 흐릿한 것도 섞어서 입체감 주기
        });

        $decoWrap.append($item);
    }
}

// 로딩 후 실행
createSkillDeco();
