using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class NhaSanXuat_Info
    {
        #region BienThanhVien
        Guid _MaNhaSanXuat;
        String _TenNhaSanXuat;



        #endregion
        #region ThuocTinh
        public Guid MaNhaSanXuat
        {
            get
            {
                return _MaNhaSanXuat;
            }

            set
            {
                _MaNhaSanXuat = value;
            }
        }

        public string TenNhaSanXuat
        {
            get
            {
                return _TenNhaSanXuat;
            }

            set
            {
                _TenNhaSanXuat = value;
            }
        }

        #endregion
        #region HamKhoiTao
        public NhaSanXuat_Info() { }
        public NhaSanXuat_Info(Guid MaNhaSanXuat, string TenNhaSanXuat)
        {
            _MaNhaSanXuat = MaNhaSanXuat;
            _TenNhaSanXuat = TenNhaSanXuat;
        }

      
        #endregion
        #region PhuongThuc
        #endregion
    }
}
