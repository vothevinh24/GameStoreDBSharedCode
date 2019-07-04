using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class PhanLoaiNenTang_Info
    {
        #region BienThanhVien
        Guid _MaPhanLoaiNenTang, _MaGame, _MaNenTang;
        #endregion
        #region ThuocTinh
        public Guid MaPhanLoaiNenTang
        {
            get
            {
                return _MaPhanLoaiNenTang;
            }

            set
            {
                _MaPhanLoaiNenTang = value;
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

        public Guid MaNenTang
        {
            get
            {
                return _MaNenTang;
            }

            set
            {
                _MaNenTang = value;
            }
        }

        #endregion
        #region HamKhoiTao
        public PhanLoaiNenTang_Info() { }
        public PhanLoaiNenTang_Info(Guid MaPhanLoaiNenTang, Guid MaGame, Guid MaNenTang)
        {
            _MaPhanLoaiNenTang = MaPhanLoaiNenTang;
            _MaGame = MaGame;
            _MaNenTang = MaNenTang;
        }

      

        #endregion
        #region PhuongThuc
        #endregion
    }
}
