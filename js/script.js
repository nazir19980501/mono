(() => {

    /* =========================================
       PRELOADER
    ========================================= */
    const preloader = document.getElementById("preloader");
    const loaderFill = document.getElementById("loaderFill");
    const loaderPercentage = document.getElementById("loaderPercentage");
    let progress = 0;

    const loaderTimer = setInterval(() => {
        progress = Math.min(
            progress + Math.floor(Math.random() * 10) + 4,
            92
        );

        if (loaderFill) {
            loaderFill.style.width = progress + "%";
        }

        if (loaderPercentage) {
            loaderPercentage.textContent = progress + "%";
        }
    }, 80);


    function hidePreloader() {
        clearInterval(loaderTimer);

        if (loaderFill) {
            loaderFill.style.width = "100%";
        }

        if (loaderPercentage) {
            loaderPercentage.textContent = "100%";
        }

        if (!preloader) {
            return;
        }

        setTimeout(() => {
            preloader.classList.add(
                "opacity-0",
                "pointer-events-none"
            );

            setTimeout(() => {
                preloader.remove();
            }, 700);
        }, 250);
    }


    if (document.readyState === "complete") {
        hidePreloader();
    } else {
        window.addEventListener(
            "load",
            hidePreloader,
            { once: true }
        );
    }



    /* =========================================
       MOBILE MENU
    ========================================= */
    // const mobileButton =
    //     document.getElementById("mobileButton");

    // const mobileMenu =
    //     document.getElementById("mobileMenu");


    // mobileButton?.addEventListener("click", () => {
    //     if (!mobileMenu) {
    //         return;
    //     }

    //     const isOpen =
    //         !mobileMenu.classList.contains("hidden");

    //     mobileMenu.classList.toggle("hidden", isOpen);

    //     mobileButton.setAttribute(
    //         "aria-expanded",
    //         String(!isOpen)
    //     );
    // });


    // document
    //     .querySelectorAll(".mobile-link")
    //     .forEach(link => {

    //         link.addEventListener("click", () => {

    //             mobileMenu?.classList.add("hidden");

    //             mobileButton?.setAttribute(
    //                 "aria-expanded",
    //                 "false"
    //             );

    //         });

    //     });



    const progressBar =
        document.getElementById("scrollProgress");

    const progressPoints =
        document.querySelectorAll(".progress-point");

    const sections = [
        document.querySelector("#home"),
        document.querySelector("#about"),
        document.querySelector("#services"),
        document.querySelector("#projects"),
        document.querySelector("#process"),
        document.querySelector("#contact")
    ];


    function updateScrollProgress() {

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        progressBar.style.width = percentage + "%";


        /**
         * Determine which major section
         * the user is currently inside.
         */
        let activeIndex = 0;

        sections.forEach((section, index) => {

            if (!section) return;

            const rect =
                section.getBoundingClientRect();

            const triggerPoint =
                window.innerHeight * 0.45;

            if (rect.top <= triggerPoint) {
                activeIndex = index;
            }

        });


        progressPoints.forEach((point, index) => {

            point.classList.toggle(
                "active",
                index <= activeIndex
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();





    /* ========================================
       SCROLL REVEAL
    ======================================== */
    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");


                        /* =========================================
                           TYPEWRITER
                        ========================================= */

                        const typewriter =
                            entry.target.querySelector(".typewriter");

                        if (
                            typewriter &&
                            !typewriter.dataset.started
                        ) {

                            typewriter.dataset.started = "true";

                            const text =
                                typewriter.dataset.text ||
                                typewriter.textContent;

                            let index = 0;

                            typewriter.textContent = "";


                            function typeWriter() {

                                if (index < text.length) {

                                    typewriter.textContent +=
                                        text.charAt(index);

                                    index++;

                                    setTimeout(
                                        typeWriter,
                                        100
                                    );

                                }

                            }


                            /* Start after reveal finishes */
                            setTimeout(
                                typeWriter,
                                1200
                            );

                        }


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    
    const heroImage =
        document.querySelector(".hero-image");


    window.addEventListener(
        "scroll",
        () => {

            if (!heroImage) return;

            const scroll =
                window.scrollY;

            if (scroll < window.innerHeight) {

                heroImage.style.transform =
                    `scale(${1 + scroll * 0.00008})
                     translateY(${scroll * 0.08}px)`;

            }

        },
        { passive: true }
    );


const mobileButton = document.getElementById("mobileButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileLinks =
    document.querySelectorAll(".mobile-link");

mobileButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
});


    const navLinks =
        document.querySelectorAll(".nav-link");

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const id =
                            entry.target.getAttribute("id");

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                "#" + id
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-40% 0px -50% 0px"
            }
        );


    sections.forEach(section => {

        if (section) {
            sectionObserver.observe(section);
        }

    });


})();