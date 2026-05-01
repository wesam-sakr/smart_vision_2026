document.addEventListener("DOMContentLoaded", () => {
  // Determine text direction
  const bodyDir = window.getComputedStyle(document.body).direction;
  const dirAr = bodyDir === "rtl";

  // make navbar fixed while scrolling
  window.addEventListener("scroll", () =>
    document
      .getElementById("mainNav")
      .classList.toggle("fixed", window.scrollY > 40),
  );

  // Scroll to the top of the page
  window.addEventListener("scroll", () => {
    document.getElementById("scrollUp").style.display =
      window.scrollY > 300 ? "block" : "none";
  });

  function updateDateTime() {
    const now = new Date();

    // ⏰ الوقت بتوقيت الرياض مع صباحًا / مساءً
    const timeFormatter = new Intl.DateTimeFormat("ar-SA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Riyadh",
    });

    const formattedTime = timeFormatter.format(now);
    document.getElementById("liveTime").textContent = formattedTime;

    // تحديث التاريخ مرة واحدة في اليوم
    const lastDate = document
      .getElementById("hijriDate")
      .getAttribute("data-last-date");
    const todayDate = now.toLocaleDateString("ar-SA-u-ca-islamic", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      timeZone: "Asia/Riyadh",
    });

    if (todayDate !== lastDate) {
      // 📅 التاريخ الهجري بتوقيت الرياض
      const dateFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Riyadh",
      });

      const formattedDate = dateFormatter.format(now);
      const dateElem = document.getElementById("hijriDate");
      dateElem.textContent = formattedDate;
      dateElem.setAttribute("data-last-date", todayDate);
    }
  }

  // تحديث الوقت فورًا
  updateDateTime();
  // تحديث كل ثانية
  setInterval(updateDateTime, 1000);

  // const stage = document.getElementById("canvas");
  // const todayKey = "canvas_last_seen";
  // const nowDate = new Date().toDateString();

  // if (localStorage.getItem(todayKey) === nowDate) {
  //   stage.style.display = "none";
  // } else {
  //   localStorage.setItem(todayKey, nowDate);

  //   stage.style.display = "block";
  //   stage.width = window.innerWidth;
  //   stage.height = window.innerHeight;

  //   let then, fpsInterval, startTime;

  //   const randItem = (i) => i[Math.floor(Math.random() * i.length)];
  //   const rand = (i) => Math.floor(Math.random() * i);
  //   const randBetween = (min, max) =>
  //     Math.floor(Math.random() * (max - min + 1) + min);

  //   const max = 30;
  //   const ctx = stage.getContext("2d");
  //   const w = stage.width;
  //   const h = stage.height;
  //   const pets = ["✨", "🌙"];

  //   const items = new Array(max).fill().map(() => {
  //     return {
  //       x: rand(w),
  //       y: rand(h),
  //       p: randItem(pets),
  //       xs: -4 + Math.random() * 4 + 2,
  //       ys: Math.random() * 1 + 1,
  //       fs: randBetween(12, 46),
  //     };
  //   });

  //   function draw() {
  //     ctx.clearRect(0, 0, w, h);

  //     items.forEach((p) => {
  //       ctx.font = `${p.fs}px sans-serif`;
  //       ctx.fillText(p.p, p.x, p.y);
  //     });

  //     requestAnimationFrame(draw);

  //     let now = Date.now();
  //     let elapsed = now - then;

  //     if (elapsed > fpsInterval) {
  //       then = now - (elapsed % fpsInterval);
  //     }

  //     move();
  //   }

  //   function move() {
  //     items.forEach((p) => {
  //       p.x += p.xs;
  //       p.y += p.ys;

  //       if (p.x > w || p.y > h) {
  //         p.x = rand(w);
  //         p.y = -20;
  //       }
  //     });
  //   }

  //   function animate(fps) {
  //     fpsInterval = 120 / fps;
  //     then = Date.now();
  //     startTime = then;
  //     draw();
  //   }

  //   animate(60);

  //   setTimeout(() => {
  //     stage.style.opacity = "0";
  //     stage.style.pointerEvents = "none";
  //     setTimeout(() => {
  //       stage.style.display = "none";
  //     }, 500);
  //   }, 10000);
  // }

  // change 2nd word color
  const paragraph = document.querySelector(".logo-img span");
  if (paragraph) {
    const words = paragraph.innerText.split(" ");
    words[1] = `<span class="secondary">${words[1]}</span>`;
    paragraph.innerHTML = words.join(" ");
  }

  const select = document.querySelector(".form-select");
  if (select) {
    document.querySelectorAll("select").forEach(function (select) {
      const numberOfOptions = select.options.length;

      // إخفاء الـ <select> الأصلي
      select.classList.add("select-hidden");

      // إنشاء الهيكل الخاص بـ select-styled
      const wrapper = document.createElement("div");
      wrapper.classList.add("select");
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);

      const styledSelect = document.createElement("div");
      styledSelect.classList.add("select-styled");
      styledSelect.textContent = select.options[0].textContent;
      wrapper.appendChild(styledSelect);

      const optionsList = document.createElement("ul");
      optionsList.classList.add("select-options");
      wrapper.appendChild(optionsList);

      // إضافة الخيارات إلى القائمة المخصصة
      Array.from(select.options).forEach((option, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = option.textContent;
        listItem.setAttribute("rel", option.value);
        optionsList.appendChild(listItem);

        if (option.selected) {
          listItem.classList.add("is-selected");
        }
      });

      const listItems = optionsList.querySelectorAll("li");

      // عند الضغط على العنصر المخصص
      styledSelect.addEventListener("click", function (e) {
        e.stopPropagation();
        document
          .querySelectorAll("div.select-styled.active")
          .forEach(function (activeStyledSelect) {
            if (activeStyledSelect !== styledSelect) {
              activeStyledSelect.classList.remove("active");
              activeStyledSelect.nextElementSibling.style.display = "none";
            }
          });

        styledSelect.classList.toggle("active");
        optionsList.style.display = styledSelect.classList.contains("active")
          ? "block"
          : "none";
      });

      // عند اختيار عنصر من القائمة
      listItems.forEach(function (listItem) {
        listItem.addEventListener("click", function (e) {
          e.stopPropagation();
          styledSelect.textContent = listItem.textContent;
          styledSelect.classList.remove("active");

          select.value = listItem.getAttribute("rel");

          optionsList
            .querySelectorAll("li.is-selected")
            .forEach(function (selectedItem) {
              selectedItem.classList.remove("is-selected");
            });
          listItem.classList.add("is-selected");

          optionsList.style.display = "none";

          // يمكنك إضافة أي شيء هنا مثل: console.log(select.value);
        });
      });

      // عند الضغط خارج العنصر
      document.addEventListener("click", function () {
        styledSelect.classList.remove("active");
        optionsList.style.display = "none";
      });
    });
  }

  var swiperPrtners = new Swiper(".partners .swiper", {
    loop: true,
    rtl: dirAr,
    speed: 3000,
    slidesPerView: 6,
    spaceBetween: 16,
    freeMode: true,
    freeModeMomentum: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    breakpoints: {
      1400: {
        slidesPerView: 9,
      },
      992: {
        slidesPerView: 5,
      },
      768: {
        slidesPerView: 5,
      },
      576: {
        slidesPerView: 3,
      },
      0: {
        slidesPerView: 2.2,
      },
    },
  });

  // السطر الأول - يتحرك يمين
  const swiperTop = new Swiper(".swiper.top", {
    slidesPerView: "auto",
    spaceBetween: 20,
    rtl: dirAr,
    loop: true,
    speed: 4000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    breakpoints: {
      1400: {
        slidesPerView: 13.5,
      },
      992: {
        slidesPerView: 10,
      },
      768: {
        slidesPerView: 8,
      },
      576: {
        slidesPerView: 5,
      },
      0: {
        slidesPerView: 4.5,
      },
    },
  });

  // السطر الثاني - يتحرك عكس الاتجاه
  const swiperBottom = new Swiper(".swiper.bottom", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: true,
    rtl: dirAr,
    speed: 4000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: true, // دي النقطة اللي تخليه عكس
    },
    breakpoints: {
      1400: {
        slidesPerView: 13.5,
      },
      992: {
        slidesPerView: 10,
      },
      768: {
        slidesPerView: 8,
      },
      576: {
        slidesPerView: 5,
      },
      0: {
        slidesPerView: 4.5,
      },
    },
  });

  $(".our_team .owl-carousel").owlCarousel({
    margin: 16,
    responsiveClass: true,
    rtl: dirAr,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayHoverPause: true,
    loop: true,
    stagePadding: 120,
    // animateIn: "fadeInLeft",
    responsive: {
      0: {
        items: 1,
        stagePadding: 0,
      },
      600: {
        items: 2,
        stagePadding: 0,
      },
      1000: {
        items: 3,
      },
    },
  });

  $(".projects .owl-carousel").owlCarousel({
    margin: 16,
    responsiveClass: true,
    rtl: dirAr,
    nav: false,
    dots: true,
    // autoplay: true,
    loop: true,
    animateIn: "fadeInLeft",
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });

  $(".categories .owl-carousel").owlCarousel({
    margin: 8,
    responsiveClass: true,
    rtl: dirAr,
    nav: false,
    dots: false,
    autoWidth:true,
    loop: true,
    animateIn: "fadeInLeft",
    responsive: {
      0: {
        items: 3,
      },
      600: {
        items: 5,
      },
      1000: {
        items: 9,
      },
    },
  });

  const testimonialsOwl = $(".testimonials .owl-carousel");

  testimonialsOwl.owlCarousel({
    margin: 0,
    responsiveClass: true,
    rtl: dirAr,
    autoplayHoverPause: true,
    items: 1,
    dots: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
  });

  // كل عناصر الصوت داخل سكشن التستيمونيال بس
  const testimonialAudios = document.querySelectorAll(".testimonials audio");

  // دالة توقف كل الأصوات
  function stopAllTestimonialAudio() {
    testimonialAudios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  /* 1- لما الاسلايد يتغير (سحب - dots - autoplay)
   يوقف أي صوت شغال */
  testimonialsOwl.on("changed.owl.carousel", function () {
    stopAllTestimonialAudio();
    testimonialsOwl.trigger("play.owl.autoplay");
  });

  /* 2- يمنع تشغيل أكتر من صوت + يوقف الأوتوبلاي وقت التشغيل */
  testimonialAudios.forEach((audio) => {
    audio.addEventListener("play", function () {
      // وقف أي صوت تاني
      testimonialAudios.forEach((otherAudio) => {
        if (otherAudio !== audio) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
        }
      });

      // وقف autoplay طالما الصوت شغال
      testimonialsOwl.trigger("stop.owl.autoplay");
    });

    /* 3- لما الصوت يقف بإيد المستخدم */
    audio.addEventListener("pause", function () {
      // نتأكد إنه فعلاً مش بيبدل بين صوتين
      const anyPlaying = Array.from(testimonialAudios).some((a) => !a.paused);

      if (!anyPlaying) {
        testimonialsOwl.trigger("play.owl.autoplay");
      }
    });

    /* 4- لما الصوت يخلص لوحده */
    audio.addEventListener("ended", function () {
      testimonialsOwl.trigger("play.owl.autoplay");
    });
  });

  var $blogCarousel = $(".blogs .owl-carousel");
  var blogItemsCount = $blogCarousel.find(".card").length; // عدد العناصر
  // تعطيل السحب لو العناصر2  أو أقل
  const allowDragBlog = blogItemsCount > 2;
  $blogCarousel.owlCarousel({
    nav: false,
    loop: false,
    dots: true,
    responsiveClass: true,
    margin: 16,
    rtl: dirAr,
    responsive: {
      0: {
        items: 1,
      },
      578: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 2,
        mouseDrag: allowDragBlog,
        touchDrag: allowDragBlog,
      },
    },
  });

  var $pricingCarousel = $(".pricing .owl-carousel");
  var pricingItemsCount = $pricingCarousel.find(".card").length; // عدد العناصر
  // تعطيل السحب لو العناصر 3 أو أقل
  const allowDrag = pricingItemsCount > 3;
  $pricingCarousel.owlCarousel({
    nav: false,
    loop: false,
    dots: true,
    responsiveClass: true,
    margin: 16,
    rtl: dirAr,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1.4,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 3,
        mouseDrag: allowDrag,
        touchDrag: allowDrag,
      },
    },
  });

  // upload and preview multiple images such as dropzone
  function ImgUpload() {
  let imgArray = [];

  $(".upload__inputfile").each(function () {
    const $input = $(this);

    $input.on("change", function (e) {
      const imgWrap = $input
        .closest(".upload__box")
        .find(".upload__img-wrap");

      const maxLength = parseInt($input.attr("data-max_length")) || 20;
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        // منع الزيادة عن الحد
        if (imgArray.length >= maxLength) return;

        // أنواع الملفات المسموحة
        const allowedTypes = [
          "image/",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        const isAllowed = allowedTypes.some((type) =>
          file.type.startsWith(type)
        );

        if (!isAllowed) return;

        imgArray.push(file);

        const reader = new FileReader();

        reader.onload = function (e) {
          let previewContent = "";

          // لو صورة
          if (file.type.startsWith("image/")) {
            previewContent = `<img src="${e.target.result}" alt="${file.name}" class="w-100 h-100 object-fit-cover">`;
          } 
          // لو PDF
          else if (file.type === "application/pdf") {
            previewContent = `
              <div class="file-preview text-center p-3">
                <i class="bi bi-file-earmark-pdf fs-1 text-danger"></i>
                <p class="small mt-2 mb-0">${file.name}</p>
              </div>`;
          } 
          // لو Word / CV
          else {
            previewContent = `
              <div class="file-preview text-center p-3">
                <i class="bi bi-file-earmark-text fs-1 text-primary"></i>
                <p class="small mt-2 mb-0">${file.name}</p>
              </div>`;
          }

          const html = `
            <div class="col">
              <div class="upload__img-box position-relative">
                <div 
                  class="img-bg border rounded overflow-hidden position-relative"
                  data-file="${file.name}"
                  style="height:120px;"
                >
                  <span class="upload__img-close position-absolute top-0 end-0 m-1 btn btn-sm btn-danger">×</span>
                  ${previewContent}
                </div>
              </div>
            </div>
          `;

          imgWrap.append(html);
        };

        // لو صورة نقرأها، لو ملف عادي برضه نستخدم readAsDataURL للأيقونة
        reader.readAsDataURL(file);
      });
    });
  });

  // حذف الملف (يشتغل مع أكتر من upload box)
  $(document).on("click", ".upload__img-close", function () {
    const $box = $(this).closest(".upload__box");
    const inputElement = $box.find(".upload__inputfile")[0];
    const fileName = $(this).parent().data("file");

    const dt = new DataTransfer();

    // تحديث الأراي
    imgArray = imgArray.filter((file) => file.name !== fileName);

    // إعادة بناء الملفات داخل input
    Array.from(inputElement.files).forEach((file) => {
      if (file.name !== fileName) {
        dt.items.add(file);
      }
    });

    inputElement.files = dt.files;

    // حذف من الواجهة
    $(this).closest(".col").remove();
  });
}

ImgUpload();

  new WOW().init();
});
