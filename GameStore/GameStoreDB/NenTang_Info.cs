using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class NenTang_Info
    {
        #region BienThanhVien
        Guid _MaNenTang;
        String _TenNenTang;

        #endregion
        #region ThuocTinh
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

        public string TenNenTang
        {
            get
            {
                return _TenNenTang;
            }

            set
            {
                _TenNenTang = value;
            }
        }
        #endregion
        #region HamKhoiTao
        public NenTang_Info() { }
        public NenTang_Info(Guid MaNenTang, string TenNenTang)
        {
            _MaNenTang = MaNenTang;
            _TenNenTang = TenNenTang;
        }

      

        #endregion
        #region PhuongThuc
        #endregion
    }
}
