var danhSachMa = [];

window.onload = function () {
    docDanhSachMa();
    hienThiGioHang();
    ganSuKienNutXoaTatCa();
    ganSuKienDatHang();
};

// Đọc danh sách mã sách từ Local Storage
function docDanhSachMa() {
    var chuoiMa = localStorage.getItem("danhSachMa");

    if (chuoiMa == null || chuoiMa == "") {
        danhSachMa = [];
    } else {
        danhSachMa = chuoiMa.split("|");
    }
}

// Hiển thị các sản phẩm trong giỏ hàng
function hienThiGioHang() {
    var thanBang = document.getElementById("danhSachGioHang");
    var tongTien = 0;

    thanBang.innerHTML = "";

    if (danhSachMa.length == 0) {
        var dongTrong = document.createElement("tr");
        var oTrong = document.createElement("td");

        oTrong.setAttribute("colspan", "6");
        oTrong.className = "empty-cart";
        oTrong.innerHTML = "Giỏ hàng đang trống";

        dongTrong.appendChild(oTrong);
        thanBang.appendChild(dongTrong);

        document.getElementById("nhanTongTien").innerHTML = "0";
        capNhatSoLuong();
        return;
    }

    for (var i = 0; i < danhSachMa.length; i++) {
        var maSach = danhSachMa[i];
        var sanPham = docSanPham(maSach);
        var thanhTien = sanPham.gia * sanPham.soLuong;

        tongTien = tongTien + thanhTien;
        taoDongSanPham(thanBang, sanPham, thanhTien);
    }

    document.getElementById("nhanTongTien").innerHTML = dinhDangTien(tongTien);
    localStorage.setItem("tienPhaiTra", tongTien);
    capNhatSoLuong();
}

// Đọc thông tin một sản phẩm
function docSanPham(maSach) {
    var sanPham = {
        ma: maSach,
        ten: localStorage.getItem("ten_" + maSach),
        gia: Number(localStorage.getItem("gia_" + maSach)),
        hinh: localStorage.getItem("hinh_" + maSach),
        soLuong: Number(localStorage.getItem("soLuong_" + maSach))
    };

    return sanPham;
}

// Tạo một dòng sản phẩm trong bảng
function taoDongSanPham(thanBang, sanPham, thanhTien) {
    var dong = document.createElement("tr");

    var oHinh = document.createElement("td");
    var hinh = document.createElement("img");
    hinh.src = sanPham.hinh;
    hinh.alt = sanPham.ten;
    hinh.className = "cart-image";
    oHinh.appendChild(hinh);

    var oTen = document.createElement("td");
    oTen.innerHTML = sanPham.ten;

    var oGia = document.createElement("td");
    oGia.innerHTML = dinhDangTien(sanPham.gia) + " đ";

    var oSoLuong = document.createElement("td");
    var nutGiam = taoNutSoLuong("-", sanPham.ma, giamSoLuong);
    var nhanSoLuong = document.createElement("span");
    var nutTang = taoNutSoLuong("+", sanPham.ma, tangSoLuong);

    nhanSoLuong.className = "quantity-number";
    nhanSoLuong.innerHTML = sanPham.soLuong;
    oSoLuong.appendChild(nutGiam);
    oSoLuong.appendChild(nhanSoLuong);
    oSoLuong.appendChild(nutTang);

    var oThanhTien = document.createElement("td");
    oThanhTien.innerHTML = dinhDangTien(thanhTien) + " đ";

    var oThaoTac = document.createElement("td");
    var nutXoa = document.createElement("button");
    nutXoa.type = "button";
    nutXoa.className = "btn-delete";
    nutXoa.innerHTML = "Xóa";
    nutXoa.setAttribute("data-ma", sanPham.ma);
    nutXoa.addEventListener("click", xoaSanPham);
    oThaoTac.appendChild(nutXoa);

    dong.appendChild(oHinh);
    dong.appendChild(oTen);
    dong.appendChild(oGia);
    dong.appendChild(oSoLuong);
    dong.appendChild(oThanhTien);
    dong.appendChild(oThaoTac);

    thanBang.appendChild(dong);
}

