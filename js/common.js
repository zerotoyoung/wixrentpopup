console.clear();

// 페이지 표시 및 유효성 검사 관련 함수
function showPage(pageNumber) {
    document.querySelectorAll(".page").forEach(function (page) {
        page.style.display = "none"; // 모든 페이지 숨김
    });

    const pageElement = document.getElementById("page" + pageNumber);
    if (pageElement) {
        pageElement.style.display = "flex"; // 선택된 페이지만 flex로 표시
    } else {
        console.error(`페이지 ${pageNumber}를 찾을 수 없습니다.`);
    }
}

function validatePage(pageNumber) {
    let isValid = true;

    if (pageNumber === 1) {
        const vehicleInput = document.getElementById("sm-field-6ZIkDLzMiE");
        if (!vehicleInput.value.trim()) {
            alert("희망하는 차량을 입력해 주세요.");
            isValid = false;
        }
    }

    if (pageNumber === 2) {
        if (!validatePageInputs()) {
            isValid = false;
        }
    }

    return isValid;
}

function validatePageInputs() {
    const nameInput = document.getElementById("sm-field-kEImBbAtuF");
    const phoneInput = document.getElementById("sm-field-Y2YTi50zbu");

    if (!nameInput.value.trim()) {
        alert("성함을 입력해 주세요.");
        return false;
    } else if (!phoneInput.value.trim() || !phoneInput.checkValidity()) {
        alert("유효한 휴대폰 번호를 입력해 주세요.");
        return false;
    }

    return true;
}

function showPageWithValidation(pageNumber) {
    if (validatePage(pageNumber - 1)) {
        showPage(pageNumber);
    }
}

// 페이지 이동 및 폼 전송 처리 함수
function skipForm(pageNumber, event) {
    if (event) event.preventDefault();  // 폼 제출 방지

    if (pageNumber === 2) {
        goToHomepage();
    } else {
        showPage(pageNumber + 1);
    }
}

function goToHomepage() {
    window.top.location.href = "https://a01048222597.wixsite.com/my-site-2/home";
}

function submitFormWithMessage(formSelector, messageSelector) {
    const form = document.querySelector(formSelector);

    if (!form) {
        console.error("폼을 찾을 수 없습니다. 선택자를 확인하세요.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        document.querySelectorAll(".page").forEach(function (page) {
            page.style.display = "none"; // 모든 페이지 숨김
        });

        const messageElement = document.querySelector(messageSelector);
        if (messageElement) {
            messageElement.style.display = "flex"; // 메시지 표시
        }

        const formData = new FormData(event.target);

        fetch(event.target.action, {
            method: event.target.method,
            body: formData
        })
            .then((response) => {
                if (response.ok) {
                    console.log("폼이 성공적으로 제출되었습니다.");
                } else {
                    console.error("폼 제출에 실패했습니다.");
                    // alert("폼 제출에 실패했습니다. 다시 시도해 주세요.");
                }
            })
            .catch((error) => {
                console.error("폼 전송 중 오류 발생:", error);
                // alert("폼 전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
            });
    });
}

// 페이지 높이 조정
function adjustHeight() {
    const formCon = document.querySelector('.form-con');
    formCon.style.minHeight = window.innerHeight + 'px';
}

// 이벤트 리스너 설정
document.addEventListener("DOMContentLoaded", function () {
    showPage(1); // 기본적으로 #page1을 표시
    submitFormWithMessage("form", ".form-last");

    // const nextBtn = document.querySelector("#page2 .next-btn button");
    // if (nextBtn) {
    //     nextBtn.addEventListener("click", function (event) {
    //         if (!validatePageInputs()) {
    //             event.preventDefault(); // 유효하지 않으면 폼 제출 방지
    //             alert("모든 필드를 채워 주세요."); // 경고창 띄우기
    //         }
    //     });
    // }

    adjustHeight();
});

window.addEventListener('resize', adjustHeight);

// form-box 요소가 화면에 있을 때 스크롤바 숨김 처리
document.addEventListener("DOMContentLoaded", function () {
    const formBox = document.querySelector(".form-box");
    const htmlBody = document.documentElement;

    if (formBox) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        htmlBody.style.overflow = "hidden"; // form-box가 화면에 있을 때 스크롤바 숨김
                    } else {
                        htmlBody.style.overflow = ""; // form-box가 화면에 없으면 스크롤바 표시
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(formBox);
    }
});
