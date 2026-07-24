// Mảng tạm dùng để chứa các mã sách đã có trong giỏ hàng
var danhSachMa = [];

window.onload = function () {
    docDanhSachMa();
    ganSuKienThemGioHang();
    ganSuKienTimKiem();
    locSachTheoTheLoai();
    capNhatSoLuong();
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

// Gắn sự kiện cho các nút thêm vào giỏ hàng
function ganSuKienThemGioHang() {
    var nutThem = document.getElementsByClassName("add-cart");

    for (var i = 0; i < nutThem.length; i++) {
        nutThem[i].addEventListener("click", themVaoGioHang);
    }
}

// Thêm một sách vào giỏ hàng
function themVaoGioHang() {
    var sach = this.parentNode;

    var sanPham = {
        ma: sach.getElementsByClassName("item-id")[0].innerHTML,
        ten: sach.getElementsByClassName("item-title")[0].innerHTML,
        gia: Number(sach.getElementsByClassName("item-price")[0].innerHTML),
        hinh: sach.getElementsByClassName("item-image")[0].getAttribute("src")
    };

    var viTri = timViTriMa(sanPham.ma);

    if (viTri == -1) {
        danhSachMa.push(sanPham.ma);
        localStorage.setItem("danhSachMa", danhSachMa.join("|"));
        localStorage.setItem("ten_" + sanPham.ma, sanPham.ten);
        localStorage.setItem("gia_" + sanPham.ma, sanPham.gia);
        localStorage.setItem("hinh_" + sanPham.ma, sanPham.hinh);
        localStorage.setItem("soLuong_" + sanPham.ma, 1);
    } else {
        var soLuong = Number(localStorage.getItem("soLuong_" + sanPham.ma));
        localStorage.setItem("soLuong_" + sanPham.ma, soLuong + 1);
    }

    capNhatSoLuong();
    alert("Đã thêm " + sanPham.ten + " vào giỏ hàng");
}

// Tìm vị trí của mã sách trong mảng
function timViTriMa(maSach) {
    for (var i = 0; i < danhSachMa.length; i++) {
        if (danhSachMa[i] == maSach) {
            return i;
        }
    }

    return -1;
}

// Cập nhật tổng số lượng trên biểu tượng giỏ hàng
function capNhatSoLuong() {
    var tongSoLuong = 0;

    for (var i = 0; i < danhSachMa.length; i++) {
        var soLuong = Number(localStorage.getItem("soLuong_" + danhSachMa[i]));
        tongSoLuong = tongSoLuong + soLuong;
    }

    var nhanSoLuong = document.getElementsByClassName("no-ordered-items");

    for (var j = 0; j < nhanSoLuong.length; j++) {
        nhanSoLuong[j].innerHTML = tongSoLuong;
    }
}

// Lọc sách theo thể loại trên đường dẫn
function locSachTheoTheLoai() {
    var thamSo = new URLSearchParams(window.location.search);
    var theLoai = thamSo.get("category");

    if (theLoai == null) {
        return;
    }

    var danhSachSach = document.getElementsByClassName("item");

    for (var i = 0; i < danhSachSach.length; i++) {
        if (danhSachSach[i].getAttribute("data-category") == theLoai) {
            danhSachSach[i].style.display = "flex";
        } else {
            danhSachSach[i].style.display = "none";
        }
    }
}

// Gắn sự kiện tìm kiếm
function ganSuKienTimKiem() {
    var nutTimKiem = document.getElementById("nutTimKiem");
    var oTimKiem = document.getElementById("oTimKiem");

    if (nutTimKiem != null) {
        nutTimKiem.addEventListener("click", timKiemSach);
    }

    if (oTimKiem != null) {
        oTimKiem.addEventListener("keyup", function (suKien) {
            if (suKien.key == "Enter") {
                timKiemSach();
            }
        });
    }
}

// Tìm sách theo tên
function timKiemSach() {
    var tuKhoa = document.getElementById("oTimKiem").value.toLowerCase().trim();
    var danhSachSach = document.getElementsByClassName("item");

    for (var i = 0; i < danhSachSach.length; i++) {
        var tenSach = danhSachSach[i].getElementsByClassName("item-title")[0].innerHTML.toLowerCase();

        if (tenSach.indexOf(tuKhoa) != -1) {
            danhSachSach[i].style.display = "flex";
        } else {
            danhSachSach[i].style.display = "none";
        }
    }
}
