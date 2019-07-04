using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class ThuVienVideo_Info
    {
        #region BienThanhVien
        Guid _MaVideo, _MaGame;
        String _TenVideo;
        DateTime _NgayDang;




        #endregion
        #region ThuocTinh
        public Guid MaVideo
        {
            get
            {
                return _MaVideo;
            }

            set
            {
                _MaVideo = value;
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

        public string TenVideo
        {
            get
            {
                return _TenVideo;
            }

            set
            {
                _TenVideo = value;
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
        public ThuVienVideo_Info() { }
        public ThuVienVideo_Info(Guid MaVideo, Guid MaGame, string TenVideo, DateTime NgayDang)
        {
            _MaVideo = MaVideo;
            _MaGame = MaGame;
            _TenVideo = TenVideo;
            _NgayDang = NgayDang;
        }

       
        #endregion
        #region PhuongThuc
        #endregion
    }
}
