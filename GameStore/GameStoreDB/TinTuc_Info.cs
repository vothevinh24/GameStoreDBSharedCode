using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class TinTuc_Info
    {
        #region BienThanhVien
        Guid _MaTinTuc, _MaGame;
        String _TenTinTuc, _NoiDung, _HinhAnhMinhHoa;
        DateTime _NgayDang;




        #endregion
        #region ThuocTinh
        public Guid MaTinTuc
        {
            get
            {
                return _MaTinTuc;
            }

            set
            {
                _MaTinTuc = value;
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

        public string TenTinTuc
        {
            get
            {
                return _TenTinTuc;
            }

            set
            {
                _TenTinTuc = value;
            }
        }

        public string NoiDung
        {
            get
            {
                return _NoiDung;
            }

            set
            {
                _NoiDung = value;
            }
        }

        public string HinhAnhMinhHoa
        {
            get
            {
                return _HinhAnhMinhHoa;
            }

            set
            {
                _HinhAnhMinhHoa = value;
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
        public TinTuc_Info() { }
        public TinTuc_Info(Guid MaTinTuc, Guid MaGame, string TenTinTuc, string NoiDung, string HinhAnhMinhHoa, DateTime NgayDang)
        {
            _MaTinTuc = MaTinTuc;
            _MaGame = MaGame;
            _TenTinTuc = TenTinTuc;
            _NoiDung = NoiDung;
            _HinhAnhMinhHoa = HinhAnhMinhHoa;
            _NgayDang = NgayDang;
        }

      
        #endregion
        #region PhuongThuc
        #endregion
    }
}
