using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
namespace GameStoreDB
{
    public static class Game_Data
    {
        public static Game_Info LayGameChiTiet(string maGame)
        {
            Game_Info item = new Game_Info();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from game where magame = @magame", System.Data.CommandType.Text);
            db.AddParameter("@magame", maGame);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            item.MaGame = Guid.Parse(t.Rows[0]["MaGame"].ToString());
            item.TenGame = t.Rows[0]["TenGame"].ToString();
            item.DanhGia = int.Parse(t.Rows[0]["DanhGia"].ToString());
            item.DonGia = Decimal.Parse(t.Rows[0]["DonGia"].ToString());
            item.GiamGia = float.Parse(t.Rows[0]["GiamGia"].ToString());
            item.NgayPhatHanh = DateTime.Parse(t.Rows[0]["NgayPhatHanh"].ToString());
            item.SoLuongTon = int.Parse(t.Rows[0]["SoLuongTon"].ToString());
            item.Trailer = t.Rows[0]["Trailer"].ToString();
            item.AnhDaiDien = t.Rows[0]["AnhDaiDien"].ToString();
            item.MoTa = t.Rows[0]["MoTa"].ToString();
            item.MaNhaPhatHanh = Guid.Parse(t.Rows[0]["MaNhaPhatHanh"].ToString());
            item.MaNhaSanXuat = Guid.Parse(t.Rows[0]["MaNhaSanXuat"].ToString());
            return item;
        }
        public static List<Game_Info> DanhSachGameTuyChon (int trang = 1, string tuKhoa = "", string ma = "", int soGame = 3)
        {
            List<Game_Info> items = new List<Game_Info>();
            DBHelp test = new DBHelp();
            DBHelp db = new DBHelp();
            System.Data.DataTable check = new System.Data.DataTable();
            string dieuKien = " Where 1=1";
            if (tuKhoa != "")
            {
                dieuKien += " and Tengame Like @tukhoa";
            }
            if (ma != "")
            {
                    List<string> maGameTheoTheLoai = PhanLoaiTheLoai_Data.DanhSachGame(ma);
                    dieuKien += " and ( magame = @magame0";
                    for (int i = 1; i < maGameTheoTheLoai.Count; i++)
                    {
                        dieuKien += " or magame = @magame" + i;
                    }
                    dieuKien += " ) ";
            }

            db.SetCommandText("SELECT * FROM (SELECT *, ROW_NUMBER() OVER(ORDER BY Ngayphathanh desc ) AS RowNum  FROM dbo.game " + dieuKien + " ) AS t WHERE t.RowNum BETWEEN (@trang-1)*@sogame+1 AND @trang*@sogame", System.Data.CommandType.Text);
            db.AddParameter("@trang", trang);
            db.AddParameter("@sogame", soGame);

            if (tuKhoa != "")
            {
                db.AddParameter("@tukhoa", "%" + tuKhoa + "%");
            }
            if (ma != "")
            {
               
                    List<string> maGameTheoTheLoai = PhanLoaiTheLoai_Data.DanhSachGame(ma);
                    for (int i = 0; i < maGameTheoTheLoai.Count; i++)
                    {
                        db.AddParameter(("@magame" + i).ToString(), maGameTheoTheLoai[i].ToString());
                    }
               
            }

            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            if (t.Rows.Count > 0)
            {
                for (int i = 0; i < t.Rows.Count; i++)
                {
                    Game_Info item = new Game_Info();
                    item.MaGame = Guid.Parse(t.Rows[i]["MaGame"].ToString());
                    item.TenGame = t.Rows[i]["TenGame"].ToString();
                    item.DanhGia = int.Parse(t.Rows[i]["DanhGia"].ToString());
                    item.DonGia = Decimal.Parse(t.Rows[i]["DonGia"].ToString());
                    item.GiamGia = float.Parse(t.Rows[i]["GiamGia"].ToString());
                    item.NgayPhatHanh = DateTime.Parse(t.Rows[i]["NgayPhatHanh"].ToString());
                    item.SoLuongTon = int.Parse(t.Rows[i]["SoLuongTon"].ToString());
                    item.Trailer = t.Rows[i]["Trailer"].ToString();
                    item.AnhDaiDien = t.Rows[i]["AnhDaiDien"].ToString();
                    item.MoTa = t.Rows[i]["MoTa"].ToString();
                    item.MaNhaPhatHanh = Guid.Parse(t.Rows[i]["MaNhaPhatHanh"].ToString());
                    item.MaNhaSanXuat = Guid.Parse(t.Rows[i]["MaNhaSanXuat"].ToString());
                    items.Add(item);
                }

            }
            return items;


        }
        public static int TongSoGameTuyChon(string tuKhoa = "", string ma = "")
        {
            int tongSo = 0;
            List<Game_Info> items = new List<Game_Info>();
            DBHelp test = new DBHelp();
            DBHelp db = new DBHelp();
            System.Data.DataTable check = new System.Data.DataTable();
            string dieuKien = " Where 1=1";
            if (tuKhoa != "")
            {
                dieuKien += " and Tengame Like @tukhoa";
            }
            if (ma != "")
            {
                List<string> maGameTheoTheLoai = PhanLoaiTheLoai_Data.DanhSachGame(ma);
                dieuKien += " and ( magame = @magame0";
                for (int i = 1; i < maGameTheoTheLoai.Count; i++)
                {
                    dieuKien += " or magame = @magame" + i;
                }
                dieuKien += " ) ";
            }

            db.SetCommandText("SELECT count(*) as soluong FROM (SELECT *, ROW_NUMBER() OVER(ORDER BY Ngayphathanh desc ) AS RowNum  FROM dbo.game " + dieuKien + " ) AS t", System.Data.CommandType.Text);
  

            if (tuKhoa != "")
            {
                db.AddParameter("@tukhoa", "%" + tuKhoa + "%");
            }
            if (ma != "")
            {

                List<string> maGameTheoTheLoai = PhanLoaiTheLoai_Data.DanhSachGame(ma);
                for (int i = 0; i < maGameTheoTheLoai.Count; i++)
                {
                    db.AddParameter(("@magame" + i).ToString(), maGameTheoTheLoai[i].ToString());
                }

            }

            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            tongSo = int.Parse(t.Rows[0]["soluong"].ToString());
            return tongSo;

        }
        public static int TongSoGame()
        {
            int tongSo = 0;
            DBHelp db = new DBHelp();
            db.SetCommandText("select count(*) as soluong from game",CommandType.Text);
            DataTable t = new DataTable();
            db.FillDataTable(t);
            tongSo = int.Parse(t.Rows[0]["soluong"].ToString());
            return tongSo;
        }
        public static List<Game_Info> LayTop3DanhSachNgayPhatHanh()
        {
            List<Game_Info> items = new List<Game_Info>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select top(3) * from Game order by ngayphathanh desc",CommandType.Text);
            DataTable t = new DataTable();
            db.FillDataTable(t);
            for(int i=0;i<t.Rows.Count;i++)
            {
                Game_Info item = new Game_Info();
                item.MaGame = Guid.Parse(t.Rows[i]["MaGame"].ToString());
                item.TenGame = t.Rows[i]["TenGame"].ToString();
                item.DanhGia = int.Parse(t.Rows[i]["DanhGia"].ToString());
                item.DonGia = Decimal.Parse(t.Rows[i]["DonGia"].ToString());
                item.GiamGia = float.Parse(t.Rows[i]["GiamGia"].ToString());
                item.NgayPhatHanh = DateTime.Parse(t.Rows[i]["NgayPhatHanh"].ToString());
                item.SoLuongTon = int.Parse(t.Rows[i]["SoLuongTon"].ToString());
                item.Trailer = t.Rows[i]["Trailer"].ToString();
                item.AnhDaiDien = t.Rows[i]["AnhDaiDien"].ToString();
                item.MoTa = t.Rows[i]["MoTa"].ToString();
                item.MaNhaPhatHanh = Guid.Parse(t.Rows[i]["MaNhaPhatHanh"].ToString());
 
                item.MaNhaSanXuat = Guid.Parse(t.Rows[i]["MaNhaSanXuat"].ToString());
                items.Add(item);
            }
            return items;
        }
        public static List<Game_Info> LayTop3DanhSachNgauNhien()
        {
            List<Game_Info> items = new List<Game_Info>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select top(3) * from Game order by newid()", CommandType.Text);
            DataTable t = new DataTable();
            db.FillDataTable(t);
            for (int i = 0; i < t.Rows.Count; i++)
            {
                Game_Info item = new Game_Info();
                item.MaGame = Guid.Parse(t.Rows[i]["MaGame"].ToString());
                item.TenGame = t.Rows[i]["TenGame"].ToString();
                item.DanhGia = int.Parse(t.Rows[i]["DanhGia"].ToString());
                item.DonGia = Decimal.Parse(t.Rows[i]["DonGia"].ToString());
                item.GiamGia = float.Parse(t.Rows[i]["GiamGia"].ToString());
                item.NgayPhatHanh = DateTime.Parse(t.Rows[i]["NgayPhatHanh"].ToString());
                item.SoLuongTon = int.Parse(t.Rows[i]["SoLuongTon"].ToString());
                item.Trailer = t.Rows[i]["Trailer"].ToString();
                item.AnhDaiDien = t.Rows[i]["AnhDaiDien"].ToString();
                item.MoTa = t.Rows[i]["MoTa"].ToString();
                item.MaNhaPhatHanh = Guid.Parse(t.Rows[i]["MaNhaPhatHanh"].ToString());

                item.MaNhaSanXuat = Guid.Parse(t.Rows[i]["MaNhaSanXuat"].ToString());
                items.Add(item);
            }
            return items;
        }
        public static Game_Info LayGameNgauNhien()
        {
            Game_Info item = new Game_Info();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from Game order by newid()", CommandType.Text);
            DataTable t = new DataTable();
            db.FillDataTable(t);
                item.MaGame = Guid.Parse(t.Rows[0]["MaGame"].ToString());
                item.TenGame = t.Rows[0]["TenGame"].ToString();
                item.DanhGia = int.Parse(t.Rows[0]["DanhGia"].ToString());
                item.DonGia = Decimal.Parse(t.Rows[0]["DonGia"].ToString());
                item.GiamGia = float.Parse(t.Rows[0]["GiamGia"].ToString());
                item.NgayPhatHanh = DateTime.Parse(t.Rows[0]["NgayPhatHanh"].ToString());
                item.SoLuongTon = int.Parse(t.Rows[0]["SoLuongTon"].ToString());
                item.Trailer = t.Rows[0]["Trailer"].ToString();
                item.AnhDaiDien = t.Rows[0]["AnhDaiDien"].ToString();
                item.MoTa = t.Rows[0]["MoTa"].ToString();
                item.MaNhaPhatHanh = Guid.Parse(t.Rows[0]["MaNhaPhatHanh"].ToString());

                item.MaNhaSanXuat = Guid.Parse(t.Rows[0]["MaNhaSanXuat"].ToString());
            return item;
        }
        public static string LayTenGameTheoMaGame(string maGame)
        {
            string tenGame = "";
            DBHelp db = new DBHelp();
            db.SetCommandText("select tengame from game where magame = @magame",System.Data.CommandType.Text);
            db.AddParameter("@magame", maGame);
            DataTable t = new DataTable();
            db.FillDataTable(t);
            tenGame = t.Rows[0]["tengame"].ToString();
            return tenGame;
        }
        public static List<Game_Info> LayDanhSachGame()
        {
            List<Game_Info> items = new List<Game_Info>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from Game order by tengame", CommandType.Text);
            DataTable t = new DataTable();
            db.FillDataTable(t);
            for (int i = 0; i < t.Rows.Count; i++)
            {
                Game_Info item = new Game_Info();
                item.MaGame = Guid.Parse(t.Rows[i]["MaGame"].ToString());
                item.TenGame = t.Rows[i]["TenGame"].ToString();
                item.DanhGia = int.Parse(t.Rows[i]["DanhGia"].ToString());
                item.DonGia = Decimal.Parse(t.Rows[i]["DonGia"].ToString());
                item.GiamGia = float.Parse(t.Rows[i]["GiamGia"].ToString());
                item.NgayPhatHanh = DateTime.Parse(t.Rows[i]["NgayPhatHanh"].ToString());
                item.SoLuongTon = int.Parse(t.Rows[i]["SoLuongTon"].ToString());
                item.Trailer = t.Rows[i]["Trailer"].ToString();
                item.AnhDaiDien = t.Rows[i]["AnhDaiDien"].ToString();
                item.MoTa = t.Rows[i]["MoTa"].ToString();
                item.MaNhaPhatHanh = Guid.Parse(t.Rows[i]["MaNhaPhatHanh"].ToString());

                item.MaNhaSanXuat = Guid.Parse(t.Rows[i]["MaNhaSanXuat"].ToString());
                items.Add(item);
            }
            return items;
        }
    }
}
