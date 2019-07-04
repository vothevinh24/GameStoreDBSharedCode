using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class PhanLoaiTheLoai_Info
    {



        #region BienThanhVien
        Guid _MaPhanLoaiTheLoai, _MaGame, _MaTheLoai;


        #endregion
        #region ThuocTinh
        public Guid MaPhanLoaiTheLoai
        {
            get
            {
                return _MaPhanLoaiTheLoai;
            }

            set
            {
                _MaPhanLoaiTheLoai = value;
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

        public Guid MaTheLoai
        {
            get
            {
                return _MaTheLoai;
            }

            set
            {
                _MaTheLoai = value;
            }
        }
        #endregion
        #region HamKhoiTao
        public PhanLoaiTheLoai_Info() { }
        public PhanLoaiTheLoai_Info(Guid MaPhanLoaiTheLoai, Guid MaGame, Guid MaTheLoai)
        {
            _MaPhanLoaiTheLoai = MaPhanLoaiTheLoai;
            _MaGame = MaGame;
            _MaTheLoai = MaTheLoai;
        }

      
        #endregion
        #region PhuongThuc
        #endregion
    }
}
