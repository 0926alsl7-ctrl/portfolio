$(document).ready(function () {
  let isTyping = false; 

  function typeWriter(selector, text) {
    if (isTyping) return; // 이미 타이핑 중이면 또 실행 안 함
    isTyping = true;
    
    const $target = $(selector);
    $target.text(""); 
    
    let i = 0;
    function type() {
      if (i < text.length) {
        $target.append(text.charAt(i));
        i++;
        setTimeout(type, 80); // 120으로 하면 딱 예쁘게 천천히 나옴!
      } else {
        isTyping = false; // 다 썼으면 다시 실행 가능하게 풀기
      }
    }
    type();
  }


 const introText = "프론트엔드 개발을 목표로 UI/UX와 인터랙티브 웹에 관심이 많은 개발자 지망생입니다.\n사용자 경험을 최우선으로 생각하며, 깔끔하면서도 감성적인 결과물을 만드는 것을 즐깁니다.";
 
  // --- [1] 네브 눈치 챙기기 변수 & 함수 ---
  let navTimer;

  function expandNav() {
    clearTimeout(navTimer);
    $('.header_wrap').addClass('expanded');
  }

  function collapseNav() {
    // 사용자가 메뉴 위에 마우스를 올리고 있거나 터치 중이면 안 닫음
    if ($('.header_wrap:hover').length > 0) return;
    $('.header_wrap').removeClass('expanded');
  }

  function collapseNavWithDelay(delay = 2500) {
    clearTimeout(navTimer);
    navTimer = setTimeout(function () {
      collapseNav();
    }, delay);
  }

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
    scrollingSpeed: 1100,
    afterRender: function () {
      
    },
    onLeave: function (index, nextIndex) {
     $(".section").removeClass("active").eq(nextIndex - 1).addClass("active");

      if (nextIndex !== 1) $(".header_wrap").addClass("active");
      else $(".header_wrap").removeClass("active");

      $(".nav_menu li").removeClass("active").eq(nextIndex - 1).addClass("active");

      expandNav();
      collapseNavWithDelay(2500);

      if (nextIndex === 2) {
        setTimeout(function() {
          typeWriter(".profile_intro", introText);
        }, 1000); // 카드 올라오는 애니메이션 끝나고 1초 뒤 시작
      }


      if (nextIndex === 3) setTimeout(activeSkillGauge, 500);
      else resetSkillGauge();
    },
  });

  $('.header_wrap').on('mouseenter touchstart', function() {
    expandNav();
  });

  // 메뉴 영역에서 손 떼면 그때부터 타이머 시작
  $('.header_wrap').on('mouseleave touchend', function() {
    collapseNavWithDelay(1500);
  });

  // 화면 맨 위(100px 이내) 감지해서 펼치기
  $(document).on('touchstart mousemove', function (e) {
    let touchY = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : 0);
    if (touchY < 100) {
      expandNav();
    }
  });

  // 화면 중앙 터치하면 네브 즉시 접기
  $('.section').on('touchstart', function () {
    collapseNav();
  });

  $('.nav_menu li').on('click', function() {
    let index = $(this).index(); // 몇 번째 메뉴인지 확인
    let anchors = ["main", "about", "skill", "work", "contact"];
    $.fn.fullpage.moveTo(anchors[index]); // 해당 위치로 강제 이동!
  });

    $(document).on('click', '.scroll_down_icon', function() {
    $.fn.fullpage.moveSectionDown();
  });


  function activeSkillGauge() {
  $(".circle_svg_box").each(function () {
    let $this = $(this);
    let per = $this.find("h3").data("per");
    let circle = $this.find(".bar");
    
    let r = 68; 
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
        complete: function () {
          $this.find("h3").text(per + "%");
        }
      }
    );
  });
  }

  function resetSkillGauge() {
  let r = 68;
  let c = Math.PI * (r * 2);
  $(".bar").css("stroke-dashoffset", c);
  $(".circle_svg_box h3").text("0%");
  }


var workSwiper = new Swiper(".section_work_swiper", {
  slidesPerView: 1.4, 
  spaceBetween: 10,
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
    768: { slidesPerView: 1.6, spaceBetween: 30}, 
    1024: { slidesPerView: 1.8, spaceBetween: 50},
  },
});

emailjs.init("g0LSuQJdOwNbg8pBM"); 

  $('.send_btn').off('click').on('click', function() {
    const name = $('.contact_input_name').val();
    const email = $('.contact_input_email').val();
    const message = $('.contact_input_message').val();

    if(!name || !email || !message) {
      alert("모든 항목을 작성해 주세요! 💌");
      return;
    }

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

  function createSkillDeco() {
    const icons = ['⭐', '✨', '💗', '🍭', '🎈', '☁️', '🌸','💕','🫧','💖','💫']; // 쓰고 싶은 이모지들
    const $decoWrap = $('.skill_deco');
    
    for (let i = 0; i < 15; i++) {
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const randomX = Math.random() * 100; 
        const randomY = Math.random() * 100; 
        const randomDelay = Math.random() * 3;
        const randomSize = 1 + Math.random() * 1.5;

        const $item = $(`<span class="deco_item">${randomIcon}</span>`).css({
            left: randomX + '%',
            top: randomY + '%',
            animationDelay: randomDelay + 's',
            fontSize: randomSize + 'rem',
            filter: `blur(${Math.random() * 1.5}px)` 
        });

        $decoWrap.append($item);
    }
}

createSkillDeco();
});




