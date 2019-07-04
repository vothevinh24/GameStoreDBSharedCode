using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public static class TinTuc_Data
    {
        public static List<TinTuc_Info> LayTop3TinTucTheoNgayDang()
        {
            List<TinTuc_Info> items = new List<TinTuc_Info>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select top(3) * from tintuc order by ngaydang desc", System.Data.CommandType.Text);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            for (int i = 0; i < t.Rows.Count; i++)
            {
                TinTuc_Info item = new TinTuc_Info();
                item.MaTinTuc = Guid.Parse(t.Rows[i]["MaTinTuc"].ToString());
                item.MaGame = Guid.Parse(t.Rows[i]["MaGame"].ToString());
                item.TenTinTuc = t.Rows[i]["TenTinTuc"].ToString();
                item.NoiDung = t.Rows[i]["NoiDung"].ToString();
                item.HinhAnhMinhHoa = t.Rows[i]["HinhAnhMinhHoa"].ToString();
                item.NgayDang = DateTime.Parse(t.Rows[i]["NgayDang"].ToString());
                items.Add(item);
            }
            return items;

        }

        public static List<TinTuc_Info> DanhSachTinTuc(int trang = 1, string tuKhoa = "", string ma = "", int soTinTuc = 3)
        {
            List<TinTuc_Info> items = new List<TinTuc_Info>();
            DBHelp test = new DBHelp();
            DBHelp db = new DBHelp();
            System.Data.DataTable check = new System.Data.DataTable();
            string dieuKien = " Where 1=1";
            if (tuKhoa != "")
            {
                dieuKien += " and TenTinTuc Like @tukhoa";
            }
            if (ma != "")
            {
                test.SetCommandText("select * from theloai where matheloai = @Ma ", System.Data.CommandType.Text);
                test.AddParameter("@Ma", ma);

                test.FillDataTable(check);
                if (check.Rows.Count > 0) // Game theo the loai
                {
                    List<string> maGameTheoTheLoai = PhanLoaiTheLoai_Data.DanhSachGame(ma);
                    dieuKien += " and ( magame = @magame0";
                    for (int i = 1; i < maGameTheoTheLoai.Count; i++)
                    {
                        dieuKien += " or magame = @magame" +i;
                    }
                    dieuKien += " ) ";
                }
                else
                {
                    dieuKien += " and magame = @magame";
                }
            }
           
            db.SetCommandText("SELECT * FROM (SELECT *, ROW_NUMBER() OVER(ORDER BY NgayDang desc ) AS RowNum  FROM dbo.TinTuc " + dieuKien + " ) AS t WHERE t.RowNum BETWEEN (@trang-1)*@sotintuc+1 AND @trang*@sotintuc", System.Data.CommandType.Text);
            db.AddParameter("@trang", trang);
            db.AddParameter("@sotintuc", soTinTuc);
   
            if (tuKhoa != "")
            {
                db.AddParameter("@tukhoa", "%" + tuKhoa + "%");
            }
            if (ma != "")
            {
                if (check.Rows.Count > 0)
                {
                    List<string> maGameTheoTheLoai = PhanLoaiTheLoai_Data.DanhSachGame(ma);
                    for (int i = 0; i < maGameTheoTheLoai.Count; i++)
                    {
                        db.AddParameter(("@magame" +i).ToString(), maGameTheoTheLoai[i].ToString());
                    }
                }
                else
                {
                    db.AddParameter("@magame", ma);
                }
            }
            
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            if (t.Rows.Count > 0)
            {
                for (int i = 0; i < t.Rows.Count; i++)
                {
                    TinTuc_Info item = new TinTuc_Info();
                    item.MaTinTuc = Guid.Parse(t.Rows[i]["MaTinTuc"].ToString());
                    item.MaGame = Guid.Parse(t.Rows[i]["MaGame"].ToString());
                    item.TenTinTuc = t.Rows[i]["TenTinTuc"].ToString();
                    item.NoiDung = t.Rows[i]["NoiDung"].ToString();
                    item.HinhAnhMinhHoa = t.Rows[i]["HinhAnhMinhHoa"].ToString();
                    item.NgayDang = DateTime.Parse(t.Rows[i]["NgayDang"].ToString());
                    items.Add(item);
                }

            }
            return items;



        }
        public static int TongSoTinTuc(string tuKhoa = "", string ma = "")
        {
            int tongSo = 0;
            DBHelp test = new DBHelp();
            DBHelp db = new DBHelp();
            System.Data.DataTable check = new System.Data.DataTable();
            string dieuKien = " Where 1=1";
            if (tuKhoa != "")
            {
                dieuKien += " and TenTinTuc Like @tukhoa";
            }
            if (ma != "")
            {
                test.SetCommandText("select * from theloai where matheloai = @Ma ", System.Data.CommandType.Text);
                test.AddParameter("@Ma", ma);

                test.FillDataTable(check);
                if (check.Rows.Count > 0)
                {
                    List<string> maGameTheoTheLoai = PhanLoaiTheLoai_Data.DanhSachGame(ma);
                    dieuKien += " and ( magame = @magame0";
                    for (int i = 1; i < maGameTheoTheLoai.Count; i++)
                    {
                        dieuKien += " or magame = @magame" + i;
                    }
                    dieuKien += " ) ";
                }
                else
                {
                    dieuKien += " and magame = @magame";
                }
            }
            db.SetCommandText("SELECT count(*) as soluong FROM (SELECT *, ROW_NUMBER() OVER(ORDER BY NgayDang DESC) AS RowNum  FROM dbo.TinTuc " + dieuKien + " ) AS t", System.Data.CommandType.Text);

            if (tuKhoa != "")
            {
                db.AddParameter("@tukhoa", "%" + tuKhoa + "%");
            }
            if (ma != "")
            {
                if (check.Rows.Count > 0)
                {
                    List<string> maGameTheoTheLoai = PhanLoaiTheLoai_Data.DanhSachGame(ma);
                    for (int i = 0; i < maGameTheoTheLoai.Count; i++)
                    {
                        db.AddParameter(("@magame" +i).ToString(), maGameTheoTheLoai[i].ToString());
                    }
                }
                else
                {
                    db.AddParameter("@magame", ma);
                }

            }
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            tongSo = int.Parse(t.Rows[0]["soluong"].ToString());
            return tongSo;
        }
        public static List<TinTuc_Info>LayTop5TinTucNgauNhien()
        {
            List<TinTuc_Info> items = new List<TinTuc_Info>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select top(5) * from tintuc order by newid()", System.Data.CommandType.Text);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            for (int i = 0; i < t.Rows.Count; i++)
            {
                TinTuc_Info item = new TinTuc_Info();
                item.MaTinTuc = Guid.Parse(t.Rows[i]["MaTinTuc"].ToString());
                item.MaGame = Guid.Parse(t.Rows[i]["MaGame"].ToString());
                item.TenTinTuc = t.Rows[i]["TenTinTuc"].ToString();
                item.NoiDung = t.Rows[i]["NoiDung"].ToString();
                item.HinhAnhMinhHoa = t.Rows[i]["HinhAnhMinhHoa"].ToString();
                item.NgayDang = DateTime.Parse(t.Rows[i]["NgayDang"].ToString());
                items.Add(item);
            }
            return items;
        }
        public static List<TinTuc_Info> LayTop3TinTucNgauNhien()
        {
            List<TinTuc_Info> items = new List<TinTuc_Info>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select top(3) * from tintuc order by newid()", System.Data.CommandType.Text);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            for (int i = 0; i < t.Rows.Count; i++)
            {
                TinTuc_Info item = new TinTuc_Info();
                item.MaTinTuc = Guid.Parse(t.Rows[i]["MaTinTuc"].ToString());
                item.MaGame = Guid.Parse(t.Rows[i]["MaGame"].ToString());
                item.TenTinTuc = t.Rows[i]["TenTinTuc"].ToString();
                item.NoiDung = t.Rows[i]["NoiDung"].ToString();
                item.HinhAnhMinhHoa = t.Rows[i]["HinhAnhMinhHoa"].ToString();
                item.NgayDang = DateTime.Parse(t.Rows[i]["NgayDang"].ToString());
                items.Add(item);
            }
            return items;
        }
        public static TinTuc_Info LayTinTucChiTiet(string maTinTuc)
        {
            TinTuc_Info item = new TinTuc_Info();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from tintuc where matintuc = @matintuc",System.Data.CommandType.Text);
            db.AddParameter("@matintuc",maTinTuc);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            item.MaTinTuc = Guid.Parse(t.Rows[0]["MaTinTuc"].ToString());
            item.MaGame = Guid.Parse(t.Rows[0]["MaGame"].ToString());
            item.TenTinTuc = t.Rows[0]["TenTinTuc"].ToString();
            item.NoiDung = t.Rows[0]["NoiDung"].ToString();
            item.HinhAnhMinhHoa = t.Rows[0]["HinhAnhMinhHoa"].ToString();
            item.NgayDang = DateTime.Parse(t.Rows[0]["NgayDang"].ToString());
            return item;
        }
    }
    
}

