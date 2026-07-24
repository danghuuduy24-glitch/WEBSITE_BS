//==============================
// Khởi tạo trang đăng nhập
//==============================
window.onload = function () {
    var formDangNhap = document.getElementById("loginForm");
    var nutHienMatKhau = document.getElementById("showPassword");

    formDangNhap.addEventListener("submit", dangNhap);
    nutHienMatKhau.addEventListener("click", hienAnMatKhau);
    capNhatSoLuongGioHang();
};

//==============================
// Hiện hoặc ẩn mật khẩu
//==============================
function hienAnMatKhau() {
    var matKhau = document.getElementById("password");
    var nutHienMatKhau = document.getElementById("showPassword");

    if (matKhau.type == "password") {
        matKhau.type = "text";
        nutHienMatKhau.innerHTML = "🙈";
    } else {
        matKhau.type = "password";
        nutHienMatKhau.innerHTML = "👁";
    }
}

//==============================
// Kiểm tra đăng nhập
//==============================
function dangNhap(suKien) {
    suKien.preventDefault();

    var tenDangNhap = document.getElementById("username").value.trim();
    var matKhau = document.getElementById("password").value;
    var taiKhoan;

    if (tenDangNhap == "") {
        alert("Vui lòng nhập tên đăng nhập");
        document.getElementById("username").focus();
        return;
    }

    if (matKhau == "") {
        alert("Vui lòng nhập mật khẩu");
        document.getElementById("password").focus();
        return;
    }

    taiKhoan = timTaiKhoan(tenDangNhap, matKhau);

    if (taiKhoan == null) {
        alert("Sai tên đăng nhập hoặc mật khẩu");
        return;
    }

    localStorage.setItem("currentUserHoTen", taiKhoan.hoTen);
    localStorage.setItem("currentUserEmail", taiKhoan.email);
    localStorage.setItem("currentUserTenDangNhap", taiKhoan.tenDangNhap);

    alert("Đăng nhập thành công");
    window.location.href = "trangbanhang.html";
}

//==============================
// Tìm tài khoản phù hợp
//==============================
function timTaiKhoan(tenDangNhap, matKhau) {
    var soLuong = Number(localStorage.getItem("soLuongTaiKhoan"));
    var i;

    for (i = 0; i < soLuong; i++) {
        if (localStorage.getItem("taiKhoan_" + i + "_tenDangNhap") == tenDangNhap &&
            localStorage.getItem("taiKhoan_" + i + "_matKhau") == matKhau) {

            return {
                hoTen: localStorage.getItem("taiKhoan_" + i + "_hoTen"),
                email: localStorage.getItem("taiKhoan_" + i + "_email"),
                tenDangNhap: localStorage.getItem("taiKhoan_" + i + "_tenDangNhap")
            };
        }
    }

    return null;
}

//==============================
// Cập nhật số lượng giỏ hàng
//==============================
function capNhatSoLuongGioHang() {
    var soLuong = Number(localStorage.getItem("tongSoLuongGioHang"));
    var huyHieu = document.getElementsByClassName("no-ordered-items");
    var i;

    for (i = 0; i < huyHieu.length; i++) {
        huyHieu[i].innerHTML = soLuong;
    }
}
