using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class NhanVien_Info
    {
        #region BienThanhVien
        Guid _MaNhanVien;
        String _TenNhanVien, _TaiKhoan, _MatKhau, _AnhDaiDien,_ChucVu;
        DateTime _NgayThamGia;
        #endregion
        #region ThuocTinh
        public Guid MaNhanVien
        {
            get
            {
                return _MaNhanVien;
            }

            set
            {
                _MaNhanVien = value;
            }
        }

        public string TenNhanVien
        {
            get
            {
                return _TenNhanVien;
            }

            set
            {
                _TenNhanVien = value;
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

        public string ChucVu
        {
            get
            {
                return _ChucVu;
            }

            set
            {
                _ChucVu = value;
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
        public NhanVien_Info() { }
        public NhanVien_Info(Guid MaNhanVien, string TenNhanVien, string TaiKhoan, string MatKhau, string AnhDaiDien, string ChucVu, DateTime NgayThamGia)
        {
            _MaNhanVien = MaNhanVien;
            _TenNhanVien = TenNhanVien;
            _TaiKhoan = TaiKhoan;
            _MatKhau = MatKhau;
            _AnhDaiDien = AnhDaiDien;
            _ChucVu = ChucVu;
            _NgayThamGia = NgayThamGia;
        }

    
        #endregion
        #region PhuongThuc
        #endregion
    }
}
