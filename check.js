/** @format */

window.addEventListener("load", function () {
	const open = document.querySelector("#open");
	const siderow = document.querySelector(".siderow");
	const close = document.querySelector("#close");
	const nav = document.getElementById("nav");
	const navitem = document.querySelector(".nav-list");
	const mq = window.matchMedia("(min-width: 992px)");
	const btn = document.querySelector("#open-modal");
	const modal = document.querySelector("#myModal");
	const closer = document.querySelector(".footer");
	const negate = document.querySelector(".negate");
	// FUNCTIONS FOR THE SIDEBAR

	open.addEventListener("click", function () {
		nav.classList.add("animenav");
		nav.style.display = "block";
		siderow.classList.add("siderownav");
    });
    
	close.addEventListener("click", function () {
		nav.classList.remove("animenav");
		siderow.classList.remove("siderownav");
		nav.classList.add("closeanime");
		siderow.classList.add("closesiderow");
		setTimeout(() => {
			nav.classList.remove("closeanime");
			siderow.classList.remove("closesiderow");
			nav.style.display = "none";
		}, 500);
    });
    
	window.addEventListener("click", function (e) {
		if (e.target === nav) {
			nav.classList.remove("animenav");
			siderow.classList.remove("siderownav");
			nav.classList.add("closeanime");
			siderow.classList.add("closesiderow");
			setTimeout(() => {
				nav.classList.remove("closeanime");
				siderow.classList.remove("closesiderow");
				nav.style.display = "none";
			}, 500);
		}
	});

	btn.addEventListener("click", function () {
		modal.style.display = "flex";
	});

	//closer.addEventListener("click", function () {
	//	modal.classList.add("fade-out");
	//	setTimeout(function () {
	//		modal.style.display = "none";
	//		modal.classList.remove("fade-out");
	//	}, 500);
	//});

	negate.addEventListener("click", function () {
		modal.classList.add("fade-out");
		setTimeout(function () {
			modal.style.display = "none";
			modal.classList.remove("fade-out");
		}, 500);
	});

	window.addEventListener("click", function (e) {
		if (e.target === modal) {
			modal.classList.add("fade-out");
			setTimeout(function () {
				modal.style.display = "none";
				modal.classList.remove("fade-out");
			}, 500);
		}
	});

	if (mq.matches) {
		negate.addEventListener("click", function () {
			modal.classList.add("fade-out");
			setTimeout(function () {
				modal.style.display = "none";
				modal.classList.remove("fade-out");
			}, 500);
		});
	} else {
		navitem.addEventListener("click", function () {
			nav.classList.remove("animenav");
			siderow.classList.remove("siderownav");
			nav.classList.add("closeanime");
			siderow.classList.add("closesiderow");
			setTimeout(() => {
				nav.classList.remove("closeanime");
				siderow.classList.remove("closesiderow");
				nav.style.display = "none";
			}, 500);
		});
		negate.addEventListener("click", function () {
			nav.classList.remove("animenav");
			siderow.classList.remove("siderownav");
			nav.classList.add("closeanime");
			siderow.classList.add("closesiderow");
			modal.classList.add("fade-out");
			setTimeout(function () {
				modal.style.display = "none";
				modal.classList.remove("fade-out");
				nav.classList.remove("closeanime");
				siderow.classList.remove("closesiderow");
				nav.style.display = "none";
			}, 500);
		});
	}
});
