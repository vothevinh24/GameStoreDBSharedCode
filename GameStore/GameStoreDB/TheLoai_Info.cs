using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class TheLoai_Info
    {
        #region BienThanhVien
        Guid _MaTheLoai;
        String _TenTheLoai;



        #endregion
        #region ThuocTinh
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

        public string TenTheLoai
        {
            get
            {
                return _TenTheLoai;
            }

            set
            {
                _TenTheLoai = value;
            }
        }

        #endregion
        #region HamKhoiTao
        public TheLoai_Info() { }
        public TheLoai_Info(Guid MaTheLoai, string TenTheLoai)
        {
            _MaTheLoai = MaTheLoai;
            _TenTheLoai = TenTheLoai;
        }

      
        #endregion
        #region PhuongThuc
        #endregion
    }
}
