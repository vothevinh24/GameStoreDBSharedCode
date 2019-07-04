using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreDB
{
    public static class PhanLoaiTheLoai_Data
    {
        public static List<string> DanhSachGame(string maTheLoai="")
        {
            List<string> items = new List<string>();
            DBHelp db = new DBHelp();
            string dieuKien = " where 1=1";
            if(maTheLoai!="")
            {
                dieuKien += " and matheloai = @matheloai";
            }
            db.SetCommandText("select * from phanloaitheloai " + dieuKien,System.Data.CommandType.Text);
            if(maTheLoai!="")
            {
                db.AddParameter("@matheloai",maTheLoai);
            }
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            if(t.Rows.Count > 0)
            {
                for (int i = 0; i < t.Rows.Count; i++)
                {
                    string item = t.Rows[i]["magame"].ToString();

                    items.Add(item);
                }
                 
            }
            return items;
        }
        public static List<string> LayDanhSachTheLoaiTheoMaGame(string MaGame)
        {
            List<string> items = new List<string>();
            DBHelp db = new DBHelp();
            db.SetCommandText("select * from phanloaitheloai where magame=@magame",System.Data.CommandType.Text);
            db.AddParameter("@magame", MaGame);
            System.Data.DataTable t = new System.Data.DataTable();
            db.FillDataTable(t);
            for(int i=0;i<t.Rows.Count;i++)
            {
                string item = "";
               
                item=t.Rows[i]["matheloai"].ToString();
                items.Add(item);
            }

            return items;
        }
    }
}