// Tạo nút tăng hoặc giảm số lượng
function taoNutSoLuong(noiDung, maSach, hamXuLy) {
    var nut = document.createElement("button");

    nut.type = "button";
    nut.className = "quantity-button";
    nut.innerHTML = noiDung;
    nut.setAttribute("data-ma", maSach);
    nut.addEventListener("click", hamXuLy);

    return nut;
}

// Tăng số lượng một sản phẩm
function tangSoLuong() {
    var maSach = this.getAttribute("data-ma");
    var soLuong = Number(localStorage.getItem("soLuong_" + maSach));

    localStorage.setItem("soLuong_" + maSach, soLuong + 1);
    hienThiGioHang();
}

// Giảm số lượng một sản phẩm
function giamSoLuong() {
    var maSach = this.getAttribute("data-ma");
    var soLuong = Number(localStorage.getItem("soLuong_" + maSach));

    if (soLuong > 1) {
        localStorage.setItem("soLuong_" + maSach, soLuong - 1);
    } else {
        xoaTheoMa(maSach);
    }

    hienThiGioHang();
}

// Xóa một sản phẩm
function xoaSanPham() {
    var maSach = this.getAttribute("data-ma");
    xoaTheoMa(maSach);
    hienThiGioHang();
}

// Xóa dữ liệu sản phẩm theo mã
function xoaTheoMa(maSach) {
    var viTri = timViTriMa(maSach);

    if (viTri != -1) {
        danhSachMa.splice(viTri, 1);
    }

    localStorage.removeItem("ten_" + maSach);
    localStorage.removeItem("gia_" + maSach);
    localStorage.removeItem("hinh_" + maSach);
    localStorage.removeItem("soLuong_" + maSach);
    localStorage.setItem("danhSachMa", danhSachMa.join("|"));
}

// Tìm vị trí mã sách trong mảng
function timViTriMa(maSach) {
    for (var i = 0; i < danhSachMa.length; i++) {
        if (danhSachMa[i] == maSach) {
            return i;
        }
    }

    return -1;
}

// Gắn sự kiện cho nút xóa tất cả
function ganSuKienNutXoaTatCa() {
    var nutXoaTatCa = document.getElementById("nutXoaTatCa");
    nutXoaTatCa.addEventListener("click", xoaTatCa);
}

// Xóa toàn bộ giỏ hàng
function xoaTatCa() {
    for (var i = 0; i < danhSachMa.length; i++) {
        var maSach = danhSachMa[i];
        localStorage.removeItem("ten_" + maSach);
        localStorage.removeItem("gia_" + maSach);
        localStorage.removeItem("hinh_" + maSach);
        localStorage.removeItem("soLuong_" + maSach);
    }

    danhSachMa = [];
    localStorage.removeItem("danhSachMa");
    localStorage.removeItem("tienPhaiTra");
    hienThiGioHang();
}

// Cập nhật số lượng trên biểu tượng giỏ hàng
function capNhatSoLuong() {
    var tongSoLuong = 0;

    for (var i = 0; i < danhSachMa.length; i++) {
        tongSoLuong = tongSoLuong + Number(localStorage.getItem("soLuong_" + danhSachMa[i]));
    }

    var nhanSoLuong = document.getElementsByClassName("no-ordered-items");

    for (var j = 0; j < nhanSoLuong.length; j++) {
        nhanSoLuong[j].innerHTML = tongSoLuong;
    }
}

// Lưu tổng tiền trước khi sang trang đặt hàng
function ganSuKienDatHang() {
    var nutDatHang = document.getElementById("nutDatHang");

    nutDatHang.addEventListener("click", function (suKien) {
        if (danhSachMa.length == 0) {
            suKien.preventDefault();
            alert("Giỏ hàng đang trống");
        }
    });
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
