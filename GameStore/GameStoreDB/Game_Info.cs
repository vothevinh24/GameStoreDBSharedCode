using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public class Game_Info
    {

        #region BienThanhVien
        Guid _MaGame, _MaNhaPhatHanh, _MaNhaSanXuat;
        String _TenGame, _Trailer, _AnhDaiDien, _MoTa;
        int _DanhGia, _SoLuongTon;
        Decimal _DonGia;
        float _GiamGia;
        DateTime _NgayPhatHanh;




        #endregion
        #region ThuocTinh
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

        public string TenGame
        {
            get
            {
                return _TenGame;
            }

            set
            {
                _TenGame = value;
            }
        }

        public string Trailer
        {
            get
            {
                return _Trailer;
            }

            set
            {
                _Trailer = value;
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

        public string MoTa
        {
            get
            {
                return _MoTa;
            }

            set
            {
                _MoTa = value;
            }
        }

        public int DanhGia
        {
            get
            {
                return _DanhGia;
            }

            set
            {
                _DanhGia = value;
            }
        }

        public int SoLuongTon
        {
            get
            {
                return _SoLuongTon;
            }

            set
            {
                _SoLuongTon = value;
            }
        }

        public decimal DonGia
        {
            get
            {
                return _DonGia;
            }

            set
            {
                _DonGia = value;
            }
        }

        public float GiamGia
        {
            get
            {
                return _GiamGia;
            }

            set
            {
                _GiamGia = value;
            }
        }

        public DateTime NgayPhatHanh
        {
            get
            {
                return _NgayPhatHanh;
            }

            set
            {
                _NgayPhatHanh = value;
            }
        }
        #endregion
        #region HamKhoiTao
        public Game_Info() { }
        public Game_Info(Guid MaGame, Guid MaNhaPhatHanh,  Guid MaNhaSanXuat, string TenGame, string Trailer, string AnhDaiDien, string MoTa, int DanhGia, int SoLuongTon, decimal DonGia, float GiamGia, DateTime NgayPhatHanh)
        {
            _MaGame = MaGame;
            _MaNhaPhatHanh = MaNhaPhatHanh;
          
            _MaNhaSanXuat = MaNhaSanXuat;
            _TenGame = TenGame;
            _Trailer = Trailer;
            _AnhDaiDien = AnhDaiDien;
            _MoTa = MoTa;
            _DanhGia = DanhGia;
            _SoLuongTon = SoLuongTon;
            _DonGia = DonGia;
            _GiamGia = GiamGia;
            _NgayPhatHanh = NgayPhatHanh;
        }

     
        #endregion
        #region PhuongThuc
        #endregion
    }
}
