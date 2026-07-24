window.onload = function () {
    hienThiTongTien();
    capNhatSoLuong();
    ganSuKienThanhToan();
    ganSuKienHienQR();
    ganSuKienDatHang();
};

// Hiển thị tổng tiền của đơn hàng
function hienThiTongTien() {
    var tongTien = Number(localStorage.getItem("tienPhaiTra"));

    if (tongTien == 0) {
        alert("Giỏ hàng đang trống");
        window.location.href = "giohang.html";
        return;
    }

    document.getElementById("tongTienDonHang").innerHTML = dinhDangTien(tongTien);
    document.getElementById("soTienThanhToan").innerHTML = dinhDangTien(tongTien);
}

// Gắn sự kiện chọn phương thức thanh toán
function ganSuKienThanhToan() {
    var nutCOD = document.getElementById("thanhToanCOD");
    var nutChuyenKhoan = document.getElementById("thanhToanChuyenKhoan");

    nutCOD.addEventListener("click", anVungChuyenKhoan);
    nutChuyenKhoan.addEventListener("click", hienVungChuyenKhoan);
}

// Hiện vùng chuyển khoản
function hienVungChuyenKhoan() {
    document.getElementById("vungChuyenKhoan").className = "qr-container";
}

// Ẩn vùng chuyển khoản
function anVungChuyenKhoan() {
    document.getElementById("vungChuyenKhoan").className = "qr-container hidden";
    document.getElementById("anhQR").className = "qr-image hidden";
}

// Gắn sự kiện cho nút hiện mã QR
function ganSuKienHienQR() {
    var nutHienQR = document.getElementById("nutHienQR");
    nutHienQR.addEventListener("click", hienAnhQR);
}

// Hiển thị mã QR
function hienAnhQR() {
    document.getElementById("anhQR").className = "qr-image";
}

// Gắn sự kiện gửi biểu mẫu
function ganSuKienDatHang() {
    var bieuMau = document.getElementById("frmDatHang");
    bieuMau.addEventListener("submit", datHang);
}

// Kiểm tra dữ liệu và xác nhận đặt hàng
function datHang(suKien) {
    suKien.preventDefault();

    var hoTen = document.getElementById("hoten").value.trim();
    var dienThoai = document.getElementById("dienthoai").value.trim();
    var diaChi = document.getElementById("diachi").value.trim();

    if (hoTen == "") {
        alert("Vui lòng nhập họ và tên");
        document.getElementById("hoten").focus();
        return;
    }

    if (dienThoai == "") {
        alert("Vui lòng nhập số điện thoại");
        document.getElementById("dienthoai").focus();
        return;
    }

    if (kiemTraSoDienThoai(dienThoai) == false) {
        alert("Số điện thoại phải gồm từ 9 đến 11 chữ số");
        document.getElementById("dienthoai").focus();
        return;
    }

    if (diaChi == "") {
        alert("Vui lòng nhập địa chỉ nhận hàng");
        document.getElementById("diachi").focus();
        return;
    }

    xoaDuLieuGioHang();
    document.getElementById("formDatHang").className = "hidden";
    document.getElementById("thanhCong").className = "success-box";
    capNhatSoLuong();
}

// Kiểm tra số điện thoại chỉ gồm chữ số
function kiemTraSoDienThoai(dienThoai) {
    if (dienThoai.length < 9 || dienThoai.length > 11) {
        return false;
    }

    for (var i = 0; i < dienThoai.length; i++) {
        var kyTu = dienThoai.charAt(i);

        if (kyTu < "0" || kyTu > "9") {
            return false;
        }
    }

    return true;
}

// Xóa dữ liệu giỏ hàng sau khi đặt thành công
function xoaDuLieuGioHang() {
    var chuoiMa = localStorage.getItem("danhSachMa");
    var danhSachMa = [];

    if (chuoiMa != null && chuoiMa != "") {
        danhSachMa = chuoiMa.split("|");
    }

    for (var i = 0; i < danhSachMa.length; i++) {
        var maSach = danhSachMa[i];
        localStorage.removeItem("ten_" + maSach);
        localStorage.removeItem("gia_" + maSach);
        localStorage.removeItem("hinh_" + maSach);
        localStorage.removeItem("soLuong_" + maSach);
    }

    localStorage.removeItem("danhSachMa");
    localStorage.removeItem("tienPhaiTra");
}

// Cập nhật số lượng trên biểu tượng giỏ hàng
function capNhatSoLuong() {
    var chuoiMa = localStorage.getItem("danhSachMa");
    var danhSachMa = [];
    var tongSoLuong = 0;

    if (chuoiMa != null && chuoiMa != "") {
        danhSachMa = chuoiMa.split("|");
    }

    for (var i = 0; i < danhSachMa.length; i++) {
        tongSoLuong = tongSoLuong + Number(localStorage.getItem("soLuong_" + danhSachMa[i]));
    }

    var nhanSoLuong = document.getElementsByClassName("no-ordered-items");

    for (var j = 0; j < nhanSoLuong.length; j++) {
        nhanSoLuong[j].innerHTML = tongSoLuong;
    }
}

// Định dạng số tiền bằng dấu chấm
function dinhDangTien(soTien) {
    var chuoiTien = String(soTien);
    var ketQua = "";
    var dem = 0;

    for (var i = chuoiTien.length - 1; i >= 0; i--) {
        ketQua = chuoiTien.charAt(i) + ketQua;
        dem++;

        if (dem == 3 && i != 0) {
            ketQua = "." + ketQua;
            dem = 0;
        }
    }

    return ketQua;
}
