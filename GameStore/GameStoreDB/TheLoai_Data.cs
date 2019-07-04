using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public static class TheLoai_Data
    {
        public static List<TheLoai_Info> LayDanhSachTheLoai()
        {
            List<TheLoai_Info> items = new List<TheLoai_Info>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from theloai order by tentheloai",System.Data.CommandType.Text);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            for(int i =0;i<t.Rows.Count;i++)
            {
                TheLoai_Info item = new TheLoai_Info();
                item.MaTheLoai = Guid.Parse(t.Rows[i]["MaTheLoai"].ToString());
                item.TenTheLoai = t.Rows[i]["TenTheLoai"].ToString();
                items.Add(item);
            }
            return items;
        }
        public static TheLoai_Info LayTheLoaiTheoMaTheLoai(string MaTheLoai)
        {
            TheLoai_Info item = new TheLoai_Info();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from theloai where matheloai = @matheloai", System.Data.CommandType.Text);
            db.AddParameter("@matheloai", MaTheLoai);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);


            item.MaTheLoai = Guid.Parse(t.Rows[0]["maTheLoai"].ToString());
                item.TenTheLoai = t.Rows[0]["TenTheLoai"].ToString();
            return item;
        }
    }
}
