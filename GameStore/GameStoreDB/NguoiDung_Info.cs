using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class NguoiDung_Info
    {
        #region BienThanhVien
        Guid _MaNguoiDung;
        String _TenNguoiDung,_TaiKhoan, _MatKhau, _DiaChi, _AnhDaiDien, _Tinh;
        DateTime _NgaySinh, _NgayThamGia;



        #endregion
        #region ThuocTinh
        public Guid MaNguoiDung
        {
            get
            {
                return _MaNguoiDung;
            }

            set
            {
                _MaNguoiDung = value;
            }
        }

        public string TenNguoiDung
        {
            get
            {
                return _TenNguoiDung;
            }

            set
            {
                _TenNguoiDung = value;
            }
        }

        public string TaiKhoan
        {
            get
            {
                return _TaiKhoan;
            }

            set
            {
                _TaiKhoan = value;
            }
        }

        public string MatKhau
        {
            get
            {
                return _MatKhau;
            }

            set
            {
                _MatKhau = value;
            }
        }

        public string DiaChi
        {
            get
            {
                return _DiaChi;
            }

            set
            {
                _DiaChi = value;
            }
        }

        public string AnhDaiDien
        {
            get
            {
                return _AnhDaiDien;
            }

            set
            {
                _AnhDaiDien = value;
            }
        }

        public string Tinh
        {
            get
            {
                return _Tinh;
            }

            set
            {
                _Tinh = value;
            }
        }

        public DateTime NgaySinh
        {
            get
            {
                return _NgaySinh;
            }

            set
            {
                _NgaySinh = value;
            }
        }

        public DateTime NgayThamGia
        {
            get
            {
                return _NgayThamGia;
            }

            set
            {
                _NgayThamGia = value;
            }
        }

        #endregion
        #region HamKhoiTao
        public NguoiDung_Info() { }
        public NguoiDung_Info(Guid MaNguoiDung, string TenNguoiDung, string TaiKhoan, string MatKhau, string DiaChi, string AnhDaiDien, string Tinh, DateTime NgaySinh, DateTime NgayThamGia)
        {
            _MaNguoiDung = MaNguoiDung;
            _TenNguoiDung = TenNguoiDung;
            _TaiKhoan = TaiKhoan;
            _MatKhau = MatKhau;
            _DiaChi = DiaChi;
            _AnhDaiDien = AnhDaiDien;
            _Tinh = Tinh;
            _NgaySinh = NgaySinh;
            _NgayThamGia = NgayThamGia;
        }

     
        #endregion
        #region PhuongThuc
        #endregion
    }
}
