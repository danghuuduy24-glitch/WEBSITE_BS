//==============================
// Khởi tạo trang đăng ký
//==============================
window.onload = function () {
    var formDangKy = document.getElementById("registerForm");
    var nutHienMatKhau = document.getElementById("showPassword");
    var matKhau = document.getElementById("password");

    formDangKy.addEventListener("submit", dangKyTaiKhoan);
    nutHienMatKhau.addEventListener("click", hienAnMatKhau);
    matKhau.addEventListener("input", kiemTraDoManhMatKhau);
    capNhatSoLuongGioHang();
};

//==============================
// Hiện hoặc ẩn mật khẩu
//==============================
function hienAnMatKhau() {
    var matKhau = document.getElementById("password");
    var nhapLaiMatKhau = document.getElementById("confirmPassword");
    var nutHienMatKhau = document.getElementById("showPassword");

    if (matKhau.type == "password") {
        matKhau.type = "text";
        nhapLaiMatKhau.type = "text";
        nutHienMatKhau.innerHTML = "🙈";
    } else {
        matKhau.type = "password";
        nhapLaiMatKhau.type = "password";
        nutHienMatKhau.innerHTML = "👁";
    }
}

//==============================
// Kiểm tra độ mạnh mật khẩu
//==============================
function kiemTraDoManhMatKhau() {
    var matKhau = document.getElementById("password").value;
    var noiDung = document.getElementById("strengthText");

    if (matKhau.length == 0) {
        noiDung.innerHTML = "Chưa nhập";
        noiDung.style.color = "black";
    } else if (matKhau.length < 6) {
        noiDung.innerHTML = "Yếu";
        noiDung.style.color = "red";
    } else if (matKhau.length < 8) {
        noiDung.innerHTML = "Trung bình";
        noiDung.style.color = "orange";
    } else {
        noiDung.innerHTML = "Mạnh";
        noiDung.style.color = "green";
    }
}

//==============================
// Đăng ký tài khoản
//==============================
function dangKyTaiKhoan(suKien) {
    suKien.preventDefault();

    var hoTen = document.getElementById("fullname").value.trim();
    var email = document.getElementById("email").value.trim();
    var tenDangNhap = document.getElementById("username").value.trim();
    var matKhau = document.getElementById("password").value;
    var nhapLaiMatKhau = document.getElementById("confirmPassword").value;
    var dongY = document.getElementById("agree").checked;

    if (hoTen == "") {
        alert("Vui lòng nhập họ và tên");
        document.getElementById("fullname").focus();
        return;
    }

    if (email == "") {
        alert("Vui lòng nhập email");
        document.getElementById("email").focus();
        return;
    }

    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        alert("Email chưa đúng định dạng");
        document.getElementById("email").focus();
        return;
    }

    if (tenDangNhap == "") {
        alert("Vui lòng nhập tên đăng nhập");
        document.getElementById("username").focus();
        return;
    }

    if (matKhau.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
        document.getElementById("password").focus();
        return;
    }

    if (matKhau != nhapLaiMatKhau) {
        alert("Mật khẩu nhập lại không đúng");
        document.getElementById("confirmPassword").focus();
        return;
    }

    if (dongY == false) {
        alert("Bạn phải đồng ý với điều khoản sử dụng");
        return;
    }

    if (tenDangNhapDaTonTai(tenDangNhap) == true) {
        alert("Tên đăng nhập đã tồn tại");
        document.getElementById("username").focus();
        return;
    }

    var taiKhoan = {
        hoTen: hoTen,
        email: email,
        tenDangNhap: tenDangNhap,
        matKhau: matKhau
    };

    luuTaiKhoan(taiKhoan);
    alert("Đăng ký thành công");
    window.location.href = "login.html";
}

//==============================
// Kiểm tra tên đăng nhập
//==============================
function tenDangNhapDaTonTai(tenDangNhap) {
    var soLuong = Number(localStorage.getItem("soLuongTaiKhoan"));
    var i;

    if (soLuong == 0) {
        return false;
    }

    for (i = 0; i < soLuong; i++) {
        if (localStorage.getItem("taiKhoan_" + i + "_tenDangNhap") == tenDangNhap) {
            return true;
        }
    }

    return false;
}

//==============================
// Lưu tài khoản vào localStorage
//==============================
function luuTaiKhoan(taiKhoan) {
    var soLuong = Number(localStorage.getItem("soLuongTaiKhoan"));

    localStorage.setItem("taiKhoan_" + soLuong + "_hoTen", taiKhoan.hoTen);
    localStorage.setItem("taiKhoan_" + soLuong + "_email", taiKhoan.email);
    localStorage.setItem("taiKhoan_" + soLuong + "_tenDangNhap", taiKhoan.tenDangNhap);
    localStorage.setItem("taiKhoan_" + soLuong + "_matKhau", taiKhoan.matKhau);
    localStorage.setItem("soLuongTaiKhoan", soLuong + 1);
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
