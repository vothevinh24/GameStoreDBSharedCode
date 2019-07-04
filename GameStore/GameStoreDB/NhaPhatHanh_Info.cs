using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class NhaPhatHanh_Info
    {
        #region BienThanhVien
        Guid _MaNhaPhatHanh;
        String _TenNhaPhatHanh;




        #endregion
        #region ThuocTinh
        public Guid MaNhaPhatHanh
        {
            get
            {
                return _MaNhaPhatHanh;
            }

            set
            {
                _MaNhaPhatHanh = value;
            }
        }

        public string TenNhaPhatHanh
        {
            get
            {
                return _TenNhaPhatHanh;
            }

            set
            {
                _TenNhaPhatHanh = value;
            }
        }
        #endregion
        #region HamKhoiTao
        public NhaPhatHanh_Info() { }
        public NhaPhatHanh_Info(Guid MaNhaPhatHanh, string TenNhaPhatHanh)
        {
            _MaNhaPhatHanh = MaNhaPhatHanh;
            _TenNhaPhatHanh = TenNhaPhatHanh;
        }

    
        #endregion
        #region PhuongThuc
        #endregion
    }
}
