document.addEventListener("DOMContentLoaded", function () {
  // 디버깅을 위한 로그 추가
  console.log("DOM Content Loaded");

  // 섹션 요소들
  const sections = document.querySelectorAll("main, .about, .project");
  console.log("Found sections:", sections.length);

  const navLinks = document.querySelectorAll(".header_nav a");
  console.log("Found nav links:", navLinks.length);

  const navDots = document.querySelector(".nav-dots");
  console.log("Found nav dots container:", navDots);

  // 네비게이션 도트 생성
  navDots.innerHTML = ""; // 혹시 중복 생성 방지
  sections.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "nav-dot";
    dot.addEventListener("click", () => {
      scrollToSection(index);
    });
    navDots.appendChild(dot);
  });

  const dots = document.querySelectorAll(".nav-dot");

  // 스크롤 이벤트 처리
  let isScrolling = false;
  let currentSection = 0;

  function scrollToSection(index) {
    if (isScrolling) return;
    isScrolling = true;

    sections[index].scrollIntoView({ behavior: "smooth" });
    updateNavigation(index);

    setTimeout(() => {
      isScrolling = false;
    }, 1000); // 스크롤 애니메이션 시간
  }

  function updateNavigation(index) {
    // 네비게이션 링크 업데이트
    navLinks.forEach((link) => link.classList.remove("active"));
    if (navLinks[index]) navLinks[index].classList.add("active");

    // 도트 업데이트
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");

    currentSection = index;
  }

  // 네비게이션 링크 클릭 이벤트
  navLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection(index);
    });
  });

  // 키보드 이벤트 처리
  window.addEventListener("keydown", (e) => {
    if (isScrolling) return;

    if (e.key === "ArrowDown" && currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    } else if (e.key === "ArrowUp" && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  });

  // 초기 네비게이션 상태 설정
  updateNavigation(0);

  // Intersection Observer를 사용하여 스크롤 시 현재 섹션 감지 및 네비게이션 업데이트
  const observerOptions = {
    root: null, // viewport를 기준으로 감시
    rootMargin: "0px",
    threshold: 0.1, // 섹션이 10% 이상 보일 때 활성화 (기존 0.7에서 변경)
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      // 디버깅 로그 추가
      // console.log(
      //   `Section: ${entry.target.id || entry.target.className}, ` +
      //   `Is Intersecting: ${entry.isIntersecting}, ` +
      //   `Ratio: ${entry.intersectionRatio.toFixed(2)}`
      // );

      if (entry.isIntersecting) {
        // 프로그램에 의한 스크롤 중이 아닐 때만 네비게이션 업데이트
        if (!isScrolling) {
          const intersectingIndex = Array.from(sections).indexOf(entry.target);
          if (intersectingIndex !== -1) {
            // currentSection !== intersectingIndex 조건 제거하여 더 즉각적으로 업데이트
            updateNavigation(intersectingIndex);
          }
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => {
    observer.observe(section); // 각 섹션 감시 시작
  });
});

$(function () {
  $(".logo_design_img").click(function () {
    $("#logo").show();
  });
  $(".leaflet_design_img").click(function () {
    $("#leaflet").show();
  });
  $(".poster_design_img").click(function () {
    $("#poster").show();
  });
  $(".banner_design_img").click(function () {
    $("#banner").show();
  });

  // 모든 X 버튼에 대한 공통 이벤트 핸들러 (이벤트 위임 사용 권장)
  // 여기서는 각 팝업 내부에 x_circle이 있다고 가정하고, 각 팝업의 x_circle을 선택합니다.
  // 더 나은 방법은 $(document).on('click', '.x_circle', function() { $(this).closest('.hidden').hide(); });
  $("#logo .x_circle").click(function () {
    $("#logo").hide();
  });
  $("#leaflet .x_circle").click(function () {
    $("#leaflet").hide();
  });
  $("#poster .x_circle").click(function () {
    $("#poster").hide();
  });
  $("#banner .x_circle").click(function () {
    $("#banner").hide();
  });
});
