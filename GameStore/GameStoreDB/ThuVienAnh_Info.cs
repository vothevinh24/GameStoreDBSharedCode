using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class ThuVienAnh_Info
    {
        #region BienThanhVien
        Guid _MaHinhAnh, _MaGame;
        String _TenHinhAnh;
        DateTime _NgayDang;




        #endregion
        #region ThuocTinh
        public Guid MaHinhAnh
        {
            get
            {
                return _MaHinhAnh;
            }

            set
            {
                _MaHinhAnh = value;
            }
        }

        public Guid MaGame
        {
            get
            {
                return _MaGame;
            }

            set
            {
                _MaGame = value;
            }
        }

        public string TenHinhAnh
        {
            get
            {
                return _TenHinhAnh;
            }

            set
            {
                _TenHinhAnh = value;
            }
        }

        public DateTime NgayDang
        {
            get
            {
                return _NgayDang;
            }

            set
            {
                _NgayDang = value;
            }
        }
        #endregion
        #region HamKhoiTao
        public ThuVienAnh_Info() { }
        public ThuVienAnh_Info(Guid MaHinhAnh, Guid MaGame, string TenHinhAnh, DateTime NgayDang)
        {
            _MaHinhAnh = MaHinhAnh;
            _MaGame = MaGame;
            _TenHinhAnh = TenHinhAnh;
            _NgayDang = NgayDang;
        }

      
        #endregion
        #region PhuongThuc
        #endregion
    }
}
